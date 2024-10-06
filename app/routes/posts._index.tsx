import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/cloudflare";
import { getPosts } from "~/models/post.server";

export const meta: MetaFunction = () => {
  return [
    { title: "所有文章 - 我的个人博客" },
    { name: "description", content: "浏览所有博客文章" },
  ];
};

export async function loader() {
  const posts = await getPosts();
  return json({ posts });
}

export default function PostsIndex() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">所有文章</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="block hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rounded">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{post.excerpt}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{post.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}