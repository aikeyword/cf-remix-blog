import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/cloudflare";
import type { ActionArgs } from "@remix-run/cloudflare";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const password = formData.get("password");

  if (password === "admin123") { // 在实际应用中,应使用更安全的方式验证密码
    return redirect("/blog_admin?admin=true");
  }

  return json({ error: "密码错误" });
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">管理员登录</h1>
      <Form method="post">
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">密码</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          登录
        </button>
      </Form>
      {actionData?.error && <p className="mt-4 text-red-600">{actionData.error}</p>}
    </div>
  );
}