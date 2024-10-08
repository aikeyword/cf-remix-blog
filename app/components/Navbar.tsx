import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";
import { motion } from "framer-motion";

interface NavLink {
    text: string;
    url: string;
}

interface NavbarProps {
    links: NavLink[];
}

export default function Navbar({ links }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <motion.span
                                className="text-2xl font-bold text-gray-900 dark:text-white"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                我的博客
                            </motion.span>
                        </Link>
                    </div>
                    <div className="hidden md:ml-6 md:flex md:space-x-8">
                        {links.map((link) => (
                            <NavLink key={link.url} to={link.url}>
                                {link.text}
                            </NavLink>
                        ))}
                        <NavLink to="/status">状态</NavLink>
                    </div>
                    <div className="-mr-2 flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="sr-only">打开主菜单</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <MobileNavLink to="/">首页</MobileNavLink>
                        <MobileNavLink to="/posts">文章</MobileNavLink>
                        <MobileNavLink to="/about">关于</MobileNavLink>
                    </div>
                </div>
            )}
        </nav>
    );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <Link
                to={to}
                className={`${
                    isActive ? 'border-b-2 border-blue-500' : ''
                } text-gray-900 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium`}
                aria-current={isActive ? 'page' : undefined}
            >
                {children}
            </Link>
        </motion.div>
    );
}

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''} text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </Link>
    );
}