import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaFileInvoiceDollar, FaChartPie, FaMoneyBillWave, FaPercentage, FaEdit } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const TermLoanSettings = () => {
  const [activeTab, setActiveTab] = useState('details');
  const { state, updateTermLoan } = useApp();
  const { termLoan } = state.loanDetails;

  const [emiResult, setEmiResult] = useState(null);

  // Keep netInvestment and related calculations from assets
  const { assets } = state.incomeDetails;
  const netInvestment = assets.totalAsset - assets.subsidy;
  const ownContribution = (netInvestment * assets.ownContributionPercent) / 100;
  const termLoanAmount = netInvestment - ownContribution;

  useEffect(() => {
    updateTermLoan({
      amount: termLoanAmount,
      startDate: termLoan.startDate || '2025-04-01'
    });
  }, [termLoanAmount]);

  const handleTermLoanUpdate = (updates) => {
    updateTermLoan(updates);
  };

  const calculateEMI = () => {
    const principal = parseFloat(termLoan.amount);
    const rateOfInterest = parseFloat(termLoan.interestRate) / 12 / 100;
    const tenure = parseFloat(termLoan.tenure) * 12;

    const emi = principal * rateOfInterest * Math.pow(1 + rateOfInterest, tenure) / (Math.pow(1 + rateOfInterest, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    setEmiResult({
      monthlyEMI: emi.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };

  const tabVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  const generateStartDates = () => {
    const dates = [];
    const startYear = 2025;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    
    for (let year = startYear; year <= startYear + 1; year++) {
      months.forEach((month, idx) => {
        const date = `${year}-${String(idx + 1).padStart(2, '0')}-01`;
        dates.push({ label: `${month} ${year}`, value: date });
      });
    }
    return dates;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full mx-auto"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg p-6 mb-6 text-white">
        <h3 className="text-2xl font-bold">Term Loan Calculator</h3>
        <p className="text-indigo-100">Calculate your loan details and EMI</p>
      </div>

      {/* Tab Container with new design */}
      <div className="bg-white rounded-lg shadow-lg mb-6">
        <div className="flex p-2">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 p-4 rounded-lg ${
              activeTab === 'details' 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('details')}
          >
            <div className="flex flex-col items-center gap-2">
              <FaFileInvoiceDollar className="text-2xl" />
              <span className="font-medium">Loan Details</span>
            </div>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 p-4 rounded-lg ${
              activeTab === 'emi' 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('emi')}
          >
            <div className="flex flex-col items-center gap-2">
              <FaCalculator className="text-2xl" />
              <span className="font-medium">EMI Calculator</span>
            </div>
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'details' ? (
          <motion.div
            key="details"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {/* Investment Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 rounded-full">
                    <FaChartPie className="text-2xl text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Net Investment</h4>
                    <p className="text-gray-500">Total project value</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-indigo-600">₹{netInvestment.toFixed(2)}</div>
              </div>

              {/* Contribution Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-gray-700 font-medium">Contribution Percentage</label>
                  <span className="text-indigo-600 font-bold">{assets.ownContributionPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={assets.ownContributionPercent}
                  onChange={(e) => handleTermLoanUpdate({ ownContributionPercent: e.target.value })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <FaMoneyBillWave className="text-green-600" />
                      <label className="text-gray-700 font-medium">Own Contribution</label>
                    </div>
                    <input
                      type="number"
                      value={ownContribution}
                      onChange={(e) => handleTermLoanUpdate({ ownContribution: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <FaPercentage className="text-indigo-600" />
                      <label className="text-gray-700 font-medium">Term Loan Amount</label>
                    </div>
                    <input
                      type="text"
                      value={termLoanAmount}
                      readOnly
                      className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="emi"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
            className="space-y-6"
          >
            {/* Loan Amount Display */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700">Loan Amount:</span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    Edit <FaEdit />
                  </motion.button>
                </div>
                <span className="text-indigo-600 font-bold text-xl">₹{termLoanAmount}</span>
              </div>
            </div>

            {/* Interest and Tenure */}
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">
                  Interest on loan <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="number"
                    value={termLoan.interestRate}
                    onChange={(e) => handleTermLoanUpdate({ interestRate: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <span className="bg-gray-100 px-4 flex items-center border border-l-0 border-gray-300 rounded-r-lg">
                    %
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Select Loan Tenure</label>
                <select
                  value={termLoan.tenure}
                  onChange={(e) => handleTermLoanUpdate({ tenure: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {[...Array(25)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Loan Starting Date</label>
                <select
                  value={termLoan.startDate}
                  onChange={(e) => handleTermLoanUpdate({ startDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {generateStartDates().map(date => (
                    <option key={date.value} value={date.value}>{date.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculation Method */}
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
              <label className="text-gray-700 font-medium">Repayment calculation Method</label>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTermLoanUpdate({ calculationType: 'p' })}
                  className={`px-6 py-2 rounded-lg border ${
                    termLoan.calculationType === 'p' 
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-600' 
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  Based on fixed principal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTermLoanUpdate({ calculationType: 'e' })}
                  className={`px-6 py-2 rounded-lg border ${
                    termLoan.calculationType === 'e'
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  Based on fixed EMI
                </motion.button>
              </div>
            </div>

            {/* EMI Calculation */}
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
              <label className="text-gray-700 font-medium">EMI calculation</label>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTermLoanUpdate({ emiCalculation: '1' })}
                  className={`px-6 py-2 rounded-lg border ${
                    termLoan.emiCalculation === '1'
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  Calculate EMI automatically
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTermLoanUpdate({ emiCalculation: '0' })}
                  className={`px-6 py-2 rounded-lg border ${
                    termLoan.emiCalculation === '0'
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  Enter monthly installment
                </motion.button>
              </div>

              <input
                type="number"
                value={termLoan.monthlyInstallment}
                onChange={(e) => handleTermLoanUpdate({ monthlyInstallment: e.target.value })}
                readOnly={termLoan.emiCalculation === '1'}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Monthly installment"
              />

              <div className="space-y-2">
                <label className="text-gray-700 font-medium">
                  Principle repayment moratorium months
                </label>
                <select
                  value={termLoan.moratoriumMonths}
                  onChange={(e) => handleTermLoanUpdate({ moratoriumMonths: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {[...Array(37)].map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg min-w-[150px]"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg min-w-[150px]"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TermLoanSettings;
