export const loader = async ({ request }) => {
  const message = BLOG_SETTINGS || "环境变量未设置";
  
  return new Response(`<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>环境变量展示</title>
    </head>
    <body>
        <div>here: ${message}</div>
    </body>
    </html>`, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
};
