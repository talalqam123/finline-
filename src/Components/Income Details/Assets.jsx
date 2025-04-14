import React, { useState } from 'react';
import { motion, AnimatePresence  } from 'framer-motion';
import { FaEdit, FaInfoCircle } from 'react-icons/fa';
import { FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';
const ExpenseEntryForm = ({ onDelete, isOnly = false }) => {
  const [entry, setEntry] = useState({
    item: '',
    amount: '',

  });

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h5 className="text-sm font-medium text-gray-700">Expense Entry</h5>
        {!isOnly && (
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-600 p-1"
          >
            <FaTrash size={14} />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Base expense details */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Item *
            </label>
            <input
              type="text"
              value={entry.item}
              onChange={(e) => setEntry({ ...entry, item: e.target.value })}
              placeholder="Enter item name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Amount *
            </label>
            <input
              type="text"
              value={entry.amount}
              onChange={(e) => setEntry({ ...entry, amount: e.target.value })}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

       
      </div>
    </div>
  );
};

const ExpenseItem = ({ title, defaultAmount = "0.00", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState([{ id: 1 }]);
  const [totalAmount, setTotalAmount] = useState(defaultAmount);

  const addEntry = () => {
    const newId = entries.length + 1;
    setEntries([...entries, { id: newId }]);
  };

  const removeEntry = (id) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
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
          />
          <span className="font-medium text-gray-700">{title}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Total:</span>
          <input
            type="text"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="w-32 text-right px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onClick={(e) => e.stopPropagation()}
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
              {entries.map((entry, index) => (
                <ExpenseEntryForm
                  key={entry.id}
                  onDelete={() => removeEntry(entry.id)}
                  isOnly={entries.length === 1}
                />
              ))}
              
              <button
                onClick={addEntry}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <FaPlus size={14} />
                <span>Add Another {title}</span>
              </button>

              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



const Assets = () => {
  const [assetData, setAssetData] = useState({
    totalAsset: 10.00,
    subsidy: 0.00,
    ownContributionPercent: 10.00
  });
 const [totalExpenses, setTotalExpenses] = useState("2,23,366.00");
  const [editingField, setEditingField] = useState(null);

  const calculateValues = () => {
    const netAsset = assetData.totalAsset - assetData.subsidy;
    const ownContribution = (netAsset * assetData.ownContributionPercent) / 100;
    const termLoan = netAsset - ownContribution;
    
    return {
      netAsset: netAsset.toFixed(2),
      ownContribution: ownContribution.toFixed(2),
      termLoan: termLoan.toFixed(2)
    };
  };

  const values = calculateValues();

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

  const handleValueUpdate = (field, value) => {
    const newValue = parseFloat(value) || 0;
    setAssetData(prev => ({
      ...prev,
      [field]: newValue
    }));
    setEditingField(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Asset Allocation</h3>
          <div className="flex justify-center mb-8">
            <CircularProgress percentage={
              ((values.ownContribution) / assetData.totalAsset * 100).toFixed(0)
            } />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Own Contribution</span>
              <span className="font-medium text-indigo-600">
                {((values.ownContribution) / assetData.totalAsset * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Term Loan</span>
              <span className="font-medium text-indigo-600">
                {((values.termLoan) / assetData.totalAsset * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-4">
          {[
            { label: 'Total Asset', value: assetData.totalAsset, field: 'totalAsset' },
            { label: 'Subsidy', value: assetData.subsidy, field: 'subsidy' },
            { label: 'Net Asset', value: values.netAsset, readOnly: true },
            { 
              label: 'Own Contribution',
              value: values.ownContribution,
              field: 'ownContributionPercent',
              suffix: `@ ${assetData.ownContributionPercent}%`
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
                  <span className="text-gray-700">{item.label}</span>
                  {item.suffix && (
                    <span className="text-sm text-gray-500">{item.suffix}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {editingField === item.field ? (
                    <input
                      type="number"
                      defaultValue={item.value}
                      onBlur={(e) => handleValueUpdate(item.field, e.target.value)}
                      className="w-24 p-1 border rounded-md text-right"
                      autoFocus
                    />
                  ) : (
                    <span className="font-semibold">₹ {parseFloat(item.value).toFixed(2)}</span>
                  )}
                  {!item.readOnly && (
                    <button
                      onClick={() => setEditingField(item.field)}
                      className="text-indigo-600 hover:text-indigo-700 p-1 rounded-full hover:bg-indigo-50"
                    >
                      <FaEdit size={14} />
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
            <h3 className="text-xl font-semibold text-gray-800">
              Total Expenses
            </h3>
            <div className="text-2xl font-bold text-indigo-600">
              ₹{totalExpenses}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          <ExpenseItem title="Land and Building" defaultAmount="0.00" />
          <ExpenseItem title="Machinery" defaultAmount="0.00" />
          <ExpenseItem title="Computers, Furniture, Racks" defaultAmount="10.00" />
          <ExpenseItem title="Electrification" defaultAmount="0.00" />
          <ExpenseItem title="Vehicle" defaultAmount="0.00" />
          <ExpenseItem title="Preliminary/Pre-operating expenses" defaultAmount="0.00" />
          <ExpenseItem title="Software, Investment, Others" defaultAmount="0.00" />
          <ExpenseItem title="Additional Subsidy" defaultAmount="0.00" />
         
        </div>
      </div>
    </motion.div>
  );
};

export default Assets;
