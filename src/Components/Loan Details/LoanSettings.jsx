import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const LoanSettings = () => {
  const { state, updateLoanSettings } = useApp();
  const { loanSettings } = state;

  const handleInputChange = (field, value) => {
    updateLoanSettings({ [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Loan Settings</h3>

        <div className="space-y-6">
          {/* Interest Rate Settings */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-4">Interest Rate Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Default Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={loanSettings.defaultInterestRate || ''}
                  onChange={(e) => handleInputChange('defaultInterestRate', e.target.value)}
                  placeholder="Enter default interest rate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Maximum Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={loanSettings.maxInterestRate || ''}
                  onChange={(e) => handleInputChange('maxInterestRate', e.target.value)}
                  placeholder="Enter maximum interest rate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Tenure Settings */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-4">Tenure Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Default Tenure (months)
                </label>
                <input
                  type="number"
                  value={loanSettings.defaultTenure || ''}
                  onChange={(e) => handleInputChange('defaultTenure', e.target.value)}
                  placeholder="Enter default tenure"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Maximum Tenure (months)
                </label>
                <input
                  type="number"
                  value={loanSettings.maxTenure || ''}
                  onChange={(e) => handleInputChange('maxTenure', e.target.value)}
                  placeholder="Enter maximum tenure"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Moratorium Settings */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-4">Moratorium Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Default Moratorium Period (months)
                </label>
                <input
                  type="number"
                  value={loanSettings.defaultMoratorium || ''}
                  onChange={(e) => handleInputChange('defaultMoratorium', e.target.value)}
                  placeholder="Enter default moratorium period"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Maximum Moratorium Period (months)
                </label>
                <input
                  type="number"
                  value={loanSettings.maxMoratorium || ''}
                  onChange={(e) => handleInputChange('maxMoratorium', e.target.value)}
                  placeholder="Enter maximum moratorium period"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Other Settings */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-4">Additional Settings</h4>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Processing Fee (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={loanSettings.processingFee || ''}
                  onChange={(e) => handleInputChange('processingFee', e.target.value)}
                  placeholder="Enter processing fee percentage"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  value={loanSettings.notes || ''}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Enter additional notes"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoanSettings;