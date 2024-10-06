import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/cloudflare";
import { getPosts } from "~/models/post.server";
import TagList from "~/components/TagList";

export const meta: MetaFunction = () => {
  return [
    { title: "我的个人博客" },
    { name: "description", content: "欢迎来到我的个人博客!" },
  ];
};

export async function loader() {
  const posts = await getPosts();
  return json({ posts: posts.slice(0, 3) });
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">欢迎来到我的博客</h1>
      <p className="text-xl mb-8">这里是我分享想法和经验的地方。</p>
      
      <h2 className="text-2xl font-bold mb-4">最新文章</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/posts/${post.slug}`} className="block hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rounded">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{post.date}</p>
              <TagList tags={post.tags} />
            </Link>
          </li>
        ))}
      </ul>
      
      <Link to="/posts" className="inline-block mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        查看所有文章
      </Link>
    </div>
  );
}