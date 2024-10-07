import fs from 'fs';
import toml from '@iarna/toml';

// 读取 wrangler.toml 文件
const wranglerConfig = toml.parse(fs.readFileSync('./wrangler.toml', 'utf-8'));

// 输出当前的 BLOG_SETTINGS
console.log('Current BLOG_SETTINGS:', process.env.Build_BLOG_SETTINGS);

// 如果不为空，则使用 process.env.Build_BLOG_SETTINGS 的值,否则使用 wranglerConfig.vars.BLOG_SETTINGS 的值
const BLOG_SETTINGS = process.env.Build_BLOG_SETTINGS || wranglerConfig.vars.BLOG_SETTINGS;

// 将配置写回 wrangler.toml 文件
wranglerConfig.vars.BLOG_SETTINGS = BLOG_SETTINGS;
fs.writeFileSync('./wrangler.toml', toml.stringify(wranglerConfig));

// 输出当前的 BLOG_SETTINGS
console.log('Current BLOG_SETTINGS:', wranglerConfig.vars.BLOG_SETTINGS);