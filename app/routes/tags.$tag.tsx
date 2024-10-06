import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import type { MetaFunction, LoaderArgs } from "@remix-run/cloudflare";
import { getPostsByTag } from "~/models/post.server";
import invariant from "tiny-invariant";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "标签未找到" },
      { name: "description", content: "抱歉,未找到您请求的标签。" },
    ];
  }
  return [
    { title: `${data.tag} - 标签文章 - 我的个人博客` },
    { name: "description", content: `查看所有带有 ${data.tag} 标签的文章` },
  ];
};

export async function loader({ params }: LoaderArgs) {
  invariant(params.tag, "Expected params.tag");
  const posts = await getPostsByTag(params.tag);
  return json({ posts, tag: params.tag });
}

export default function TagPosts() {
  const { posts, tag } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">标签: {tag}</h1>
      {posts.length > 0 ? (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`} className="block hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rounded">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{post.excerpt}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>没有找到带有此标签的文章。</p>
      )}
      <div className="mt-8">
        <Link to="/posts" className="text-blue-500 hover:underline">
          ← 返回文章列表
        </Link>
      </div>
    </div>
  );
}