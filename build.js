import fs from 'fs';
import toml from '@iarna/toml';

// 定义默认的博客设置
const defaultBlogSettings = {
    "title": "Remix个人博客@cf_workers",
    "description": "分享我的想法和经验",
    "author": "aigem",
    "postsPerPage": 3,
    "postsJsonUrl": "https://raw.githubusercontent.com/yourusername/your-repo/main/public/posts.json",
    "theme": "default",
    "footerText": "© {year} CF Workers Remix Blog. 保留所有权利.",
    "headerLinks": [
        { "text": "首页", "url": "/" },
        { "text": "文章", "url": "/posts" },
        { "text": "关于", "url": "/about" },
        { "text": "Github", "url": "https://github.com/aigem/cf-remix-blog" }
    ],
    "contentWidth": 800,
    "primaryColor": "#3b82f6",
    "fontFamily": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
};

// 读取 wrangler.toml 文件
let wranglerConfig;
try {
    const wranglerContent = fs.readFileSync('./wrangler.toml', 'utf-8');
    wranglerConfig = toml.parse(wranglerContent);
} catch (error) {
    console.error('Error reading or parsing wrangler.toml:', error);
    process.exit(1);
}

// 更新 wrangler.toml 文件中的 BLOG_SETTINGS
wranglerConfig.vars = wranglerConfig.vars || {};
wranglerConfig.vars.BLOG_SETTINGS = JSON.stringify(defaultBlogSettings);

// 将更新后的配置写回 wrangler.toml 文件
try {
    const updatedWranglerContent = toml.stringify(wranglerConfig);
    fs.writeFileSync('./wrangler.toml', updatedWranglerContent);
} catch (error) {
    console.error('Error writing wrangler.toml:', error);
    process.exit(1);
}

// 更新 app/types/blog.ts 文件
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

export const defaultBlogSettings: BlogSettings = ${JSON.stringify(defaultBlogSettings, null, 2)};
`;

fs.writeFileSync('./app/types/blog.ts', typesContent);

console.log('======== build.js ======== ')
console.log('Blog settings have been updated in wrangler.toml and app/types/blog.ts');