import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboardcontent";
import FormWizardSample from "./Components/Formwizard";

const App = () => {

return (

  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/create-report" element={<FormWizardSample />} />
  </Routes>
)

}
export default App