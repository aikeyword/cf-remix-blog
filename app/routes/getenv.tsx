import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ context }: LoaderFunctionArgs) {
  const blogSettings = context.env.BLOG_SETTINGS || "环境变量未设置";
  return json({ blogSettings });
}

export default function GetEnv() {
  const { blogSettings } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">BLOG_SETTINGS 环境变量</h1>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto mb-6">
        {blogSettings}
      </pre>
    </div>
  );
}