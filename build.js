const fs = require('fs');
const toml = require('@iarna/toml');

// 默认的 BLOG_SETTINGS
const defaultBlogSettings = {
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

// 读取环境变量中的 BLOG_SETTINGS 或使用默认值
const blogSettings = process.env.BLOG_SETTINGS
    ? JSON.parse(process.env.BLOG_SETTINGS)
    : defaultBlogSettings;

// 读取 wrangler.toml 文件
const wranglerConfig = toml.parse(fs.readFileSync('./wrangler.toml', 'utf-8'));

// 更新 [vars] 部分
wranglerConfig.vars = wranglerConfig.vars || {};
wranglerConfig.vars.BLOG_SETTINGS = JSON.stringify(blogSettings);

// 将更新后的配置写回 wrangler.toml 文件
fs.writeFileSync('./wrangler.toml', toml.stringify(wranglerConfig));

console.log('Updated wrangler.toml with BLOG_SETTINGS');