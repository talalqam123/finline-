import React, { createContext, useContext, useReducer } from 'react';
import { demoData } from '../lib/data';
const BusinessReportContext = createContext();
const initialState = demoData;
// const initialState = {
//   project: {
//     name: "",
//     address: "",
//     status: "",
//     industry: "",
//     sector: "",
//     constitution: "",
//     incorporationDate: "",
//     location: "",
//     contactPerson: "",
//     cost: 0,
//     termLoan: 0,
//     workingCapital: 0,
//     netWorth: 0,
//     year: new Date().getFullYear().toString(),
//     email: ""
//   },
//   promoters: [],
//   financials: {
//     projections: [],
//     chartData: [],
//     revenueSourceData: []
//   },
//   scope: {
//     paragraphs: []
//   },
//   market: {
//     paragraphs: [],
//     list: [],
//     paragraphs2: []
//   },
//   risks: [],
//   projectCost: [],
//   workingCapital: [],
//   applicationOfFunds: []
// };

function businessReportReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PROJECT':
      return { ...state, project: { ...state.project, ...action.payload } };
    case 'UPDATE_PROMOTERS':
      return { ...state, promoters: action.payload };
    case 'UPDATE_FINANCIALS':
      return { ...state, financials: { ...state.financials, ...action.payload } };
    case 'UPDATE_SCOPE':
      return { ...state, scope: { ...state.scope, ...action.payload } };
    case 'UPDATE_MARKET':
      return { ...state, market: { ...state.market, ...action.payload } };
    case 'UPDATE_RISKS':
      return { ...state, risks: action.payload };
    case 'UPDATE_PROJECT_COST':
      return { ...state, projectCost: action.payload };
    case 'UPDATE_WORKING_CAPITAL':
      return { ...state, workingCapital: action.payload };
    case 'UPDATE_APPLICATION_OF_FUNDS':
      return { ...state, applicationOfFunds: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function BusinessReportProvider({ children }) {
  const [state, dispatch] = useReducer(businessReportReducer, initialState);

  // Helper functions for calculations
  const calculateFinancials = (inputs) => {
    // Example calculation methods
    const calculateRevenue = (baseRevenue, growthRate, years) => {
      return Array(years).fill(0).map((_, i) => 
        baseRevenue * Math.pow(1 + growthRate, i)
      );
    };

    const calculateOperatingCosts = (revenue, operatingMargin) => {
      return revenue.map(rev => rev * (1 - operatingMargin));
    };

    const calculateGrossProfit = (revenue, costs) => {
      return revenue.map((rev, i) => rev - costs[i]);
    };

    // Perform calculations
    const revenue = calculateRevenue(inputs.baseRevenue || 850000, inputs.growthRate || 0.2, 5);
    const operatingCosts = calculateOperatingCosts(revenue, inputs.operatingMargin || 0.3);
    const grossProfit = calculateGrossProfit(revenue, operatingCosts);

    // Format data for charts
    const chartData = revenue.map((rev, i) => ({
      name: `Year ${i + 1}`,
      revenue: rev,
      costs: operatingCosts[i],
      profit: grossProfit[i]
    }));

    // Update financial projections
    dispatch({
      type: 'UPDATE_FINANCIALS',
      payload: {
        projections: [
          {
            particular: "Revenue",
            ...revenue.reduce((acc, val, i) => ({ ...acc, [`year${i + 1}`]: `$${val.toFixed(2)}` }), {})
          },
          {
            particular: "Operating Costs",
            ...operatingCosts.reduce((acc, val, i) => ({ ...acc, [`year${i + 1}`]: `$${val.toFixed(2)}` }), {})
          },
          {
            particular: "Gross Profit",
            ...grossProfit.reduce((acc, val, i) => ({ ...acc, [`year${i + 1}`]: `$${val.toFixed(2)}` }), {}),
            isTotal: true
          }
        ],
        chartData
      }
    });
  };

  const calculateProjectCosts = (costs) => {
    const total = costs.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const updatedCosts = [
      ...costs,
      {
        particular: "Total Project Cost",
        amount: total.toString(),
        isTotal: true
      }
    ];
    dispatch({ type: 'UPDATE_PROJECT_COST', payload: updatedCosts });
  };

  const calculateWorkingCapital = (costs) => {
    const total = costs.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const updatedCosts = [
      ...costs,
      {
        particular: "Total Working Capital",
        amount: total.toString(),
        isTotal: true
      }
    ];
    dispatch({ type: 'UPDATE_WORKING_CAPITAL', payload: updatedCosts });
  };

  return (
    <BusinessReportContext.Provider 
      value={{ 
        state, 
        dispatch,
        calculateFinancials,
        calculateProjectCosts,
        calculateWorkingCapital
      }}
    >
      {children}
    </BusinessReportContext.Provider>
  );
}

export const useBusinessReport = () => {
  const context = useContext(BusinessReportContext);
  if (!context) {
    throw new Error('useBusinessReport must be used within a BusinessReportProvider');
  }
  return context;
};