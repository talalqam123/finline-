import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboardcontent";
import FormWizardSample from "./Components/Formwizard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Important!
import UserDetails from "./Components/UserDetails";

// Import new components
import CompanyDetails from "./Components/Permanent Details/CompanyDetails";
import OwnerInformation from "./Components/Permanent Details/OwnerInformation";
import MonthlyExpense from "./Components/Income Details/MonthlyExpense";
import Assets from "./Components/Income Details/Assets";
import SalesRevenue from "./Components/Income Details/SalesRevenue";
import TermLoan from "./Components/Loan Details/TermLoan";
import WorkingCapitalLoan from "./Components/Loan Details/WorkingCapitalLoan";
import LoanSettings from "./Components/Loan Details/LoanSettings";
import PDFReport from "./Components/Final/PDF/PDFReport";
import PDFSettings from "./Components/Final/PDFSettings";
import BusinessProfile from "./Components/Final/BusinessProfile";
import Annexure from "./Components/Final/Annexure";
import CoverPageSettings from "./Components/Final/PDF/CoverPageSettings";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-report" element={<FormWizardSample />} />
        
        {/* Add redirect from old path to new path */}
        <Route path="/edit-details" element={<Navigate to="/permanent-details" replace />} />
        <Route path="/edit-details/*" element={<Navigate to="/permanent-details" replace />} />
        
        {/* Reorganized nested routes */}
        <Route path="/permanent-details" element={<UserDetails />}>
          <Route index element={<CompanyDetails />} />
          <Route path="company-details" element={<CompanyDetails />} />
          <Route path="owner-information" element={<OwnerInformation />} />
        </Route>

        <Route path="/income-details" element={<UserDetails />}>
          <Route index element={<MonthlyExpense />} />
          <Route path="monthly-expense" element={<MonthlyExpense />} />
          <Route path="assets" element={<Assets />} />
          <Route path="sales-revenue" element={<SalesRevenue />} />
        </Route>

        <Route path="/loan-details" element={<UserDetails />}>
          <Route index element={<TermLoan />} />
          <Route path="term-loan" element={<TermLoan />} />
          <Route path="working-capital-loan" element={<WorkingCapitalLoan />} />
          <Route path="loan-settings" element={<LoanSettings />} />
        </Route>

        <Route path="/final-details" element={<UserDetails />}>
          <Route index element={<Navigate to="pdf-report" replace />} />
          <Route path="pdf-report/:id" element={<PDFReport />} />
          <Route path="pdf-settings/:id" element={<CoverPageSettings />} />
          <Route path="business-profile/:id" element={<BusinessProfile />} />
          <Route path="annexure/:id" element={<Annexure />} />
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
    </>
  );
};

export default App;