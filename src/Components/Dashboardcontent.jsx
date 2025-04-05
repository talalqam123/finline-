import React, { useState, useEffect } from "react";
import { HiOutlineUserCircle, HiMenuAlt3, HiX } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from './Layout';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [isHovered, setIsHovered] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
          onClick={() => navigate('/create-report')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <AiOutlinePlus className="h-5 w-5" />
          <span>Create Report</span>
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100"
      >
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">No reports found. Create your first report!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/create-report')}
              className="mt-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-3 rounded-lg"
            >
              Create Report
            </motion.button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
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
                <AnimatePresence>
                  {reports.map((report, index) => (
                    <motion.tr 
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      onHoverStart={() => setIsHovered(report.id)}
                      onHoverEnd={() => setIsHovered(null)}
                      className={`transition-colors duration-200 ${
                        isHovered === report.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.reportName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.loanType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${report.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                        >
                          {report.status}
                        </motion.span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                          onClick={() => navigate(`/final-details/pdf-report/${report.id}`)}
                        >
                          View Details
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
    </Layout>
  );
}