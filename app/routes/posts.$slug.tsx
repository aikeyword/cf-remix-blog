import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
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
  invariant(params.slug, "slug is required");
  const post = await getPost(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  const html = marked(post.content);
  return json({ post, html });
}

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>();

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
          <span>{post.date}</span>
          <TagList tags={post.tags} />
        </div>
      </header>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}