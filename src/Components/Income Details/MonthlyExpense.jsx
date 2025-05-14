import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const ExpenseEntryForm = ({ onDelete, isOnly = false, entry, onChange }) => {
  return (
    <div className="p-2 sm:p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h5 className="text-[11px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">Expense Entry</h5>
        {!isOnly && (
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-1"
          >
            <FaTrash size={12} />
          </button>
        )}
      </div>

      <div className="space-y-2 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <div>
            <label className="block mb-1 sm:mb-1.5 text-[11px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">
              Item *
            </label>
            <input
              type="text"
              value={entry.item}
              onChange={(e) => onChange({ ...entry, item: e.target.value })}
              placeholder="Enter item name"
              className="w-full px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block mb-1 sm:mb-1.5 text-[11px] sm:text-xs font-medium text-gray-700 dark:text-gray-300">
              Amount *
            </label>
            <input
              type="text"
              value={entry.amount}
              onChange={(e) => onChange({ ...entry, amount: e.target.value })}
              placeholder="Enter amount"
              className="w-full px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={entry.isMonthly}
            onChange={(e) => onChange({ ...entry, isMonthly: e.target.checked })}
            className="w-3 h-3 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
          <label className="text-[11px] sm:text-xs text-gray-700 dark:text-gray-300">
            Above expense happens every month
          </label>
        </div>

        <div>
          <h4 className="text-[11px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-4">
            % of increase in expense yearly
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4">
            {[1, 2, 3, 4, 5].map((year) => (
              <div key={year}>
                <label className="block mb-1 sm:mb-2 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                  Year {year}
                </label>
                <input
                  type="number"
                  value={entry.yearlyIncrease[`year${year}`]}
                  onChange={(e) => onChange({
                    ...entry,
                    yearlyIncrease: {
                      ...entry.yearlyIncrease,
                      [`year${year}`]: e.target.value
                    }
                  })}
                  className="w-full px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExpenseItem = ({ title, defaultAmount = "0.00", category, entries = [], onUpdateEntries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(defaultAmount);

  useEffect(() => {
    const total = entries.reduce((sum, entry) => 
      sum + (parseFloat(entry.amount) || 0), 0
    );
    setTotalAmount(total.toFixed(2));
  }, [entries]);

  const addEntry = () => {
    const newEntry = {
      id: Date.now(),
      item: '',
      amount: defaultAmount,
      isMonthly: false,
      yearlyIncrease: {
        year1: '10',
        year2: '10',
        year3: '10',
        year4: '10',
        year5: '10'
      }
    };
    onUpdateEntries(category, [...entries, newEntry]);
  };

  const removeEntry = (id) => {
    onUpdateEntries(
      category,
      entries.filter((entry) => entry.id !== id)
    );
  };

  const updateEntry = (id, updatedEntry) => {
    onUpdateEntries(
      category,
      entries.map((entry) => (entry.id === id ? updatedEntry : entry))
    );
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2 sm:py-4 px-3 sm:px-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        <div className="flex items-center space-x-2 sm:space-x-4">
          <FaChevronDown
            className={`transform transition-transform duration-200 text-gray-500 dark:text-gray-400 ${
              isOpen ? 'rotate-180' : ''
            }`}
            size={12}
          />
          <span className="font-medium text-[11px] sm:text-xs text-gray-700 dark:text-gray-300">{title}</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">Total:</span>
          <div className="w-24 sm:w-32 text-right px-2 sm:px-3 py-1 bg-gray-50 dark:bg-gray-700 rounded-lg text-[11px] sm:text-xs dark:text-gray-300">
            ₹{totalAmount}
          </div>
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-gray-50 dark:bg-gray-800"
          >
            <div className="p-3 sm:p-6 space-y-2 sm:space-y-4">
              {entries.map((entry) => (
                <ExpenseEntryForm
                  key={entry.id}
                  entry={entry}
                  onChange={(updatedEntry) => updateEntry(entry.id, updatedEntry)}
                  onDelete={() => removeEntry(entry.id)}
                  isOnly={entries.length === 1}
                />
              ))}
              
              <button
                onClick={addEntry}
                className="flex items-center space-x-2 text-[11px] sm:text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
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

const MonthlyExpense = () => {
  const { state, updateMonthlyExpenses } = useApp();
  const { monthlyExpenses } = state.incomeDetails;

  const [expenseCategories] = useState([
    { id: 'rent', title: 'Rent', defaultAmount: '0.00' },
    { id: 'salary', title: 'Salary', defaultAmount: '0.00' },
    { id: 'salaryAdmin', title: 'Salary - Admin & sales', defaultAmount: '0.00' },
    { id: 'officeExpenses', title: 'Office expense & utilities', defaultAmount: '0.00' },
    { id: 'insurance', title: 'Insurance', defaultAmount: '0.00' },
    { id: 'rawMaterial', title: 'Raw material/Purchase', defaultAmount: '0.00' },
    { id: 'wages', title: 'Wages', defaultAmount: '0.00' },
    { id: 'maintenance', title: 'Repairs and maintenance', defaultAmount: '0.00' },
    { id: 'utilities', title: 'Electricity/Gas charges', defaultAmount: '0.00' },
    { id: 'other', title: 'Other variable costs', defaultAmount: '1.00' }
  ]);

  useEffect(() => {
    // Initialize empty expense entries if none exist
    if (monthlyExpenses.length === 0) {
      const initialExpenses = expenseCategories.map(category => ({
        category: category.id,
        entries: [{
          id: Date.now(),
          item: '',
          amount: category.defaultAmount,
          isMonthly: false,
          yearlyIncrease: {
            year1: '10',
            year2: '10',
            year3: '10',
            year4: '10',
            year5: '10'
          }
        }]
      }));
      updateMonthlyExpenses(initialExpenses);
    }
  }, []);

  const handleUpdateEntries = (category, newEntries) => {
    const updatedExpenses = monthlyExpenses.map(expense => 
      expense.category === category 
        ? { ...expense, entries: newEntries }
        : expense
    );
    updateMonthlyExpenses(updatedExpenses);
  };

  const calculateTotal = () => {
    return monthlyExpenses.reduce((total, expense) => {
      const categoryTotal = expense.entries.reduce((sum, entry) => 
        sum + (parseFloat(entry.amount) || 0), 0
      );
      return total + categoryTotal;
    }, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-7xl mx-auto px-2 sm:px-4"
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xs sm:text-sm font-medium text-gray-800">
              Total Expenses
            </h3>
            <div className="text-sm sm:text-base font-bold text-indigo-600">
              ₹{calculateTotal().toFixed(2)}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 text-[11px] sm:text-sm">
          {expenseCategories.map(category => {
            const expense = monthlyExpenses.find(e => e.category === category.id);
            return (
              <ExpenseItem
                key={category.id}
                title={category.title}
                category={category.id}
                defaultAmount={category.defaultAmount}
                entries={expense?.entries || []}
                onUpdateEntries={handleUpdateEntries}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default MonthlyExpense;
