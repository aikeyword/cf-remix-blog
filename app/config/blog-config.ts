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
  ]
};

export async function getBlogSettings(): Promise<BlogSettings> {
  // 这里可以从 KV 存储或其他持久化存储中获取设置
  // 暂时返回默认设置
  return defaultBlogSettings;
}

export async function saveBlogSettings(settings: BlogSettings): Promise<void> {
  // 这里应该实现将设置保存到 KV 存储或其他持久化存储的逻辑
  console.log("保存设置:", settings);
}