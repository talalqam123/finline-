import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboardcontent";
import FormWizardSample from "./Components/Formwizard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Important!
import UserDetails from "./Components/UserDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-report" element={<FormWizardSample />} />
        <Route path="/edit-details" element={<UserDetails />} />
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