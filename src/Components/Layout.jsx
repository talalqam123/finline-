import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle, HiMenuAlt3, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

export default function Layout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-lg border-b border-blue-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
                        onClick={() => navigate('/')}
                        
                    >
                     <Link> FinLine</Link>  
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-blue-50">
                            <HiOutlineUserCircle className="h-5 w-5" />
                            <span className="ml-2">Profile</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
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
                    className="md:hidden border-t border-gray-100"
                >
                    <div className="px-4 py-2">
                        <button className="flex items-center w-full text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-blue-50">
                            <HiOutlineUserCircle className="h-6 w-6" />
                            <span className="ml-2">Profile</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>

      {/* Main Content */ }
    <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 text-sm"
    >
        {children}
    </motion.main>
    </div >
  );
}
