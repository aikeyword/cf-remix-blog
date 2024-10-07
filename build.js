import fs from 'fs';
import toml from '@iarna/toml';

// 读取 wrangler.toml 文件
const wranglerConfig = toml.parse(fs.readFileSync('./wrangler.toml', 'utf-8'));

// 输出当前的 BLOG_SETTINGS
console.log('Current BLOG_SETTINGS:', wranglerConfig.vars.BLOG_SETTINGS);

// 如果需要更新 BLOG_SETTINGS，可以在这里进行
// wranglerConfig.vars.BLOG_SETTINGS = newSettings;

// 将配置写回 wrangler.toml 文件
fs.writeFileSync('./wrangler.toml', toml.stringify(wranglerConfig));