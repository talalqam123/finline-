import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  permanentDetails: {
    company: {},
    owners: []
  },
  incomeDetails: {
    monthlyExpenses: [],
    assets: {
      totalAsset: 0,
      subsidy: 0,
      ownContributionPercent: 10,
      expenses: []
    },
    salesRevenue: {
      entries: [],
      assumptions: {
        growthRate: '',
        marketSize: '',
        marketShare: '',
        notes: ''
      }
    }
  },
  loanDetails: {
    termLoan: {
      amount: 0,
      tenure: '',
      interestRate: '',
      startDate: '',
      calculationType: 'e',
      emiCalculation: '1',
      monthlyInstallment: 0,
      moratoriumMonths: 0
    },
    workingCapital: {
      method: 'percentage',
      rawMaterials: 0,
      workInProgress: 0,
      finishedGoods: 0,
      workingExpense: 0,
      receivables: 0,
      payables: 0,
      totalWorkingCapital: 0,
      workingCapitalLoanPercentage: 25
    }
  },
  loanSettings: {
    defaultInterestRate: 12,
    maxInterestRate: 18,
    defaultTenure: 60,
    maxTenure: 180,
    defaultMoratorium: 6,
    maxMoratorium: 24,
    processingFee: 1,
    notes: ''
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_COMPANY_DETAILS':
      return {
        ...state,
        permanentDetails: {
          ...state.permanentDetails,
          company: { ...state.permanentDetails.company, ...action.payload }
        }
      };
    case 'UPDATE_OWNERS':
      return {
        ...state,
        permanentDetails: {
          ...state.permanentDetails,
          owners: action.payload
        }
      };
    case 'UPDATE_MONTHLY_EXPENSES':
      return {
        ...state,
        incomeDetails: {
          ...state.incomeDetails,
          monthlyExpenses: action.payload
        }
      };
    case 'UPDATE_ASSETS':
      return {
        ...state,
        incomeDetails: {
          ...state.incomeDetails,
          assets: { ...state.incomeDetails.assets, ...action.payload }
        }
      };
    case 'UPDATE_SALES_REVENUE':
      return {
        ...state,
        incomeDetails: {
          ...state.incomeDetails,
          salesRevenue: {
            ...state.incomeDetails.salesRevenue,
            ...action.payload
          }
        }
      };
    case 'UPDATE_TERM_LOAN':
      return {
        ...state,
        loanDetails: {
          ...state.loanDetails,
          termLoan: { ...state.loanDetails.termLoan, ...action.payload }
        }
      };
    case 'UPDATE_WORKING_CAPITAL':
      return {
        ...state,
        loanDetails: {
          ...state.loanDetails,
          workingCapital: { ...state.loanDetails.workingCapital, ...action.payload }
        }
      };
    case 'UPDATE_LOAN_SETTINGS':
      return {
        ...state,
        loanSettings: { ...state.loanSettings, ...action.payload }
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const updateCompanyDetails = (data) => {
    dispatch({ type: 'UPDATE_COMPANY_DETAILS', payload: data });
  };

  const updateOwners = (owners) => {
    dispatch({ type: 'UPDATE_OWNERS', payload: owners });
  };

  const updateMonthlyExpenses = (expenses) => {
    dispatch({ type: 'UPDATE_MONTHLY_EXPENSES', payload: expenses });
  };

  const updateAssets = (data) => {
    dispatch({ type: 'UPDATE_ASSETS', payload: data });
  };

  const updateSalesRevenue = (data) => {
    dispatch({ type: 'UPDATE_SALES_REVENUE', payload: data });
  };

  const updateTermLoan = (data) => {
    dispatch({ type: 'UPDATE_TERM_LOAN', payload: data });
  };

  const updateWorkingCapital = (data) => {
    dispatch({ type: 'UPDATE_WORKING_CAPITAL', payload: data });
  };

  const updateLoanSettings = (data) => {
    dispatch({ type: 'UPDATE_LOAN_SETTINGS', payload: data });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        updateCompanyDetails,
        updateOwners,
        updateMonthlyExpenses,
        updateAssets,
        updateSalesRevenue,
        updateTermLoan,
        updateWorkingCapital,
        updateLoanSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};