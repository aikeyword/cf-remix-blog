import { useRouteError, isRouteErrorResponse, Link } from "@remix-run/react";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "未知错误";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">出错了</h1>
      <p className="text-xl mb-8">{errorMessage}</p>
      <Link to="/" className="text-blue-500 hover:underline">
        返回首页
      </Link>
    </div>
  );
}