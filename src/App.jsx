import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BusinessReportProvider } from './context/BusinessReportContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';

// Import components
import Dashboard from "./Components/Layout & Dashboard/Dashboardcontent";
import FormWizardSample from "./Components/Layout & Dashboard/Formwizard";
import UserDetails from "./Components/Layout & Dashboard/UserDetails";
import Loader from '../components/Loader';

// Import new components
import CompanyDetails from "./Components/Company Details/BasicDetails";
import OwnerInformation from "./Components/Company Details/OwnerInformation";
import MonthlyExpense from "./Components/Income Details/MonthlyExpense";
// import Assets from "./Components/Income Details/Term";
import SalesRevenue from "./Components/Income Details/SalesRevenue";
import TermLoan from "./Components/Loan Details/TermLoan";
import WorkingCapitalLoan from "./Components/Loan Details/WorkingCapitalLoan";
import LoanSettings from "./Components/Loan Details/LoanSettings";
import PDFReport from "./Components/Final/PDF/PDFReport";
import PDFSettings from "./Components/Final/PDFSettings";
import BusinessProfile from "./Components/Company Details/BusinessProfile";
import Annexure from "./Components/Company Details/Annexure";
import Home from './Components/Final/PDF/PDFReport';
import TermLoanSettings from './Components/Loan Details/TermLoanSettings';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BusinessReportProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-report" element={<FormWizardSample />} />
            
            {/* Add redirect from old path to new path */}
            <Route path="/edit-details" element={<Navigate to="/permanent-details" replace />} />
            <Route path="/edit-details/*" element={<Navigate to="/permanent-details" replace />} />
            
            {/* Reorganized nested routes */}
            <Route path="/company-details" element={<UserDetails />}>
              <Route index element={<CompanyDetails />} />
              <Route path="basic-details" element={<CompanyDetails />} />
              <Route path="owner-information" element={<OwnerInformation />} />
              <Route path="business-profile/:id" element={<BusinessProfile />} />
              <Route path="annexure/:id" element={<Annexure />} />
            </Route>

            <Route path="/income-details" element={<UserDetails />}>
              <Route index element={<MonthlyExpense />} />
              <Route path="monthly-expense" element={<MonthlyExpense />} />
             
              <Route path="sales-revenue" element={<SalesRevenue />} />
            </Route>

            <Route path="/loan-details" element={<UserDetails />}>
              <Route index element={<TermLoan />} />
              <Route path="term-loan-2" element={<TermLoanSettings />} />
              <Route path="term-loan-1" element={<TermLoan />} />
              <Route path="working-capital-loan" element={<WorkingCapitalLoan />} />
              <Route path="loan-settings" element={<LoanSettings />} />
            </Route>

            <Route path="/final-details" element={<UserDetails />}>
              <Route index element={<Navigate to="pdf-report" replace />} />
              <Route path="pdf-report/:id" element={<Home/>} />
              <Route path="pdf-settings/:id" element={<PDFSettings/>} />
             
            </Route>

            {/* Add catch-all route for 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}  
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BusinessReportProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;