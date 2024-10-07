import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare"; // 更新这里
import type { BlogSettings } from "~/types/blog";

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

export async function loader({ context }: LoaderFunctionArgs) { // 更新这里
    let settings: BlogSettings;
    try {
        console.log("Raw BLOG_SETTINGS:", context.BLOG_SETTINGS);
        settings = typeof context.BLOG_SETTINGS === 'string' 
            ? JSON.parse(context.BLOG_SETTINGS)
            : (context.BLOG_SETTINGS || defaultBlogSettings);
    } catch (error) {
        console.error("Error parsing BLOG_SETTINGS:", error);
        settings = defaultBlogSettings;
    }
    
    const posts = await getPosts();
    const tags = [...new Set(posts.flatMap(post => post.tags))];

    return json({
        settings,
        stats: {
            totalPosts: posts.length,
            totalTags: tags.length,
        },
        blogSettingsEnv: context.BLOG_SETTINGS,
    });
}

export default function Status() {
    const { settings, stats, blogSettingsEnv } = useLoaderData<typeof loader>();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">博客状态</h1>

            <h2 className="text-2xl font-semibold mb-4">博客设置</h2>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto mb-6">
                {JSON.stringify(settings, null, 2)}
            </pre>

            <h2 className="text-2xl font-semibold mb-4">环境变量中的博客设置</h2>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto mb-6">
                {blogSettingsEnv}
            </pre>

            <h2 className="text-2xl font-semibold mb-4">统计信息</h2>
            <ul className="list-disc list-inside">
                <li>总文章数: {stats.totalPosts}</li>
                <li>总标签数: {stats.totalTags}</li>
            </ul>
        </div>
    );
}