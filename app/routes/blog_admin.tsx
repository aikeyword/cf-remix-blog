import { useEffect, useState } from "react";
import { json, redirect } from "@remix-run/cloudflare";
import { useLoaderData, useActionData, Form, useSubmit } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";

interface BlogSettings {
    title: string;
    description: string;
    author: string;
    postsPerPage: number;
    postsJsonUrl: string;
    adminPassword: string;
    theme: string;
}

// 模拟从某个存储中获取设置
async function getSettings(): Promise<BlogSettings> {
    return {
        title: "我的个人博客",
        description: "分享我的想法和经验",
        author: "您的名字",
        postsPerPage: 10,
        postsJsonUrl: "https://raw.githubusercontent.com/yourusername/your-repo/main/public/posts.json",
        adminPassword: "admin123", // 注意: 实际应用中应使用更安全的方式存储密码
        theme: "default",
    };
}

// 模拟保存设置
async function saveSettings(settings: BlogSettings): Promise<void> {
    console.log("保存设置:", settings);
    // 这里应该实现实际的保存逻辑
}

// 模拟会话管理
async function getSession(cookie: string | null): Promise<{ has: (key: string) => boolean }> {
    // 这里应该实现实际的会话管理逻辑
    return {
        has: (key: string) => key === "isAdmin",
    };
}

export async function loader({ request }: LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session.has("isAdmin")) {
        return redirect("/login");
    }
    const settings = await getSettings();
    return json(settings);
}

export async function action({ request }: ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session.has("isAdmin")) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const newSettings: BlogSettings = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        author: formData.get("author") as string,
        postsPerPage: parseInt(formData.get("postsPerPage") as string, 10),
        postsJsonUrl: formData.get("postsJsonUrl") as string,
        adminPassword: formData.get("newPassword") as string || (await getSettings()).adminPassword,
        theme: formData.get("theme") as string,
    };

    await saveSettings(newSettings);
    return redirect("/blog_admin");
}

export default function BlogAdmin() {
    const settings = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const [showPassword, setShowPassword] = useState(false);
    const submit = useSubmit();

    useEffect(() => {
        if (actionData?.error) {
            alert(actionData.error);
        }
    }, [actionData]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">博客管理</h1>
            <Form method="post" className="space-y-4" onSubmit={(event) => {
                const form = event.currentTarget;
                submit(form, { replace: true });
            }}>
                <div>
                    <label htmlFor="title" className="block mb-2">博客标题</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={settings.title}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block mb-2">博客描述</label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={settings.description}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="author" className="block mb-2">作者名称</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        defaultValue={settings.author}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="postsPerPage" className="block mb-2">每页文章数</label>
                    <input
                        type="number"
                        id="postsPerPage"
                        name="postsPerPage"
                        defaultValue={settings.postsPerPage}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="postsJsonUrl" className="block mb-2">文章JSON文件URL</label>
                    <input
                        type="url"
                        id="postsJsonUrl"
                        name="postsJsonUrl"
                        defaultValue={settings.postsJsonUrl}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="theme" className="block mb-2">主题</label>
                    <select
                        id="theme"
                        name="theme"
                        defaultValue={settings.theme}
                        className="w-full p-2 border rounded"
                    >
                        <option value="default">默认主题</option>
                        <option value="dark">深色主题</option>
                        <option value="light">浅色主题</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="newPassword" className="block mb-2">新密码 (留空则不更改)</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="mt-2 text-sm text-blue-500"
                    >
                        {showPassword ? "隐藏密码" : "显示密码"}
                    </button>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    保存设置
                </button>
            </Form>
            {actionData?.error && <p className="mt-4 text-red-600">{actionData.error}</p>}
            {actionData && !actionData.error && <p className="mt-4 text-green-600">设置已保存</p>}
        </div>
    );
}