import * as React from "react";
import type { MetaFunction, LinksFunction, LoaderArgs } from "@remix-run/cloudflare";
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
import ThemeToggle from "~/components/ThemeToggle";
import ScrollProgressBar from "~/components/ScrollProgressBar";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import type { BlogSettings } from "~/types/blog";
import { getBlogSettings } from "~/utils/getBlogSettings";

import "./tailwind.css";
import "./styles/themes.css";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { settings } = data;
  return [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { "http-equiv": "Content-Type", content: "text/html; charset=utf-8" },
    { name: "description", content: settings.description },
    { name: "author", content: settings.author },
    { property: "og:title", content: settings.title },
    { property: "og:description", content: settings.description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: settings.author },
    { name: "twitter:title", content: settings.title },
    { name: "twitter:description", content: settings.description },
  ];
};

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export const loader = async ({ context }: LoaderArgs) => {
  const settings = getBlogSettings(context);
  return json({ settings });
};

export default function App() {
  const { settings } = useLoaderData<typeof loader>();
  const [theme, setTheme] = useLocalStorage("theme", settings.theme || defaultBlogSettings.theme);

  React.useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.documentElement.style.setProperty('--content-width', `${settings.contentWidth}px`);
    document.documentElement.style.fontFamily = settings.fontFamily;
  }, [theme, settings]);

  const toggleTheme = React.useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  const MemoizedNavbar = React.memo(Navbar);
  const MemoizedThemeToggle = React.memo(ThemeToggle);
  const MemoizedScrollProgressBar = React.memo(ScrollProgressBar);

  return (
    <html lang="zh-CN" className={`theme-${theme}`}>
      <head>
        <Meta />
        <title>{settings.title}</title>
        <Links />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": settings.title,
            "description": settings.description,
            "author": {
              "@type": "Person",
              "name": settings.author
            }
          })}
        </script>
      </head>
      <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <MemoizedNavbar links={settings.headerLinks} />
        <MemoizedScrollProgressBar />
        <div className="fixed top-4 right-4 z-50">
          <MemoizedThemeToggle theme={theme} toggleTheme={toggleTheme} />
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