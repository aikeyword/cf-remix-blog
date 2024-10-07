import fs from 'fs';
import toml from '@iarna/toml';
import dotenv from 'dotenv';
dotenv.config();

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

console.log("BLOG_SETTINGS 环境变量:", process.env.BLOG_SETTINGS);

// 如果环境变量不存在，使用默认值
process.env.BLOG_SETTINGS = process.env.BLOG_SETTINGS || JSON.stringify(defaultBlogSettings);

// 读取环境变量中的 BLOG_SETTINGS 或使用默认值
let blogSettings;
try {
    blogSettings = process.env.BLOG_SETTINGS
        ? JSON.parse(process.env.BLOG_SETTINGS)
        : defaultBlogSettings;
} catch (error) {
    console.error("解析 BLOG_SETTINGS 时出错:", error);
    blogSettings = defaultBlogSettings;
}

console.log("使用的 blogSettings:", blogSettings);

// 读取 wrangler.toml 文件
let wranglerConfig;
try {
    wranglerConfig = toml.parse(fs.readFileSync('./wrangler.toml', 'utf-8'));
} catch (error) {
    console.error("读取或解析 wrangler.toml 时出错:", error);
    process.exit(1);
}

// 更新 [vars] 部分
wranglerConfig.vars = wranglerConfig.vars || {};
wranglerConfig.vars.BLOG_SETTINGS = JSON.stringify(blogSettings);

// 将更新后的配置写回 wrangler.toml 文件
try {
    fs.writeFileSync('./wrangler.toml', toml.stringify(wranglerConfig));
    console.log('成功更新 wrangler.toml 的 BLOG_SETTINGS');
} catch (error) {
    console.error("写入 wrangler.toml 时出错:", error);
    process.exit(1);
}