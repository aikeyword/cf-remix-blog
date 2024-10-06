import * as React from "react";
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
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
};

export async function loader() {
  const theme = "default"; // 或 'dark' 或 'light'
  return json({ theme });
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>();

  React.useEffect(() => {
    console.log("App component mounted");
    document.documentElement.lang = "zh-CN";
  }, []);

  return (
    <html lang="zh-CN" className={`h-full ${theme === 'dark' ? 'theme-dark' : theme === 'light' ? 'theme-light' : ''}`}>
      <head>
        <Meta />
        <title>我的个人博客</title>
        <Links />
      </head>
      <body className="h-full font-sans antialiased">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <footer className="py-4 mt-8 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
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
