import { useEffect, useState } from "react";
import { json, redirect } from "@remix-run/cloudflare";
import { useLoaderData, useActionData, Form, useSubmit } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { getBlogSettings, saveBlogSettings } from '~/config/blog-config';
import type { BlogSettings } from '~/types/blog';

export async function loader({ request }: LoaderArgs) {
    const url = new URL(request.url);
    const isAdmin = url.searchParams.get("admin") === "true";
    
    if (!isAdmin) {
        return redirect("/login");
    }
    
    const settings = await getBlogSettings();
    return json(settings);
}

export async function action({ request }: ActionArgs) {
    const url = new URL(request.url);
    const isAdmin = url.searchParams.get("admin") === "true";

    if (!isAdmin) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const newSettings: BlogSettings = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        author: formData.get("author") as string,
        postsPerPage: parseInt(formData.get("postsPerPage") as string, 10),
        postsJsonUrl: formData.get("postsJsonUrl") as string,
        adminPassword: formData.get("newPassword") as string || (await getBlogSettings()).adminPassword,
        theme: formData.get("theme") as string,
        footerText: formData.get("footerText") as string,
        headerLinks: JSON.parse(formData.get("headerLinks") as string),
        contentWidth: parseInt(formData.get("contentWidth") as string, 10),
        primaryColor: formData.get("primaryColor") as string,
        fontFamily: formData.get("fontFamily") as string,
    };

    try {
        await saveBlogSettings(newSettings);
        return json({ success: true });
    } catch (error) {
        return json({ error: "保存设置失败" }, { status: 500 });
    }
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
                <div>
                    <label htmlFor="footerText" className="block mb-2">页脚文本</label>
                    <input
                        type="text"
                        id="footerText"
                        name="footerText"
                        defaultValue={settings.footerText}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="headerLinks" className="block mb-2">页眉链接 (JSON 格式)</label>
                    <textarea
                        id="headerLinks"
                        name="headerLinks"
                        defaultValue={JSON.stringify(settings.headerLinks, null, 2)}
                        className="w-full p-2 border rounded"
                        rows={5}
                    />
                </div>
                <div>
                    <label htmlFor="contentWidth" className="block mb-2">内容宽度 (像素)</label>
                    <input
                        type="number"
                        id="contentWidth"
                        name="contentWidth"
                        defaultValue={settings.contentWidth}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="primaryColor" className="block mb-2">主色调</label>
                    <input
                        type="color"
                        id="primaryColor"
                        name="primaryColor"
                        defaultValue={settings.primaryColor}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="fontFamily" className="block mb-2">字体</label>
                    <select
                        id="fontFamily"
                        name="fontFamily"
                        defaultValue={settings.fontFamily}
                        className="w-full p-2 border rounded"
                    >
                        <option value="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif">系统默认字体</option>
                        <option value="'Noto Serif SC', serif">Noto Serif SC</option>
                        <option value="'Source Han Sans SC', sans-serif">思源黑体</option>
                        <option value="'Source Han Serif SC', serif">思源宋体</option>
                    </select>
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