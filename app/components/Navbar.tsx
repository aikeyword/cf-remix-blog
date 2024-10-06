import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">我的博客</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-300">首页</Link></li>
          <li><Link to="/posts" className="hover:text-gray-300">文章</Link></li>
          <li><Link to="/about" className="hover:text-gray-300">关于</Link></li>
        </ul>
      </div>
    </nav>
  );
}