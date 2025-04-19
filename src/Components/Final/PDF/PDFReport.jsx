import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../../services/api';
import Settings from './settings';
import { toast } from 'react-toastify';

const PDFReport = () => {
  const [reportData, setReportData] = useState(null);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      toast.error('No report ID provided');
      navigate('/', { replace: true });
      return;
    }
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.getSubmission(id);
        console.log('Raw submission data:', response); // Add this line
        
        if (!response.success || !response.data) {
          throw new Error('Failed to fetch report data');
        }

        // Log transformed data
        console.log('Transformed report data:', {
          companyName: response.data.fullName,
          businessType: response.data.businessType,
          industry: response.data.industry,
          monthlyExpenses: response.data.monthlyExpenses,
          requirements: response.data.requirements,
          personalInfo: response.data.personalInfo,
          businessInfo: response.data.businessInfo
        });
        
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
        toast.error(error.message);
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const { data } = await api.getSubmission(id); // First get the submission data
      if (!data) {
        throw new Error('No submission found');
      }
      
      const reportResponse = await api.generateReportPreview(id);
      if (reportResponse.success && reportResponse.data) {
        setReportData(reportResponse.data);
      } else {
        throw new Error('Failed to generate report preview');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch report data');
      console.error('Report Preview Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `report-${id}`,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        toast.info('Preparing document...');
        resolve();
      });
    },
    onAfterPrint: () => {
      toast.success('Document printed successfully!');
    },
  });

  const handleDownload = async () => {
    try {
      setLoading(true);
      await api.downloadReport(id, settings);
      toast.success('Report downloaded successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Report Title and Hero Section */}
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            <span className="text-black">PROJECT</span>{' '}
            <span className="text-purple-600">REPORT</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center gap-8 mt-8"
          >
            {/* Left Side Illustration */}
            <div className="flex-1 max-w-md">
              <img 
                src="/public/manufacturing.svg" 
                alt="Project Report Illustration" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Right Side Illustration */}
            <div className="flex-1 max-w-md">
              <img 
                src="/public/calculator.svg" 
                alt="Financial Calculator Illustration" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Settings and Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Settings onSettingsChange={setSettings} />
          
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={handlePrint} 
              disabled={!reportData}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              Print Report
            </button>
            <button 
              onClick={handleDownload} 
              disabled={!reportData}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              Download PDF
            </button>
          </div>
        </motion.div>

        {/* Report Preview */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="report-preview bg-white rounded-lg shadow-md p-8" 
          ref={componentRef}
        >
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : reportData && (
            <>
              {settings.showLogo && (
                <div className="mb-8 flex justify-center">
                  <img src={reportData.companyLogo} alt="Company Logo" className="h-16" />
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-center mb-8">{reportData.companyName}</h2>
              
              <div className="space-y-8">
                {/* Company Details */}
                <section className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-4">Company Details</h3>
                  <p className="text-gray-700">Address: {reportData?.businessInfo?.address}</p>
                  <p className="text-gray-700">Contact: {reportData?.contact}</p>
                </section>

                {/* Financial Details */}
                <section className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-4">Financial Information</h3>
                  <p className="text-gray-700">Monthly Revenue: {reportData?.monthlyRevenue}</p>
                  <p className="text-gray-700">Total Assets: {reportData?.totalAssets}</p>
                </section>

                {/* Loan Details */}
                <section className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-4">Loan Information</h3>
                  <p className="text-gray-700">Loan Amount: {reportData?.loanAmount}</p>
                  <p className="text-gray-700">Term: {reportData?.loanTerm}</p>
                </section>

                {settings.includeAnnexure && reportData?.annexure && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Annexure</h3>
                    <div className="text-gray-700">{reportData.annexure}</div>
                  </section>
                )}
              </div>

              {settings.showFooter && (
                <footer className="mt-12 pt-6 border-t text-sm text-gray-600">
                  <p>Generated on: {new Date().toLocaleDateString()}</p>
                  <p>Page 1 of 1</p>
                </footer>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PDFReport;
