import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pdf-report-container">
      <Settings onSettingsChange={setSettings} />
      
      <div className="report-actions">
        <button onClick={handlePrint} disabled={!reportData}>
          Print Report
        </button>
        <button onClick={handleDownload} disabled={!reportData}>
          Download PDF
        </button>
      </div>

      <div className="report-preview" ref={componentRef}>
        {reportData && (
          <>
            {settings.showLogo && (
              <div className="report-logo">
                <img src={reportData.companyLogo} alt="Company Logo" />
              </div>
            )}
            
            <h1>{reportData.companyName}</h1>
            <div className="report-content">
              {/* Company Details */}
              <section>
                <h2>Company Details</h2>
                <p>Address: {reportData.businessInfo.address}</p>
                <p>Contact: {reportData.contact}</p>
              </section>

              {/* Financial Details */}
              <section>
                <h2>Financial Information</h2>
                <p>Monthly Revenue: {reportData.monthlyRevenue}</p>
                <p>Total Assets: {reportData.totalAssets}</p>
              </section>

              {/* Loan Details */}
              <section>
                <h2>Loan Information</h2>
                <p>Loan Amount: {reportData.loanAmount}</p>
                <p>Term: {reportData.loanTerm}</p>
              </section>

              {settings.includeAnnexure && reportData.annexure && (
                <section>
                  <h2>Annexure</h2>
                  {reportData.annexure}
                </section>
              )}
            </div>

            {settings.showFooter && (
              <footer>
                <p>Generated on: {new Date().toLocaleDateString()}</p>
                <p>Page 1 of 1</p>
              </footer>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PDFReport;
