export interface BlogSettings {
  title: string;
  description: string;
  author: string;
  postsPerPage: number;
  postsJsonUrl: string;
  theme: string;
  footerText: string;
  headerLinks: { text: string; url: string }[];
  contentWidth: number;
  primaryColor: string;
  fontFamily: string;
}

export const defaultBlogSettings: BlogSettings = {
  title: "Remix个人博客@cf_workers",
  description: "分享我的想法和经验",
  author: "aigem",
  postsPerPage: 3,
  postsJsonUrl: "https://raw.githubusercontent.com/yourusername/your-repo/main/public/posts.json",
  theme: "default",
  footerText: "© {year} CF Workers Remix Blog. 保留所有权利.",
  headerLinks: [
    { text: "首页", url: "/" },
    { text: "文章", url: "/posts" },
    { text: "关于", url: "/about" },
    { text: "Github", url: "https://github.com/aigem/cf-remix-blog" }
  ],
  contentWidth: 800,
  primaryColor: "#3b82f6",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
};