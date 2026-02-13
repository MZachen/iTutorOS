import type { ConnectionProviderId } from "@/lib/connections";

type OAuthProviderConfig = {
  authUrl: string;
  tokenUrl: string;
  scopes: string[];
  clientIdKey: string;
  clientSecretKey: string;
  extraAuthParams?: Record<string, string>;
  extraTokenParams?: Record<string, string>;
};

const META_GRAPH_VERSION = process.env.META_GRAPH_VERSION ?? "v20.0";
const META_AUTH_URL = `https://www.facebook.com/${META_GRAPH_VERSION}/dialog/oauth`;
const META_TOKEN_URL = `https://graph.facebook.com/${META_GRAPH_VERSION}/oauth/access_token`;

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

const META_BASE_SCOPES = ["pages_show_list", "pages_read_engagement"];

const OAUTH_CONFIGS: Partial<Record<ConnectionProviderId, OAuthProviderConfig>> = {
  facebook: {
    authUrl: META_AUTH_URL,
    tokenUrl: META_TOKEN_URL,
    scopes: [...META_BASE_SCOPES, "pages_manage_posts", "pages_manage_metadata"],
    clientIdKey: "app_id",
    clientSecretKey: "app_secret",
  },
  messenger: {
    authUrl: META_AUTH_URL,
    tokenUrl: META_TOKEN_URL,
    scopes: [...META_BASE_SCOPES, "pages_messaging", "pages_manage_metadata"],
    clientIdKey: "app_id",
    clientSecretKey: "app_secret",
  },
  instagram: {
    authUrl: META_AUTH_URL,
    tokenUrl: META_TOKEN_URL,
    scopes: [...META_BASE_SCOPES, "instagram_basic", "instagram_content_publish", "instagram_manage_messages"],
    clientIdKey: "app_id",
    clientSecretKey: "app_secret",
  },
  whatsapp: {
    authUrl: META_AUTH_URL,
    tokenUrl: META_TOKEN_URL,
    scopes: ["whatsapp_business_management", "whatsapp_business_messaging"],
    clientIdKey: "app_id",
    clientSecretKey: "app_secret",
  },
  youtube: {
    authUrl: GOOGLE_AUTH_URL,
    tokenUrl: GOOGLE_TOKEN_URL,
    scopes: ["https://www.googleapis.com/auth/youtube.readonly", "https://www.googleapis.com/auth/youtube.upload"],
    clientIdKey: "client_id",
    clientSecretKey: "client_secret",
    extraAuthParams: { access_type: "offline", prompt: "consent" },
    extraTokenParams: { grant_type: "authorization_code" },
  },
};

export function getOAuthConfig(providerId: ConnectionProviderId): OAuthProviderConfig | null {
  return OAUTH_CONFIGS[providerId] ?? null;
}
