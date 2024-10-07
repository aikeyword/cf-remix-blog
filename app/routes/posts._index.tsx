import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link, useSearchParams, useNavigation } from "@remix-run/react";
import type { MetaFunction, LoaderArgs } from "@remix-run/cloudflare";
import { motion } from "framer-motion";
import { getPosts } from "~/models/post.server";
import TagList from "~/components/TagList";

export const meta: MetaFunction = () => {
    return [
        { title: "所有文章 - 我的个人博客" },
        { name: "description", content: "浏览我的所有博客文章" },
        { name: "og:title", content: "所有文章 - 我的个人博客" },
        { name: "og:description", content: "浏览我的所有博客文章" },
        { name: "twitter:card", content: "summary" },
    ];
};

const POSTS_PER_PAGE = 10;

export async function loader({ request }: LoaderArgs) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const posts = await getPosts();
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const paginatedPosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
    return json({ posts: paginatedPosts, page, totalPages });
}

export default function Posts() {
    const { posts, page, totalPages } = useLoaderData<typeof loader>();
    const [searchParams] = useSearchParams();
    const navigation = useNavigation();

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">所有文章</h1>
            {navigation.state === "loading" ? (
                <div className="text-center">加载中...</div>
            ) : (
                <div className="space-y-8">
                    {posts.map((post) => (
                        <motion.article
                            key={post.slug}
                            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-shadow duration-300 ease-in-out hover:shadow-xl"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link to={`/posts/${post.slug}`} className="block hover:no-underline">
                                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">{post.title}</h2>
                            </Link>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                            <div className="flex justify-between items-center">
                                <TagList tags={post.tags} />
                                <span className="text-sm text-gray-500 dark:text-gray-500">{post.date}</span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            )}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center space-x-4">
                    {page > 1 && (
                        <Link
                            to={`/posts?page=${page - 1}`}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            上一页
                        </Link>
                    )}
                    {page < totalPages && (
                        <Link
                            to={`/posts?page=${page + 1}`}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            下一页
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}