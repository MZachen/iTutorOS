import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ComposeBody = {
  prompt?: string;
  negative_prompt?: string;
  width?: number;
  height?: number;
  seed?: number;
  steps?: number;
  cfg?: number;
  sampler_name?: string;
  scheduler?: string;
  denoise?: number;
  style?: string;
  timeout_ms?: number;
};

type WorkflowValue =
  | string
  | number
  | boolean
  | null
  | WorkflowObject
  | WorkflowValue[];
type WorkflowObject = { [key: string]: WorkflowValue };

type ComfyImageRef = {
  filename: string;
  subfolder?: string;
  type?: string;
};

function clampInt(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function clampFloat(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function readInt(value: unknown, fallback: number, min: number, max: number) {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return fallback;
  return clampInt(num, min, max);
}

function readFloat(value: unknown, fallback: number, min: number, max: number) {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return fallback;
  return clampFloat(num, min, max);
}

function readText(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

function replaceTemplateTokens(
  value: WorkflowValue,
  values: Record<string, string>,
): WorkflowValue {
  if (typeof value === "string") {
    return value.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, key: string) => {
      return values[key] ?? "";
    });
  }
  if (Array.isArray(value)) {
    return value.map((item) =>
      replaceTemplateTokens(item, values),
    ) as WorkflowValue[];
  }
  if (value && typeof value === "object") {
    const next: WorkflowObject = {};
    Object.entries(value).forEach(([key, child]) => {
      next[key] = replaceTemplateTokens(child, values);
    });
    return next;
  }
  return value;
}

function parseWorkflowFromEnv(
  raw: string | undefined,
  templateValues: Record<string, string>,
) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as WorkflowObject;
    return replaceTemplateTokens(parsed, templateValues) as WorkflowObject;
  } catch {
    return null;
  }
}

function applyControlsToWorkflow(
  workflow: WorkflowObject,
  values: {
    prompt: string;
    negativePrompt: string;
    width: number;
    height: number;
    seed: number;
    steps: number;
    cfg: number;
    samplerName: string;
    scheduler: string;
    denoise: number;
    checkpoint: string;
    filenamePrefix: string;
  },
) {
  const next = JSON.parse(JSON.stringify(workflow)) as WorkflowObject;
  const nodes: Array<{ classType: string; inputs: Record<string, unknown> }> =
    [];
  Object.values(next).forEach((value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return;
    const node = value as Record<string, unknown>;
    const classType =
      typeof node.class_type === "string" ? node.class_type : "";
    const inputsRaw = node.inputs;
    if (!inputsRaw || typeof inputsRaw !== "object" || Array.isArray(inputsRaw))
      return;
    nodes.push({ classType, inputs: inputsRaw as Record<string, unknown> });
  });

  const textNodes = nodes.filter((node) => node.classType === "CLIPTextEncode");
  if (textNodes[0] && "text" in textNodes[0].inputs) {
    textNodes[0].inputs.text = values.prompt;
  }
  if (textNodes[1] && "text" in textNodes[1].inputs) {
    textNodes[1].inputs.text = values.negativePrompt;
  }

  nodes.forEach(({ classType, inputs }) => {
    if (classType === "EmptyLatentImage") {
      if ("width" in inputs) inputs.width = values.width;
      if ("height" in inputs) inputs.height = values.height;
    }

    if (classType === "KSampler" || classType === "KSamplerAdvanced") {
      if ("seed" in inputs) inputs.seed = values.seed;
      if ("steps" in inputs) inputs.steps = values.steps;
      if ("cfg" in inputs) inputs.cfg = values.cfg;
      if ("sampler_name" in inputs) inputs.sampler_name = values.samplerName;
      if ("scheduler" in inputs) inputs.scheduler = values.scheduler;
      if ("denoise" in inputs) inputs.denoise = values.denoise;
    }

    if (
      classType.startsWith("CheckpointLoader") &&
      values.checkpoint &&
      "ckpt_name" in inputs
    ) {
      inputs.ckpt_name = values.checkpoint;
    }

    if (classType === "SaveImage" && "filename_prefix" in inputs) {
      inputs.filename_prefix = values.filenamePrefix;
    }
  });

  return next;
}

function defaultWorkflow({
  checkpoint,
  prompt,
  negativePrompt,
  width,
  height,
  seed,
  steps,
  cfg,
  samplerName,
  scheduler,
  denoise,
  filenamePrefix,
}: {
  checkpoint: string;
  prompt: string;
  negativePrompt: string;
  width: number;
  height: number;
  seed: number;
  steps: number;
  cfg: number;
  samplerName: string;
  scheduler: string;
  denoise: number;
  filenamePrefix: string;
}): WorkflowObject {
  return {
    "1": {
      inputs: {
        ckpt_name: checkpoint,
      },
      class_type: "CheckpointLoaderSimple",
    },
    "2": {
      inputs: {
        text: prompt,
        clip: ["1", 1],
      },
      class_type: "CLIPTextEncode",
    },
    "3": {
      inputs: {
        text: negativePrompt,
        clip: ["1", 1],
      },
      class_type: "CLIPTextEncode",
    },
    "4": {
      inputs: {
        width,
        height,
        batch_size: 1,
      },
      class_type: "EmptyLatentImage",
    },
    "5": {
      inputs: {
        seed,
        steps,
        cfg,
        sampler_name: samplerName,
        scheduler,
        denoise,
        model: ["1", 0],
        positive: ["2", 0],
        negative: ["3", 0],
        latent_image: ["4", 0],
      },
      class_type: "KSampler",
    },
    "6": {
      inputs: {
        samples: ["5", 0],
        vae: ["1", 2],
      },
      class_type: "VAEDecode",
    },
    "7": {
      inputs: {
        filename_prefix: filenamePrefix,
        images: ["6", 0],
      },
      class_type: "SaveImage",
    },
  };
}

function extractImageRef(
  history: unknown,
  promptId: string,
): ComfyImageRef | null {
  if (!history || typeof history !== "object") return null;
  const byPrompt = (history as Record<string, unknown>)[promptId];
  if (!byPrompt || typeof byPrompt !== "object") return null;
  const outputs = (byPrompt as { outputs?: Record<string, unknown> }).outputs;
  if (!outputs || typeof outputs !== "object") return null;

  const nodes = Object.values(outputs);
  for (const node of nodes) {
    if (!node || typeof node !== "object") continue;
    const images = (node as { images?: unknown }).images;
    if (!Array.isArray(images) || images.length === 0) continue;
    const first = images[0];
    if (!first || typeof first !== "object") continue;
    const image = first as Record<string, unknown>;
    const filename =
      typeof image.filename === "string" ? image.filename.trim() : "";
    if (!filename) continue;
    const subfolder =
      typeof image.subfolder === "string" ? image.subfolder : "";
    const type = typeof image.type === "string" ? image.type : "output";
    return { filename, subfolder, type };
  }
  return null;
}

export async function POST(req: Request) {
  let body: ComposeBody;
  try {
    body = (await req.json()) as ComposeBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const prompt = readText(body.prompt);
  if (!prompt) {
    return NextResponse.json({ error: "prompt is required." }, { status: 400 });
  }

  const style = readText(body.style);
  const composedPrompt = style ? `${prompt}\nStyle: ${style}` : prompt;
  const negativePrompt = readText(
    body.negative_prompt,
    process.env.COMFYUI_NEGATIVE_PROMPT_DEFAULT ||
      "blurry, low quality, distorted, watermark, text, logo, signature",
  );

  const width = readInt(body.width, 1080, 512, 1536);
  const height = readInt(body.height, 1080, 512, 1536);
  const seed = readInt(
    body.seed,
    Math.floor(Math.random() * 2_147_000_000),
    1,
    2_147_483_647,
  );
  const steps = readInt(body.steps, 8, 1, 60);
  const cfg = readFloat(body.cfg, 1.0, 0, 20);
  const denoise = readFloat(body.denoise, 1.0, 0, 1);
  const samplerName = readText(body.sampler_name, "euler");
  const scheduler = readText(body.scheduler, "normal");
  const checkpoint = readText(process.env.COMFYUI_CHECKPOINT);
  const filenamePrefix = readText(
    process.env.COMFYUI_FILENAME_PREFIX,
    `itutoros_${Date.now()}`,
  );

  const baseUrl = readText(
    process.env.COMFYUI_BASE_URL,
    "http://127.0.0.1:8188",
  ).replace(/\/+$/, "");
  const pollIntervalMs = readInt(
    process.env.COMFYUI_POLL_INTERVAL_MS,
    1200,
    250,
    5000,
  );
  const timeoutMs = readInt(
    body.timeout_ms ?? process.env.COMFYUI_TIMEOUT_MS,
    120000,
    5000,
    300000,
  );
  const clientId = readText(process.env.COMFYUI_CLIENT_ID, randomUUID());

  const workflowTemplateValues: Record<string, string> = {
    PROMPT: composedPrompt,
    NEGATIVE_PROMPT: negativePrompt,
    WIDTH: String(width),
    HEIGHT: String(height),
    SEED: String(seed),
    STEPS: String(steps),
    CFG: String(cfg),
    SAMPLER_NAME: samplerName,
    SCHEDULER: scheduler,
    DENOISE: String(denoise),
    CHECKPOINT: checkpoint,
    FILENAME_PREFIX: filenamePrefix,
  };

  const workflowFromEnv = parseWorkflowFromEnv(
    process.env.COMFYUI_WORKFLOW_JSON,
    workflowTemplateValues,
  );
  if (!workflowFromEnv && !checkpoint) {
    return NextResponse.json(
      {
        error:
          "Missing COMFYUI_CHECKPOINT or COMFYUI_WORKFLOW_JSON. Provide one to generate images.",
      },
      { status: 500 },
    );
  }

  const workflow = workflowFromEnv
    ? applyControlsToWorkflow(workflowFromEnv, {
        prompt: composedPrompt,
        negativePrompt,
        width,
        height,
        seed,
        steps,
        cfg,
        samplerName,
        scheduler,
        denoise,
        checkpoint,
        filenamePrefix,
      })
    : defaultWorkflow({
        checkpoint,
        prompt: composedPrompt,
        negativePrompt,
        width,
        height,
        seed,
        steps,
        cfg,
        samplerName,
        scheduler,
        denoise,
        filenamePrefix,
      });

  const promptRes = await fetch(`${baseUrl}/prompt`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      prompt: workflow,
      client_id: clientId,
    }),
  });

  const promptData = (await promptRes.json().catch(() => ({}))) as {
    prompt_id?: string;
    node_errors?: unknown;
    error?: string;
  };

  if (!promptRes.ok || !promptData.prompt_id) {
    return NextResponse.json(
      {
        error:
          promptData.error ||
          "ComfyUI prompt submission failed. Check workflow and model load state.",
        detail: promptData.node_errors ?? null,
      },
      { status: promptRes.status || 500 },
    );
  }

  const promptId = promptData.prompt_id;
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const historyRes = await fetch(
      `${baseUrl}/history/${encodeURIComponent(promptId)}`,
      { cache: "no-store" },
    );
    const historyJson = await historyRes
      .json()
      .catch(() => ({}) as Record<string, unknown>);
    const imageRef = extractImageRef(historyJson, promptId);
    if (imageRef?.filename) {
      const params = new URLSearchParams({
        filename: imageRef.filename,
        subfolder: imageRef.subfolder ?? "",
        type: imageRef.type ?? "output",
      });
      const imageRes = await fetch(`${baseUrl}/view?${params.toString()}`);
      if (!imageRes.ok) {
        return NextResponse.json(
          { error: "ComfyUI generated image but /view fetch failed." },
          { status: 502 },
        );
      }
      const contentType = imageRes.headers.get("content-type") || "image/png";
      const imageBuffer = Buffer.from(await imageRes.arrayBuffer());
      const imageDataUrl = `data:${contentType};base64,${imageBuffer.toString("base64")}`;
      return NextResponse.json({
        prompt_id: promptId,
        image_data_url: imageDataUrl,
        width,
        height,
      });
    }
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), pollIntervalMs);
    });
  }

  return NextResponse.json(
    {
      error: "Timed out waiting for ComfyUI image output.",
      prompt_id: promptId,
    },
    { status: 504 },
  );
}
