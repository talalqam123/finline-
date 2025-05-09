import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaFileAlt, FaCog } from 'react-icons/fa';
import Layout from './Layout';
import CompanyDetails from './Company Details/BasicDetails';
import OwnerInformation from './Company Details/OwnerInformation';
import MonthlyExpense from './Income Details/MonthlyExpense';
import { toast } from 'react-toastify';

const TabContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  padding: 24px;
  // background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 16px;
  }
`;

const HorizontalTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.tabCount}, 1fr);
  gap: 12px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TabButton = styled.button`
  padding: 14px;
  border: none;
  background: ${props => props.active ?
    'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' :
    'rgba(255, 255, 255, 0.9)'};
  cursor: pointer;
  font-size: 13px;
  color: ${props => props.active ? '#ffffff' : '#475569'};
  transition: all 0.3s ease;
  border-radius: 16px;
  font-weight: ${props => props.active ? '600' : '500'};
  box-shadow: ${props => props.active ?
    '0 10px 25px -5px rgba(79, 70, 229, 0.25)' :
    '0 4px 6px -1px rgba(0, 0, 0, 0.05)'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transform: ${props => props.active ? 'translateY(-2px)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.2);
  }

  svg {
    font-size: 16px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 24px;
  background: white;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05);
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  min-height: 600px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
  }
`;

const VerticalSubTabs = styled.div`
  width: 250px;
  background: #f8fafc;
  border-radius: 16px;
  padding: 12px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SubTabButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  border: none;
  background: ${props => props.active ?
    'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' :
    'transparent'};
  cursor: pointer;
  color: ${props => props.active ? '#ffffff' : '#475569'};
  transition: all 0.3s ease;
  border-radius: 12px;
  margin-bottom: 8px;
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    background: ${props => props.active ?
    'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' :
    'rgba(79, 70, 229, 0.1)'};
    color: ${props => props.active ? '#ffffff' : '#4f46e5'};
  }

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props => props.active ? '#ffffff' : '#94a3b8'};
  }
`;

const TabContent = styled(motion.div)`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 16px;

  h3 {
    color: #1e293b;
    font-size: 24px;
    margin-bottom: 24px;
    font-weight: 600;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
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
      label: 'Company Details',
      icon: <FaUser />,
      basePath: '/company-details',
      subtabs: [
        { label: 'Basic Details', path: 'basic-details' },
        { label: 'Owner Information', path: 'owner-information' },
        { label: 'Business Profile', path: reportId ? `business-profile/${reportId}` : 'business-profile' },
        { label: 'Annexure', path: reportId ? `annexure/${reportId}` : 'annexure' }
      ]
    },
    {
      label: 'Income Details',
      icon: <FaFileAlt />,
      basePath: '/income-details',
      subtabs: [
        { label: 'Monthly Expense', path: 'monthly-expense' },
      
        { label: 'Sales & Revenue', path: 'sales-revenue' }
      ]
    },
    {
      label: 'Loan Details',
      icon: <FaCog />,
      basePath: '/loan-details',
      subtabs: [
        { label: 'Term Loan (1)', path: 'term-loan-1' },
        { label: 'Term Loan (2)', path: 'term-loan-2' },
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