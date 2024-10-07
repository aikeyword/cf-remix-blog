import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { BlogSettings } from "~/types/blog";
import { defaultBlogSettings } from "~/config/defaultBlogSettings";
import { getBlogSettings } from "~/utils/getBlogSettings";

export async function loader({ context }: LoaderFunctionArgs) {
    const settings = getBlogSettings(context);
    
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