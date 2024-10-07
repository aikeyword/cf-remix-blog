import type { BlogSettings } from "~/types/blog";
import { defaultBlogSettings } from "~/config/defaultBlogSettings";

export function getBlogSettings(context: any): BlogSettings {
    let settings: BlogSettings;
    let rawSettings = context.BLOG_SETTINGS;

    try {
        if (typeof rawSettings === 'string') {
            settings = JSON.parse(rawSettings);
        } else if (typeof rawSettings === 'object' && rawSettings !== null) {
            settings = rawSettings;
        } else {
            console.warn("BLOG_SETTINGS is not set or invalid, using default settings");
            settings = defaultBlogSettings;
        }
    } catch (error) {
        console.error("Error parsing BLOG_SETTINGS:", error);
        settings = defaultBlogSettings;
    }

    return settings;
}