import React, { useState, useEffect } from "react";
import { HiOutlineUserCircle, HiMenuAlt3, HiX } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from './Layout';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Skeleton } from "@/Components/ui/skeleton";
import { useTheme } from '../context/ThemeContext';

const TableSkeleton = () => {
  const { darkMode } = useTheme();
  return (
    <div className="w-full">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-slate-50 to-gray-50'}`}>
        <div className="grid grid-cols-6 gap-4 px-6 py-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className={`h-6 w-full ${darkMode ? 'bg-gray-700' : 'bg-slate-200/60'}`} />
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {[...Array(5)].map((_, rowIndex) => (
          <div key={rowIndex} className={`grid grid-cols-6 gap-4 px-6 py-4 ${
            darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-slate-50/50'
          } transition-colors duration-200`}>
            <Skeleton className={`h-6 w-full ${darkMode ? 'bg-gray-700/60' : 'bg-slate-100/60'}`} />
            <Skeleton className={`h-6 w-full ${darkMode ? 'bg-gray-700/60' : 'bg-slate-100/60'}`} />
            <Skeleton className={`h-6 w-full ${darkMode ? 'bg-gray-700/60' : 'bg-slate-100/60'}`} />
            <Skeleton className={`h-6 w-full ${darkMode ? 'bg-gray-700/60' : 'bg-slate-100/60'}`} />
            <div className="flex items-center">
              <Skeleton className={`h-6 w-24 rounded-full ${darkMode ? 'bg-gray-700/60' : 'bg-slate-100/60'}`} />
            </div>
            <div className="flex items-center">
              <Skeleton className={`h-6 w-28 ${darkMode ? 'bg-gray-700/60' : 'bg-slate-100/60'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [isHovered, setIsHovered] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      console.log('Starting fetchReports');
      const response = await api.getSubmissions();
      console.log('API Response:', response);

      if (!response?.success || !response?.data) {
        throw new Error('Invalid response format');
      }

      const formattedReports = response.data.map(report => ({
        id: report._id,
        reportName: report.fullName || 'Untitled Report',
        date: new Date(report.createdAt).toLocaleDateString(),
        status: report.status || 'In Progress',
        type: report.businessType || 'N/A',
        loanType: report.loan || 'N/A'
      }));

      console.log('Formatted reports:', formattedReports);
      setReports(formattedReports);
    } catch (error) {
      console.error('Dashboard Error:', error);
      toast.error(error.message || 'Failed to fetch reports');
      setReports([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-1xl mx-auto"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          {isLoading ? (
            <div className="space-y-3 w-full sm:w-auto">
              <Skeleton className={`h-10 w-64 ${darkMode ? 'bg-gray-700' : 'bg-slate-200'}`} />
              <Skeleton className={`h-6 w-48 ${darkMode ? 'bg-gray-700' : 'bg-slate-100'}`} />
            </div>
          ) : (
            <div className="space-y-2">
              <h1 className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${
                darkMode ? 'from-indigo-400 to-purple-400' : 'from-indigo-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                Welcome back, User!
              </h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-slate-600'} text-lg`}>
                Here's an overview of your reports
              </p>
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/create-report')}
            className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
          >
            <AiOutlinePlus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-medium">Create Report</span>
          </motion.button>
        </div>

        {/* Reports Table Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${
            darkMode 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-white border-gray-100'
          } rounded-2xl shadow-xl border overflow-hidden`}
        >
          {isLoading ? (
            <TableSkeleton />
          ) : reports.length === 0 ? (
            <div className={`p-12 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="mb-6">
                <svg className={`mx-auto h-24 w-24 ${darkMode ? 'text-gray-600' : 'text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                No reports found. Start by creating your first report!
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/create-report')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
              >
                <AiOutlinePlus className="h-5 w-5" />
                <span className="font-medium">Create First Report</span>
              </motion.button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-slate-50 to-gray-50'}>
                    {["Business Name", "Business Type", "Loan Type", "Created Date", "Status", "Actions"].map((header) => (
                      <th key={header} className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-slate-700'
                      }`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                  <AnimatePresence>
                    {reports.map((report, index) => (
                      <motion.tr 
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className={`group ${
                          darkMode 
                            ? 'hover:bg-gray-800' 
                            : 'hover:bg-slate-50'
                        } transition-colors duration-200`}
                      >
                        <td className={`px-6 py-4 text-sm font-medium ${
                          darkMode ? 'text-gray-200' : 'text-slate-900'
                        }`}>
                          {report.reportName}
                        </td>
                        <td className={`px-6 py-4 text-sm ${
                          darkMode ? 'text-gray-300' : 'text-slate-600'
                        }`}>
                          {report.type}
                        </td>
                        <td className={`px-6 py-4 text-sm ${
                          darkMode ? 'text-gray-300' : 'text-slate-600'
                        }`}>
                          {report.loanType}
                        </td>
                        <td className={`px-6 py-4 text-sm ${
                          darkMode ? 'text-gray-300' : 'text-slate-600'
                        }`}>
                          {report.date}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-4 py-1.5 text-xs font-semibold rounded-full inline-flex items-center
                            ${report.status === 'Completed' 
                              ? darkMode 
                                ? 'bg-green-900/30 text-green-400' 
                                : 'bg-green-50 text-green-700'
                              : report.status === 'In Progress'
                                ? darkMode
                                  ? 'bg-blue-900/30 text-blue-400'
                                  : 'bg-blue-50 text-blue-700'
                                : darkMode
                                  ? 'bg-amber-900/30 text-amber-400'
                                  : 'bg-amber-50 text-amber-700'
                            }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(`/final-details/pdf-report/${report.id}`)}
                            className={`${
                              darkMode
                                ? 'text-indigo-400 hover:text-indigo-300'
                                : 'text-indigo-600 hover:text-indigo-800'
                            } font-medium text-sm`}
                          >
                            View Details →
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </motion.div>
    </Layout>
  );
}