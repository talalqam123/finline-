import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaFileInvoiceDollar } from 'react-icons/fa';

const TermLoan = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [loanDetails, setLoanDetails] = useState({
    amount: '',
    tenure: '',
    interestRate: '',
  });
  const [emiResult, setEmiResult] = useState(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanDetails.amount);
    const rateOfInterest = parseFloat(loanDetails.interestRate) / 12 / 100;
    const tenure = parseFloat(loanDetails.tenure) * 12;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <h3 className="text-xl font-semibold mb-4">Term Loan Details</h3>
      
      {/* Tab Container */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-6 py-3 relative ${
              activeTab === 'details' 
                ? 'text-indigo-600 font-semibold' 
                : 'text-gray-500 hover:text-indigo-600'
            }`}
            onClick={() => setActiveTab('details')}
          >
            <FaFileInvoiceDollar className="text-lg" />
            <span>Term Loan Details</span>
            {activeTab === 'details' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-6 py-3 relative ${
              activeTab === 'emi' 
                ? 'text-indigo-600 font-semibold' 
                : 'text-gray-500 hover:text-indigo-600'
            }`}
            onClick={() => setActiveTab('emi')}
          >
            <FaCalculator className="text-lg" />
            <span>Term Loan EMI</span>
            {activeTab === 'emi' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
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
            transition={{ type: "tween", duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm"
          >
            <div className="p-6 space-y-6">
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose of Term Loan
                </label>
                <input
                  type="text"
                  placeholder="Enter loan purpose"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Cost
                </label>
                <input
                  type="number"
                  placeholder="Enter project cost"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Margin Money (10%)
                </label>
                <input
                  type="number"
                  placeholder="Enter margin money"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Term Loan Amount
                </label>
                <input
                  type="number"
                  placeholder="Enter loan amount"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
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
            className="bg-white rounded-lg shadow-sm"
          >
            <div className="p-6 space-y-6">
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={loanDetails.amount}
                  onChange={(e) => setLoanDetails({...loanDetails, amount: e.target.value})}
                  placeholder="Enter loan amount"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  value={loanDetails.tenure}
                  onChange={(e) => setLoanDetails({...loanDetails, tenure: e.target.value})}
                  placeholder="Enter loan tenure"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={loanDetails.interestRate}
                  onChange={(e) => setLoanDetails({...loanDetails, interestRate: e.target.value})}
                  placeholder="Enter interest rate"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={calculateEMI}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Calculate EMI
              </motion.button>

              <AnimatePresence>
                {emiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-5 p-5 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <h4 className="font-semibold mb-3">EMI Calculation Results</h4>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <p>Monthly EMI: ₹{emiResult.monthlyEMI}</p>
                      <p>Total Interest: ₹{emiResult.totalInterest}</p>
                      <p>Total Amount: ₹{emiResult.totalAmount}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TermLoan;
