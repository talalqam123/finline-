import React from "react";
import { motion } from "framer-motion";
import { useApp } from '../../context/AppContext';

const WorkingCapitalLoan = () => {
  const { state, updateWorkingCapital } = useApp();
  const { workingCapital } = state.loanDetails;

  const handleInputChange = (field, value) => {
    const newValue = parseFloat(value) || 0;
    updateWorkingCapital({ [field]: newValue });
  };

  const setMethod = (method) => {
    updateWorkingCapital({ method });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <h3 className="text-xl font-semibold mb-6">Working Capital Loan</h3>

      {/* Method Selection */}
      <div className="mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setMethod('percentage')}
            className={`px-4 py-2 rounded-lg ${
              workingCapital.method === 'percentage' 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Percentage Based
          </button>
          <button
            onClick={() => setMethod('manual')}
            className={`px-4 py-2 rounded-lg ${
              workingCapital.method === 'manual' 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Manual Entry
          </button>
        </div>
      </div>

      {workingCapital.method === 'percentage' ? (
        // Percentage Based Method
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Closing stock of raw materials', field: 'rawMaterials' },
              { label: 'Closing stock of work in progress', field: 'workInProgress' },
              { label: 'Closing stock of finished goods', field: 'finishedGoods' },
              { label: 'Working expense', field: 'workingExpense' },
              { label: 'Receivables', field: 'receivables' },
              { label: 'Payables', field: 'payables' }
            ].map((item) => (
              <div key={item.field} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  {item.label}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={workingCapital[item.field]}
                  onChange={(e) => handleInputChange(item.field, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Total working capital
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={workingCapital.totalWorkingCapital}
                  readOnly
                  className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Working capital loan %
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={workingCapital.workingCapitalLoanPercentage}
                    onChange={(e) => handleInputChange('workingCapitalLoanPercentage', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Manual Entry Method
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Working capital Loan
              </label>
              <input
                type="number"
                step="0.01"
                value={workingCapital.manualLoanAmount}
                onChange={(e) => handleInputChange('manualLoanAmount', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Subsidy if any
              </label>
              <input
                type="number"
                step="0.01"
                value={workingCapital.subsidy}
                onChange={(e) => handleInputChange('subsidy', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Own Contribution
              </label>
              <input
                type="number"
                step="0.01"
                value={workingCapital.ownContribution}
                onChange={(e) => handleInputChange('ownContribution', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Interest on Working capital loan
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={workingCapital.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <span className="absolute right-3 top-2 text-gray-500">%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Additional notes on working capital
            </label>
            <textarea
              value={workingCapital.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WorkingCapitalLoan;