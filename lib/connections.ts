export type ConnectionField = {
  key: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "url";
  required?: boolean;
};

export type ConnectionProvider = {
  id: ConnectionProviderId;
  label: string;
  description: string;
  fields: ConnectionField[];
  oauthSupported?: boolean;
};

export type ConnectionProviderId =
  | "facebook"
  | "messenger"
  | "instagram"
  | "tiktok"
  | "x"
  | "linkedin"
  | "snapchat"
  | "pinterest"
  | "youtube"
  | "whatsapp";

export const CONNECTION_PROVIDERS: ConnectionProvider[] = [
  {
    id: "facebook",
    label: "Facebook",
    description: "Publish to Pages and read Facebook lead messages.",
    oauthSupported: true,
    fields: [
      { key: "app_id", label: "App ID", required: true, placeholder: "1234567890" },
      { key: "app_secret", label: "App Secret", required: true, type: "password" },
      { key: "page_id", label: "Page ID", required: true },
      { key: "page_access_token", label: "Page Access Token", type: "password" },
      { key: "webhook_verify_token", label: "Webhook Verify Token", type: "password" },
    ],
  },
  {
    id: "messenger",
    label: "Messenger",
    description: "Read Messenger inquiries and respond from iTutorOS.",
    oauthSupported: true,
    fields: [
      { key: "app_id", label: "App ID", required: true },
      { key: "app_secret", label: "App Secret", required: true, type: "password" },
      { key: "page_id", label: "Page ID", required: true },
      { key: "page_access_token", label: "Page Access Token", type: "password" },
      { key: "webhook_verify_token", label: "Webhook Verify Token", type: "password" },
    ],
  },
  {
    id: "instagram",
    label: "Instagram",
    description: "Publish posts and scan Instagram DMs.",
    oauthSupported: true,
    fields: [
      { key: "app_id", label: "App ID", required: true },
      { key: "app_secret", label: "App Secret", required: true, type: "password" },
      { key: "instagram_account_id", label: "Instagram Business Account ID", required: true },
      { key: "access_token", label: "Access Token", type: "password" },
      { key: "webhook_verify_token", label: "Webhook Verify Token", type: "password" },
    ],
  },
  {
    id: "tiktok",
    label: "TikTok",
    description: "Publish to TikTok and monitor comments/messages.",
    fields: [
      { key: "client_key", label: "Client Key", required: true },
      { key: "client_secret", label: "Client Secret", required: true, type: "password" },
      { key: "access_token", label: "Access Token", type: "password" },
      { key: "refresh_token", label: "Refresh Token", type: "password" },
    ],
  },
  {
    id: "x",
    label: "X",
    description: "Post to X and monitor replies.",
    fields: [
      { key: "client_id", label: "Client ID", required: true },
      { key: "client_secret", label: "Client Secret", required: true, type: "password" },
      { key: "access_token", label: "Access Token", type: "password" },
    ],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Publish to your organization and read inbound messages.",
    fields: [
      { key: "client_id", label: "Client ID", required: true },
      { key: "client_secret", label: "Client Secret", required: true, type: "password" },
      { key: "organization_id", label: "Organization ID", required: true },
      { key: "access_token", label: "Access Token", type: "password" },
    ],
  },
  {
    id: "snapchat",
    label: "Snapchat",
    description: "Publish stories and monitor responses.",
    fields: [
      { key: "client_id", label: "Client ID", required: true },
      { key: "client_secret", label: "Client Secret", required: true, type: "password" },
      { key: "access_token", label: "Access Token", type: "password" },
    ],
  },
  {
    id: "pinterest",
    label: "Pinterest",
    description: "Publish pins and track engagement.",
    fields: [
      { key: "app_id", label: "App ID", required: true },
      { key: "app_secret", label: "App Secret", required: true, type: "password" },
      { key: "access_token", label: "Access Token", type: "password" },
    ],
  },
  {
    id: "youtube",
    label: "YouTube",
    description: "Publish videos and read channel comments.",
    oauthSupported: true,
    fields: [
      { key: "client_id", label: "Client ID", required: true },
      { key: "client_secret", label: "Client Secret", required: true, type: "password" },
      { key: "refresh_token", label: "Refresh Token", type: "password" },
      { key: "channel_id", label: "Channel ID", required: true },
    ],
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "Read inbound WhatsApp inquiries and reply from iTutorOS.",
    oauthSupported: true,
    fields: [
      { key: "app_id", label: "App ID", required: true },
      { key: "app_secret", label: "App Secret", required: true, type: "password" },
      { key: "business_account_id", label: "Business Account ID", required: true },
      { key: "phone_number_id", label: "Phone Number ID", required: true },
      { key: "access_token", label: "Access Token", type: "password" },
      { key: "webhook_verify_token", label: "Webhook Verify Token", type: "password" },
    ],
  },
];

const PROVIDER_MAP = new Map(CONNECTION_PROVIDERS.map((provider) => [provider.id, provider]));

export function getConnectionProvider(id: string): ConnectionProvider | null {
  return PROVIDER_MAP.get(id as ConnectionProviderId) ?? null;
}

export function requiredConnectionFields(provider: ConnectionProvider): string[] {
  return provider.fields.filter((field) => field.required).map((field) => field.key);
}
