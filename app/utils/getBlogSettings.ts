import { BlogSettings, defaultBlogSettings } from "~/types/blog";

export interface Env {
  BLOG_SETTINGS?: string;
}

export function getBlogSettings(env: Env): BlogSettings {
  const rawSettings = env.BLOG_SETTINGS;

  if (!rawSettings) {
    console.warn("BLOG_SETTINGS is not set in environment variables, using default settings");
    return defaultBlogSettings;
  }

  try {
    return typeof rawSettings === 'string'
      ? JSON.parse(rawSettings)
      : (rawSettings as BlogSettings);
  } catch (error) {
    console.error("Error parsing BLOG_SETTINGS:", error);
    return defaultBlogSettings;
  }
}
