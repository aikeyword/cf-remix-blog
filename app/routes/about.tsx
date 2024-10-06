import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "关于 - 我的个人博客" },
    { name: "description", content: "了解更多关于我和这个博客的信息" },
  ];
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">关于我</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>大家好,我是[你的名字]。这个博客是我分享想法和经验的地方。</p>
        <p>我热爱[你的兴趣/专业领域],希望通过这个博客与大家交流和分享。</p>
        <p>如果你有任何问题或建议,欢迎与我联系。</p>
      </div>
    </div>
  );
}