import React, { useState } from 'react';
import { useBusinessReport } from '../../context/BusinessReportContext';

const ContributionSplitDialog = ({ onClose }) => {
  const { state, dispatch } = useBusinessReport();
  const [contributions, setContributions] = useState(state.pdfSettings?.contributions || [
    { name: 'Promoter Contribution', percentage: 30 },
    { name: 'Term Loan', percentage: 50 },
    { name: 'Working Capital', percentage: 20 }
  ]);

  const handlePercentageChange = (index, value) => {
    const newValue = Math.min(100, Math.max(0, parseInt(value) || 0));
    const newContributions = [...contributions];
    newContributions[index] = { ...newContributions[index], percentage: newValue };
    setContributions(newContributions);
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_PDF_SETTINGS',
      payload: {
        contributions,
        showContributionEdit: false
      }
    });
    onClose();
  };

  const totalPercentage = contributions.reduce((sum, item) => sum + item.percentage, 0);
  const isValid = totalPercentage === 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Edit Contribution Split</h3>
        
        <div className="space-y-4">
          {contributions.map((contribution, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {contribution.name}
                </label>
                <input
                  type="number"
                  value={contribution.percentage}
                  onChange={(e) => handlePercentageChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                  max="100"
                />
              </div>
              <span className="text-gray-500 mt-6">%</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-gray-600">Total:</span>
          <span className={totalPercentage === 100 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
            {totalPercentage}%
          </span>
        </div>

        {!isValid && (
          <p className="mt-2 text-sm text-red-600">
            Total percentage must equal 100%
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isValid 
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-indigo-400 cursor-not-allowed'
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContributionSplitDialog;