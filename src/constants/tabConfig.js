import { FaUser, FaFileAlt, FaCog } from 'react-icons/fa';

export const tabs = [
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
      { label: 'PDF Report', path: 'pdf-report' },
      { label: 'PDF Settings', path: 'pdf-settings' },
      { label: 'Business Profile', path: 'business-profile' },
      { label: 'Annexure', path: 'annexure' }
    ]
  }
];
