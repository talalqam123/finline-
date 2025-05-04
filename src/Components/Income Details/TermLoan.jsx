import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaInfoCircle, FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const ExpenseEntryForm = ({ onDelete, isOnly = false, entry, onChange }) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h5 className="text-xs font-medium text-gray-700">Expense Entry</h5>
        {!isOnly && (
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-600 p-1"
          >
            <FaTrash size={12} />
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-xs font-medium text-gray-700">
              Item *
            </label>
            <input
              type="text"
              value={entry.item}
              onChange={(e) => onChange({ ...entry, item: e.target.value })}
              placeholder="Enter item name"
              className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-xs font-medium text-gray-700">
              Amount *
            </label>
            <input
              type="text"
              value={entry.amount}
              onChange={(e) => onChange({ ...entry, amount: e.target.value })}
              placeholder="Enter amount"
              className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-4">
          <FaChevronDown
            className={`transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            size={12}
          />
          <span className="font-medium text-xs text-gray-700">{title}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-600">Total:</span>
          <input
            type="number"
            value={total}
            onChange={handleTotalChange}
            onClick={(e) => e.stopPropagation()}
            className="w-32 text-right px-3 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-gray-50"
          >
            <div className="p-6 space-y-4">
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
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 text-xs font-medium"
              >
                <FaPlus size={12} />
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
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />
        <circle
          className="text-indigo-500"
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
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-6">Asset Allocation</h3>
          <div className="flex justify-center mb-8">
            <CircularProgress percentage={
              ((values.ownContribution) / assets.totalAsset * 100).toFixed(0)
            } />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Own Contribution</span>
              <span className="font-medium text-indigo-600">
                {((values.ownContribution) / assets.totalAsset * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Term Loan</span>
              <span className="font-medium text-indigo-600">
                {((values.termLoan) / assets.totalAsset * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-4">
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
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-700">{item.label}</span>
                  {item.suffix && (
                    <span className="text-xs text-gray-500">{item.suffix}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {editingField === item.field ? (
                    <input
                      type="number"
                      defaultValue={item.value}
                      onBlur={(e) => handleValueUpdate(item.field, e.target.value)}
                      className="w-24 p-1 text-xs border rounded-md text-right"
                      autoFocus
                    />
                  ) : (
                    <span className="text-xs font-semibold">₹ {parseFloat(item.value).toFixed(2)}</span>
                  )}
                  {!item.readOnly && (
                    <button
                      onClick={() => setEditingField(item.field)}
                      className="text-indigo-600 hover:text-indigo-700 p-1 rounded-full hover:bg-indigo-50"
                    >
                      <FaEdit size={12} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-800">
              Total Expenses
            </h3>
            <div className="text-base font-bold text-indigo-600">
              ₹{calculateTotalExpenses().toFixed(2)}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
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
