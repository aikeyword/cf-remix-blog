import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import type { MetaFunction, LoaderArgs } from "@remix-run/cloudflare";
import { getPost } from "~/models/post.server";
import invariant from "tiny-invariant";
import { marked } from "marked";
import TagList from "~/components/TagList";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "文章未找到" },
      { name: "description", content: "抱歉,未找到您请求的文章。" },
    ];
  }
  return [
    { title: `${data.post.title} - 我的个人博客` },
    { name: "description", content: data.post.excerpt },
  ];
};

export async function loader({ params }: LoaderArgs) {
  invariant(params.slug, "Expected params.slug");
  const post = await getPost(params.slug);
  const html = marked(post.content);
  return json({ post, html });
}

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{post.date}</p>
      <TagList tags={post.tags} />
      <div 
        className="prose dark:prose-invert max-w-none mt-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="mt-8">
        <Link to="/posts" className="text-blue-500 hover:underline">
          ← 返回文章列表
        </Link>
      </div>
    </div>
  );
}