import fs from 'fs';
import toml from '@iarna/toml';

// 读取 wrangler.toml 文件
const wranglerConfig = toml.parse(fs.readFileSync('./wrangler.toml', 'utf-8'));

// 输出当前的 BLOG_SETTINGS
console.log('Current BLOG_SETTINGS:', process.env.config);

// 如果不为空，则使用 process.env.Build_BLOG_SETTINGS 的值,否则使用 wranglerConfig.vars.BLOG_SETTINGS 的值
const BLOG_SETTINGS = process.env.config || wranglerConfig.vars.config;

// 将配置写回 wrangler.toml 文件
wranglerConfig.vars.BLOG_SETTINGS = BLOG_SETTINGS;
fs.writeFileSync('./wrangler.toml', toml.stringify(wranglerConfig));

// 将最新配置替换 types/blog.ts 中的设置
const blogSettingsObject = JSON.parse(BLOG_SETTINGS);
const typesContent = `export interface BlogSettings {
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

export const defaultBlogSettings: BlogSettings = ${JSON.stringify(blogSettingsObject, null, 2)};
`;

fs.writeFileSync('./app/types/blog.ts', typesContent);

// 输出当前的 BLOG_SETTINGS
console.log('Current BLOG_SETTINGS:', wranglerConfig.vars.BLOG_SETTINGS);