# 个人博客系统

这是一个基于 Remix 和 Cloudflare Workers 构建的现代化个人博客系统。

## 功能特点

- 响应式设计，支持移动端和桌面端
- 深色模式支持
- 文章标签系统
- 管理界面用于设置博客基本信息
- Markdown 支持
- 优化的 SEO
- 可自定义主题
- 使用系统默认字体，无需额外加载

- 文章搜索功能-待完善
- 文章分页-待完善
- 阅读进度条-待完善
- RSS 订阅-待完善
- 社交媒体分享-待完善

## 技术栈

- 前端框架: Remix
- 部署平台: Cloudflare Workers
- 样式: Tailwind CSS
- 语言: TypeScript
- 数据存储: JSON 文件 (可扩展到 Cloudflare KV)
- Markdown 渲染: marked 库
- 博客数据: 使用可配置的 JSON 文件 URL
- 包管理: pnpm

## 快速开始

1. 克隆仓库
   ```sh
   git clone https://github.com/yourusername/your-blog-repo.git
   cd your-blog-repo
   ```

2. 安装依赖
   ```sh
   pnpm install
   ```

3. 运行开发服务器
   ```sh
   pnpm run dev
   ```

4. 构建生产版本
   ```sh
   pnpm run build
   ```

5. 部署
   5.1 通过 wrangler cli 部署到 Cloudflare Workers
   ```sh
   pnpm run deploy
   ```
   5.2 通过 GitHub 部署到 Cloudflare Workers
   在 Cloudflare 的设置中绑定 GitHub 仓库，之后只需更新 GitHub 仓库中的文件即可自动部署到 Workers。非常方便。
   新建的workers名称必须与wrangler.toml文件中的name一致，否则会部署失败。

   视频教程：

## 自定义

### 博客文章

编辑 `public/posts.json` 或在管理界面中配置的 JSON 文件 URL 来添加或修改博客文章。JSON 文件格式如下：

```json
[
    {
        "slug": "your-post-slug",
        "title": "Your Post Title",
        "content": "Your Post Content",
        "date": "2024-01-01",
        "excerpt": "Your Post Excerpt",
        "tags": ["tag1", "tag2"]
    }
]
```

- 修改 `app/components/Navbar.tsx` 来自定义导航栏
- 编辑 `app/root.tsx` 来更改全局样式和布局

### 管理界面

访问 `/blog_admin` 路由来设置博客的基本信息。首次访问时，默认密码为 "admin123"。请在首次登录后立即更改密码。

### 自定义主题

1. 在 `app/styles/themes.css` 文件中定义新的主题变量。
2. 在 `app/routes/blog_admin.tsx` 文件中的主题选择器中添加新的主题选项。
3. 更新 `app/root.tsx` 文件以使用新的主题类。

### 导航栏

修改 `app/components/Navbar.tsx` 来自定义导航栏。

### 全局样式

编辑 `app/root.tsx` 来更改全局样式和布局。

## 开发指南

### 文件结构

- `app/`: 主要的应用代码
  - `components/`: 可复用的 React 组件
  - `routes/`: Remix 路由文件
  - `styles/`: CSS 文件
  - `models/`: 数据模型和业务逻辑
- `public/`: 静态资源文件

### 性能优化

- 使用 Remix 的 `prefetch` 功能预加载内容
- 实现数据缓存策略
- 优化图片加载

## css部分

要应用这些样式，你需要在相应的组件中使用适当的类名。例如，对于文章卡片，你可以这样修改 app/routes/posts._index.tsx：


<motion.article
  key={post.slug}
  className="card p-6 transition-shadow duration-300 ease-in-out"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  {/* ... 文章内容 ... */}
</motion.article>
对于按钮，你可以在需要的地方添加 button 类：


<Link to="/posts" className="button inline-block mt-8">
  查看所有文章
</Link>
这些 CSS 改进将使你的博客更加美观和互动，同时保持了简洁的设计风格。你可以根据需要进一步调整这些样式，以达到你想要的视觉效果。


## 贡献

欢迎提交 Pull Requests 来改进这个项目。对于重大更改，请先开 issue 讨论您想要改变的内容。

## 许可证

MIT

## 博客设置

您可以通过修改 `app/types/blog.ts` 文件中的 `defaultBlogSettings` 对象来自定义您的博客设置: