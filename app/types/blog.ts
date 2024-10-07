export interface BlogSettings {
  title: string;
  description: string;
  author: string;
  postsPerPage: number;
  postsJsonUrl: string;
  adminPassword: string;
  theme: string;
  footerText: string;
  headerLinks: { text: string; url: string }[];
  contentWidth: number; // 新增：内容宽度设置
  primaryColor: string; // 新增：主色调设置
  fontFamily: string; // 新增：字体设置
}