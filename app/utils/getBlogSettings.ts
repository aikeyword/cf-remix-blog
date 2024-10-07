import { BlogSettings, defaultBlogSettings } from "~/types/blog";

export interface Env {
  BLOG_SETTINGS: string;
}

export function getBlogSettings(env: Env): BlogSettings {
    let settings: BlogSettings;
    let rawSettings = env.BLOG_SETTINGS;

    try {
        if (typeof rawSettings === 'string') {
            settings = JSON.parse(rawSettings);
        } else if (typeof rawSettings === 'object' && rawSettings !== null) {
            settings = rawSettings;
        } else {
            console.warn("BLOG_SETTINGS is not set in environment variables, using default settings");
            settings = defaultBlogSettings;
        }
    } catch (error) {
        console.error("Error parsing BLOG_SETTINGS:", error);
        settings = defaultBlogSettings;
    }

    return settings;
}