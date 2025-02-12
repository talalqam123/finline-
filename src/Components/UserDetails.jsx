import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaFileAlt, FaCog } from 'react-icons/fa';
import Layout from './Layout';
import CompanyDetails from './CompanyDetails';
import OwnerInformation from './OwnerInformation';

const TabContainer = styled.div`
  width: 100%;
  padding: 30px;
  background: #f8f9fd;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
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
`;

const VerticalSubTabs = styled.div`
  width: 250px;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 10px;
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

  h3 {
    color: #1e293b;
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
  }
`;

const UserDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);

  const tabs = [
    {
      label: 'Permanent Details',
      icon: <FaUser />,
      subtabs: ['Company Details', 'Owner Information']
    },
    {
      label: 'Income Details',
      icon: <FaFileAlt />,
      subtabs: ['Monthly Expense', 'Assets', 'Sales & Revenue']
    },
    {
      label: 'Loan Details',
      icon: <FaCog />,
      subtabs: ['Term Loan', 'Working Capital Loan', 'Loan Settings']
    },
    {
      label: 'Final',
      icon: <FaCog />,
      subtabs: ['PDF Report', 'PDF Settings', 'Business Profile', 'Annexure']
    }
  ];

  const renderContent = (tabIndex, subtabIndex) => {
    if (tabIndex === 0) {
      if (subtabIndex === 0) {
        return <CompanyDetails />;
      } else if (subtabIndex === 1) {
        return <OwnerInformation />;
      }
    }
    return (
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-4">
          {tabs[tabIndex].subtabs[subtabIndex]}
        </h3>
        <p className="text-gray-600">Content coming soon...</p>
      </div>
    );
  };

  return (
    <Layout>
      <TabContainer>
        <HorizontalTabs tabCount={tabs.length}>
          {tabs.map((tab, index) => (
            <TabButton
              key={index}
              active={activeTab === index}
              onClick={() => setActiveTab(index)}
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
                onClick={() => setActiveSubTab(index)}
              >
                {subtab}
              </SubTabButton>
            ))}
          </VerticalSubTabs>

          <AnimatePresence mode="wait">
            <TabContent
              key={`${activeTab}-${activeSubTab}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent(activeTab, activeSubTab)}
            </TabContent>
          </AnimatePresence>
        </ContentContainer>
      </TabContainer>
    </Layout>
  );
};

export default UserDetails;