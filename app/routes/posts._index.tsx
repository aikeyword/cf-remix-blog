import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/cloudflare";
import { getPosts } from "~/models/post.server";
import TagList from "~/components/TagList";

export const meta: MetaFunction = () => {
    return [
        { title: "所有文章 - 我的个人博客" },
        { name: "description", content: "浏览我的所有博客文章" },
    ];
};

export async function loader() {
    const posts = await getPosts();
    return json({ posts }, {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });
}

export default function Posts() {
    const { posts } = useLoaderData<typeof loader>();

    const decodePosts = posts.map(post => ({
        ...post,
        title: decodeURIComponent(escape(post.title)),
        excerpt: decodeURIComponent(escape(post.excerpt))
    }));

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">所有文章</h1>
            <div className="space-y-8">
                {decodePosts.map((post) => (
                    <article key={post.slug} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <Link to={`/posts/${post.slug}`} className="block hover:no-underline">
                            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">{post.title}</h2>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                        <div className="flex justify-between items-center">
                            <TagList tags={post.tags} />
                            <span className="text-sm text-gray-500 dark:text-gray-500">{post.date}</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}