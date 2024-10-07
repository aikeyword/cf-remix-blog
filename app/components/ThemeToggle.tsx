import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
    theme: string;
    toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
    return (
        <motion.button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'dark' ? (
                    <Moon className="w-6 h-6 text-yellow-400" />
                ) : (
                    <Sun className="w-6 h-6 text-yellow-500" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;