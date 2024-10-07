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
  useLocation,
} from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "~/components/Navbar";
import ThemeToggle from "~/components/ThemeToggle";
import ScrollProgressBar from "~/components/ScrollProgressBar";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { getBlogSettings } from '~/config/blog-config';

import "./tailwind.css";
import "./styles/themes.css";

export const meta: MetaFunction = () => {
  return [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { "http-equiv": "Content-Type", content: "text/html; charset=utf-8" },
    { name: "description", content: "我的个人博客 - 分享我的想法和经验" },
  ];
};

export async function loader() {
  const settings = await getBlogSettings();
  return json({ settings });
}

export default function App() {
  const { settings } = useLoaderData<typeof loader>();
  const [theme, setTheme] = useLocalStorage("theme", settings.theme);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.className = theme;
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.documentElement.style.setProperty('--content-width', `${settings.contentWidth}px`);
    document.documentElement.style.fontFamily = settings.fontFamily;
  }, [theme, settings]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <html lang="zh-CN" className={theme}>
      <head>
        <Meta />
        <title>{settings.title}</title>
        <Links />
      </head>
      <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <Navbar links={settings.headerLinks} />
        <ScrollProgressBar />
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <div className="mx-auto px-4 py-8" style={{ maxWidth: `${settings.contentWidth}px` }}>
          <Outlet />
        </div>
        <footer className="py-4 mt-8 bg-gray-100 dark:bg-gray-800">
          <div className="mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400" style={{ maxWidth: `${settings.contentWidth}px` }}>
            {settings.footerText.replace('{year}', new Date().getFullYear().toString())}
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}