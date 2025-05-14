import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle, HiMenuAlt3, HiX } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function Layout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-gray-50'}`}>
            {/* Navbar */}
            <nav className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-100'} shadow-lg border-b`}>
                <div className="max-w-1xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`text-base sm:text-lg font-bold bg-gradient-to-r ${darkMode ? 'from-blue-400 to-blue-200' : 'from-blue-600 to-blue-400'} bg-clip-text text-transparent cursor-pointer`}
                            onClick={() => navigate('/')}
                        >
                            <Link to="/">FinLine</Link>
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-4">
                            <button 
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-colors ${
                                    darkMode 
                                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                            </button>
                            <button className={`flex items-center text-sm transition-colors duration-300 px-4 py-2 rounded-lg ${
                                darkMode 
                                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                            }`}>
                                <HiOutlineUserCircle className="h-5 w-5" />
                                <span className="ml-2">Profile</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`transition-colors duration-300 ${
                                    darkMode 
                                    ? 'text-gray-400 hover:text-white' 
                                    : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                {isMobileMenuOpen ? (
                                    <HiX className="h-6 w-6" />
                                ) : (
                                    <HiMenuAlt3 className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`md:hidden border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
                    >
                        <div className="px-4 py-2">
                            <button 
                                onClick={toggleTheme}
                                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                                    darkMode 
                                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                                <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>
                            <button className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                                darkMode 
                                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                            }`}>
                                <HiOutlineUserCircle className="h-6 w-6" />
                                <span className="ml-2">Profile</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Main Content */}
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`max-w-1xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8 text-sm ${
                    darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}
            >
                {children}
            </motion.main>
        </div>
    );
}
