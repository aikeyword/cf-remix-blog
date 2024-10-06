import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import Navbar from "~/components/Navbar";

import "./tailwind.css";
import "./styles/themes.css";

export const meta: MetaFunction = () => {
  return [
    { charset: "utf-8" },
    { title: "我的个人博客" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
};

export async function loader() {
  // 这里应该从实际的存储中获取主题设置
  const theme = "default"; // 或 'dark' 或 'light'
  return json({ theme });
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>();

  return (
    <html lang="zh-CN" className={`h-full ${theme === 'dark' ? 'theme-dark' : theme === 'light' ? 'theme-light' : ''}`}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full font-sans">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <footer className="py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-sm">
            © {new Date().getFullYear()} 我的个人博客. 保留所有权利.
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
