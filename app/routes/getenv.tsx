// app/routes/getenv.tsx

import { LoaderFunction } from 'remix';

export const loader: LoaderFunction = async ({ context }) => {
  // 获取环境变量
  const message = context.env.SHOW_ME || "环境变量未设置";

  return {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
    body: `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>环境变量展示</title>
          <style>
              body { display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 24px; }
          </style>
      </head>
      <body>
          <div>here: ${message}</div>
      </body>
      </html>`,
  };
};

export default function ShowEnv() {
  return null; // loader 函数会处理响应
}
