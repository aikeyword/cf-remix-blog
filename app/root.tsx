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
  const theme = "default"; // 或 'dark' 或 'light'
  return json({ theme });
}

export default function App() {
  const { theme: initialTheme } = useLoaderData<typeof loader>();
  const [theme, setTheme] = useLocalStorage("theme", initialTheme);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.lang = "zh-CN";
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <html lang="zh-CN" className={`h-full ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <head>
        <Meta />
        <title>我的个人博客</title>
        <Links />
      </head>
      <body className="h-full font-sans antialiased">
        <Navbar />
        <ScrollProgressBar />
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto px-4 py-8"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
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