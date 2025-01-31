import React, { useState } from "react";
import { HiOutlineUserCircle, HiMenuAlt3, HiX } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import FormWizardSample from "./Components/Formwizard";

export default function Dashboard() {
  const [isHovered, setIsHovered] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFormWizard, setShowFormWizard] = useState(false);
  
  const tableData = [
    { id: 1, reportName: "Q1 Financial Report", date: "2024-01-15", status: "Completed" },
    { id: 2, reportName: "Customer Analysis", date: "2024-01-18", status: "Pending" },
    { id: 3, reportName: "Sales Overview", date: "2024-01-20", status: "In Progress" },
    { id: 4, reportName: "Marketing Campaign", date: "2024-01-22", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Responsive Navbar */}
      <nav className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
            >
              FinLine
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-blue-50">
                <HiOutlineUserCircle className="h-6 w-6" />
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

      {/* Responsive Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Responsive Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome back, <span className="text-blue-600">User!</span>
            </h1>
            <p className="text-gray-600 mt-1">Here's an overview of your reports</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFormWizard(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <AiOutlinePlus className="h-5 w-5" />
            <span>Create Report</span>
          </motion.button>
        </motion.div>

        {/* Responsive Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((row, index) => (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setIsHovered(row.id)}
                    onHoverEnd={() => setIsHovered(null)}
                    className={`transition-colors duration-200 ${
                      isHovered === row.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                      {row.reportName}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {row.date}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`px-2 sm:px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${row.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'}`}
                      >
                        {row.status}
                      </motion.span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                      >
                        View
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FormWizard Modal */}
        <AnimatePresence>
          {showFormWizard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setShowFormWizard(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl w-full max-w-2xl p-6 relative my-8"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Create New Report</h2>
                  <button
                    onClick={() => setShowFormWizard(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-full hover:bg-gray-100 p-1"
                  >
                    <HiX className="h-6 w-6" />
                  </button>
                </div>
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  <FormWizardSample />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}