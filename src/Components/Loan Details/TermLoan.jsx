import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaInfoCircle, FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const ExpenseEntryForm = ({ onDelete, isOnly = false, entry, onChange }) => {
  return (
    <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-3 sm:mb-4">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <h5 className="text-[11px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">Expense Entry</h5>
        {!isOnly && (
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-1"
          >
            <FaTrash size={10} className="sm:w-3 sm:h-3" />
          </button>
        )}
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          <div>            <label className="block mb-1.5 sm:mb-2 text-[11px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">
              Item *
            </label>
            <input
              type="text"
              value={entry.item}
              onChange={(e) => onChange({ ...entry, item: e.target.value })}
              placeholder="Enter item name"
              className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block mb-1.5 sm:mb-2 text-[11px] sm:text-xs font-medium text-gray-700">
              Amount *
            </label>
            <input
              type="text"
              value={entry.amount}
              onChange={(e) => onChange({ ...entry, amount: e.target.value })}
              placeholder="Enter amount"
              className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ExpenseItem = ({ title, defaultAmount = "0.00", expenses = [], onUpdateExpenses }) => {
  const [isOpen, setIsOpen] = useState(false);

  const addEntry = () => {
    const newExpense = { id: Date.now(), item: '', amount: defaultAmount };
    onUpdateExpenses([...expenses, newExpense]);
  };

  const removeEntry = (id) => {
    if (expenses.length > 1) {
      const newExpenses = expenses.filter(entry => entry.id !== id);
      onUpdateExpenses(newExpenses);
    }
  };

  const updateEntry = (id, updatedEntry) => {
    const newExpenses = expenses.map(entry => 
      entry.id === id ? { ...entry, ...updatedEntry } : entry
    );
    onUpdateExpenses(newExpenses);
  };

  const total = expenses.reduce((sum, expense) => 
    sum + (parseFloat(expense.amount) || 0), 0
  );

  const handleTotalChange = (e) => {
    const newAmount = e.target.value;
    // If there's only one expense, update its amount
    if (expenses.length === 1) {
      onUpdateExpenses([{ ...expenses[0], amount: newAmount }]);
    }
  };

  return (    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        <div className="flex items-center space-x-2 sm:space-x-4">
          <FaChevronDown
            className={`transform transition-transform duration-200 text-gray-500 dark:text-gray-400 ${
              isOpen ? 'rotate-180' : ''
            } w-2.5 h-2.5 sm:w-3 sm:h-3`}
          />
          <span className="font-medium text-[11px] sm:text-xs text-gray-700 dark:text-gray-300">{title}</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">Total:</span>
          <input
            type="number"
            value={total}
            onChange={handleTotalChange}
            onClick={(e) => e.stopPropagation()}
            className="w-20 sm:w-32 text-right px-2 sm:px-3 py-1 text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400"
          />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}            className="overflow-hidden bg-gray-50 dark:bg-gray-800"
          >
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {expenses.map((entry) => (
                <ExpenseEntryForm
                  key={entry.id}
                  entry={entry}
                  onChange={(updatedEntry) => updateEntry(entry.id, updatedEntry)}
                  onDelete={() => removeEntry(entry.id)}
                  isOnly={expenses.length === 1}
                />
              ))}
              
              <button
                onClick={addEntry}
                className="flex items-center space-x-1 sm:space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-[11px] sm:text-xs font-medium"
              >
                <FaPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>Add Another {title}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TermLoan = () => {
  const { state, updateAssets } = useApp();
  const { assets } = state.incomeDetails;
  const [editingField, setEditingField] = useState(null);
  const [expenseCategories, setExpenseCategories] = useState({
    landAndBuilding: [{ id: 1, item: '', amount: '0.00' }],
    machinery: [{ id: 1, item: '', amount: '0.00' }],
    computers: [{ id: 1, item: '', amount: '0.00' }],
    electrification: [{ id: 1, item: '', amount: '0.00' }],
    vehicle: [{ id: 1, item: '', amount: '0.00' }],
    preliminary: [{ id: 1, item: '', amount: '0.00' }],
    software: [{ id: 1, item: '', amount: '0.00' }],
    subsidy: [{ id: 1, item: '', amount: '0.00' }]
  });

  const handleUpdateExpenses = (category, newExpenses) => {
    setExpenseCategories(prev => ({
      ...prev,
      [category]: newExpenses
    }));
    
    // Calculate new total and update assets
    const newTotal = Object.values(expenseCategories).reduce((total, categoryExpenses) => {
      return total + categoryExpenses.reduce((catTotal, expense) => 
        catTotal + (parseFloat(expense.amount) || 0), 0);
    }, 0);
    
    updateAssets({ totalAsset: newTotal });
  };

  const updateAssetData = (updates) => {
    updateAssets(updates);
  };

  const calculateValues = () => {
    const netAsset = assets.totalAsset - assets.subsidy;
    const ownContribution = (netAsset * assets.ownContributionPercent) / 100;
    const termLoan = netAsset - ownContribution;
    
    return {
      netAsset: netAsset.toFixed(2),
      ownContribution: ownContribution.toFixed(2),
      termLoan: termLoan.toFixed(2)
    };
  };

  const calculateTotalExpenses = () => {
    return Object.values(expenseCategories).reduce((total, category) => {
      return total + category.reduce((catTotal, expense) => 
        catTotal + (parseFloat(expense.amount) || 0), 0);
    }, 0);
  };

  const values = calculateValues();
  const totalExpenses = calculateTotalExpenses();

  const handleValueUpdate = (field, value) => {
    const newValue = parseFloat(value) || 0;
    updateAssetData({ [field]: newValue });
    setEditingField(null);
  };
  const CircularProgress = ({ percentage }) => (
    <div className="relative w-24 h-24 sm:w-32 sm:h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />
        <circle
          className="text-indigo-500 dark:text-indigo-400"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          style={{
            strokeDasharray: `${2 * Math.PI * 40}`,
            strokeDashoffset: `${2 * Math.PI * 40 * (1 - percentage / 100)}`,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%'
          }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="text-xl sm:text-2xl font-bold">{percentage}%</span>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full px-4 sm:px-0"
    >      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Left Column - Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">Asset Allocation</h3>
          <div className="flex justify-center mb-6 sm:mb-8">
            <CircularProgress percentage={
              ((values.ownContribution) / assets.totalAsset * 100).toFixed(0)
            } />
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between text-[11px] sm:text-xs">
              <span className="text-gray-600 dark:text-gray-400">Own Contribution</span>
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                {((values.ownContribution) / assets.totalAsset * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between text-[11px] sm:text-xs">
              <span className="text-gray-600 dark:text-gray-400">Term Loan</span>
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                {((values.termLoan) / assets.totalAsset * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-3 sm:space-y-4">
          {[
            { label: 'Total Asset', value: assets.totalAsset, field: 'totalAsset' },
            { label: 'Subsidy', value: assets.subsidy, field: 'subsidy' },
            { label: 'Net Asset', value: values.netAsset, readOnly: true },
            { 
              label: 'Own Contribution',
              value: values.ownContribution,
              field: 'ownContributionPercent',
              suffix: `@ ${assets.ownContributionPercent}%`
            },
            { label: 'Term Loan', value: values.termLoan, readOnly: true }
          ].map((item) => (            <motion.div
              key={item.label}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-[11px] sm:text-xs text-gray-700 dark:text-gray-300">{item.label}</span>
                  {item.suffix && (
                    <span className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">{item.suffix}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  {editingField === item.field ? (
                    <input
                      type="number"
                      defaultValue={item.value}
                      onBlur={(e) => handleValueUpdate(item.field, e.target.value)}
                      className="w-20 sm:w-24 p-1 text-[11px] sm:text-xs border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                      autoFocus
                    />                  ) : (
                    <span className="text-[11px] sm:text-xs font-semibold dark:text-gray-300">₹ {parseFloat(item.value).toFixed(2)}</span>
                  )}
                  {!item.readOnly && (
                    <button
                      onClick={() => setEditingField(item.field)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 p-1 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/50"
                    >
                      <FaEdit className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
              Total Expenses
            </h3>
            <div className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400">
              ₹{calculateTotalExpenses().toFixed(2)}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <ExpenseItem 
            title="Land and Building" 
            expenses={expenseCategories.landAndBuilding}
            onUpdateExpenses={(expenses) => handleUpdateExpenses('landAndBuilding', expenses)}
          />
          <ExpenseItem 
            title="Machinery" 
            expenses={expenseCategories.machinery}
            onUpdateExpenses={(expenses) => handleUpdateExpenses('machinery', expenses)}
          />
          <ExpenseItem 
            title="Computers, Furniture, Racks" 
            expenses={expenseCategories.computers}
            onUpdateExpenses={(expenses) => handleUpdateExpenses('computers', expenses)}
          />
          <ExpenseItem 
            title="Electrification" 
            expenses={expenseCategories.electrification}
            onUpdateExpenses={(expenses) => handleUpdateExpenses('electrification', expenses)}
          />
          <ExpenseItem 
            title="Vehicle" 
            expenses={expenseCategories.vehicle}
            onUpdateExpenses={(expenses) => handleUpdateExpenses('vehicle', expenses)}
          />
          <ExpenseItem 
            title="Preliminary/Pre-operating expenses" 
            expenses={expenseCategories.preliminary}
            onUpdateExpenses={(expenses) => handleUpdateExpenses('preliminary', expenses)}
          />
          <ExpenseItem 
            title="Software, Investment, Others" 
            expenses={expenseCategories.software}
            onUpdateExpenses={(expenses) => handleUpdateExpenses('software', expenses)}
          />
          <ExpenseItem 
            title="Additional Subsidy" 
            expenses={expenseCategories.subsidy}
            onUpdateExpenses={(expenses) => handleUpdateExpenses('subsidy', expenses)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TermLoan;
