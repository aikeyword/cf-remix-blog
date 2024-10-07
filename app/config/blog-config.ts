import type { BlogSettings } from '~/types/blog';

export const defaultBlogSettings: BlogSettings = {
  title: "我的个人博客",
  description: "分享我的想法和经验",
  author: "您的名字",
  postsPerPage: 10,
  postsJsonUrl: "https://raw.githubusercontent.com/yourusername/your-repo/main/public/posts.json",
  adminPassword: "admin123", // 注意: 实际应用中应使用更安全的方式存储密码
  theme: "default",
  footerText: "© {year} 我的个人博客. 保留所有权利.",
  headerLinks: [
    { text: "首页", url: "/" },
    { text: "文章", url: "/posts" },
    { text: "关于", url: "/about" },
  ],
  contentWidth: 800, // 新增：默认内容宽度
  primaryColor: "#3b82f6", // 新增：默认主色调
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif", // 新增：默认字体
};

// 这里假设我们使用了 Cloudflare KV 存储
// 你需要在 wrangler.toml 中配置 KV 命名空间
export async function getBlogSettings(): Promise<BlogSettings> {
  try {
    const settings = await BLOG_SETTINGS.get('settings');
    return settings ? JSON.parse(settings) : defaultBlogSettings;
  } catch (error) {
    console.error('Error fetching blog settings:', error);
    return defaultBlogSettings;
  }
}

export async function saveBlogSettings(settings: BlogSettings): Promise<void> {
  try {
    await BLOG_SETTINGS.put('settings', JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving blog settings:', error);
    throw new Error('Failed to save blog settings');
  }
}