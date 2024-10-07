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