import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaFileAlt, FaCog } from 'react-icons/fa';
import Layout from './Layout';
import CompanyDetails from './Permanent Details/CompanyDetails';
import OwnerInformation from './Permanent Details/OwnerInformation';
import MonthlyExpense from './Income Details/MonthlyExpense';
import { toast } from 'react-toastify';

const TabContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px); // Adjust based on your Layout's header height
  padding: 30px;
  background: #f8f9fd;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const HorizontalTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.tabCount}, 1fr);
  gap: 15px;
  margin-bottom: 40px;
  padding: 5px;
`;

const TabButton = styled.button`
  padding: 16px 24px;
  border: none;
  background: ${props => props.active ?
    'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' :
    'rgba(255, 255, 255, 0.8)'};
  cursor: pointer;
  font-size: 16px;
  position: relative;
  color: ${props => props.active ? '#ffffff' : '#64748b'};
  transition: all 0.4s ease;
  border-radius: 12px;
  font-weight: ${props => props.active ? '600' : '500'};
  box-shadow: ${props => props.active ?
    '0 10px 20px rgba(99, 102, 241, 0.2)' :
    '0 4px 6px rgba(0, 0, 0, 0.05)'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transform: ${props => props.active ? 'translateY(-2px)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 20px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 30px;
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  flex: 1;
  overflow: hidden;
`;

const VerticalSubTabs = styled.div`
  width: 250px;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 10px;
  flex-shrink: 0;
`;

const SubTabButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  text-align: left;
  border: none;
  background: ${props => props.active ?
    'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' :
    'transparent'};
  cursor: pointer;
  color: ${props => props.active ? '#ffffff' : '#64748b'};
  transition: all 0.3s ease;
  border-radius: 8px;
  margin-bottom: 8px;
  font-weight: ${props => props.active ? '600' : '500'};
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${props => props.active ?
    'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' :
    'rgba(99, 102, 241, 0.1)'};
    color: ${props => props.active ? '#ffffff' : '#6366f1'};
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: ${props => props.active ? '#ffffff' : 'transparent'};
    border-radius: 2px;
  }
`;

const TabContent = styled(motion.div)`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;

  h3 {
    color: #1e293b;
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

const UserDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Add this line
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [reportId, setReportId] = useState(id); // Add this line

  // Update tabs definition to use reportId
  const tabs = [
    {
      label: 'Permanent Details',
      icon: <FaUser />,
      basePath: '/permanent-details',
      subtabs: [
        { label: 'Company Details', path: 'company-details' },
        { label: 'Owner Information', path: 'owner-information' }
      ]
    },
    {
      label: 'Income Details',
      icon: <FaFileAlt />,
      basePath: '/income-details',
      subtabs: [
        { label: 'Monthly Expense', path: 'monthly-expense' },
        { label: 'Assets', path: 'assets' },
        { label: 'Sales & Revenue', path: 'sales-revenue' }
      ]
    },
    {
      label: 'Loan Details',
      icon: <FaCog />,
      basePath: '/loan-details',
      subtabs: [
        { label: 'Term Loan', path: 'term-loan' },
        { label: 'Working Capital Loan', path: 'working-capital-loan' },
        { label: 'Loan Settings', path: 'loan-settings' }
      ]
    },
    {
      label: 'Final',
      icon: <FaCog />,
      basePath: '/final-details',
      subtabs: [
        { label: 'PDF Report', path: reportId ? `pdf-report/${reportId}` : 'pdf-report' },
        { label: 'PDF Settings', path: reportId ? `pdf-settings/${reportId}` : 'pdf-settings' },
        { label: 'Business Profile', path: reportId ? `business-profile/${reportId}` : 'business-profile' },
        { label: 'Annexure', path: reportId ? `annexure/${reportId}` : 'annexure' }
      ]
    }
  ];

  // Find active tab based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const tabIndex = tabs.findIndex(tab => currentPath.includes(tab.basePath));
    if (tabIndex !== -1) {
      setActiveTab(tabIndex);
      // Find active subtab
      const subtabIndex = tabs[tabIndex].subtabs.findIndex(
        subtab => currentPath.includes(subtab.path)
      );
      setActiveSubTab(subtabIndex !== -1 ? subtabIndex : 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Set initial route for each section if we're at the base path
    const currentTab = tabs[activeTab];
    if (location.pathname === currentTab.basePath) {
      navigate(`${currentTab.basePath}/${currentTab.subtabs[0].path}`);
    }
  }, [activeTab, location.pathname]);

  // Add effect to update reportId when URL changes
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const possibleId = pathSegments[pathSegments.length - 1];
    if (possibleId && possibleId.length === 24) { // Assuming MongoDB ObjectId length
      setReportId(possibleId);
    }
  }, [location.pathname]);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    setActiveSubTab(0);
    navigate(`${tabs[tabIndex].basePath}/${tabs[tabIndex].subtabs[0].path}`);
  };

  // Update handleSubTabClick function
  const handleSubTabClick = (tabIndex, subtabIndex) => {
    setActiveTab(tabIndex);
    setActiveSubTab(subtabIndex);
    const currentTab = tabs[tabIndex];
    const subtab = currentTab.subtabs[subtabIndex];
    
    if (!reportId && currentTab.label === 'Final') {
      toast.error('Please select a report first');
      navigate('/');
      return;
    }
    
    navigate(`${currentTab.basePath}/${subtab.path}`);
  };

  return (
    <Layout>
      <TabContainer>
        <HorizontalTabs tabCount={tabs.length}>
          {tabs.map((tab, index) => (
            <TabButton
              key={index}
              active={activeTab === index}
              onClick={() => handleTabClick(index)}
            >
              {tab.icon}
              {tab.label}
            </TabButton>
          ))}
        </HorizontalTabs>

        <ContentContainer>
          <VerticalSubTabs>
            {tabs[activeTab].subtabs.map((subtab, index) => (
              <SubTabButton
                key={index}
                active={activeSubTab === index}
                onClick={() => handleSubTabClick(activeTab, index)}
              >
                {subtab.label}
              </SubTabButton>
            ))}
          </VerticalSubTabs>

          <TabContent
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </TabContent>
        </ContentContainer>
      </TabContainer>
    </Layout>
  );
};

export default UserDetails;