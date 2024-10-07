
// 优先从环境变量中获取，如果获取失败，则使用默认设置
// 博客设置

import type { BlogSettings } from '~/types/blog';

declare global {
    const BLOG_SETTINGS: string;
}

const defaultSettings: BlogSettings = {
    title: "我的个人博客",
    description: "分享我的想法和经验",
    author: "您的名字",
    postsPerPage: 10,
    postsJsonUrl: "https://raw.githubusercontent.com/yourusername/your-repo/main/public/posts.json",
    theme: "default",
    footerText: "© {year} 我的个人博客. 保留所有权利.",
    headerLinks: [
        { text: "首页", url: "/" },
        { text: "文章", url: "/posts" },
        { text: "关于", url: "/about" },
    ],
    contentWidth: 800,
    primaryColor: "#3b82f6",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
};

export function getBlogSettings(): BlogSettings {
    try {
        return JSON.parse(BLOG_SETTINGS);
    } catch (error) {
        console.error('Error parsing BLOG_SETTINGS:', error);
        return defaultSettings;
    }
}