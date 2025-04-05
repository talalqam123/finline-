import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';

const ExpenseEntryForm = ({ onDelete, isOnly = false }) => {
  const [entry, setEntry] = useState({
    item: '',
    amount: '',
    isMonthly: false,
    yearlyIncrease: {
      year1: '10',
      year2: '10',
      year3: '10',
      year4: '10',
      year5: '10'
    }
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

        {/* Monthly confirmation */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={entry.isMonthly}
            onChange={(e) => setEntry({ ...entry, isMonthly: e.target.checked })}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="text-sm text-gray-700">
            Above expense happens every month
          </label>
        </div>

        {/* Yearly increase percentages */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">
            % of increase in expense yearly
          </h4>
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((year) => (
              <div key={year}>
                <label className="block mb-2 text-xs text-gray-600">
                  Year {year}
                </label>
                <input
                  type="number"
                  value={entry.yearlyIncrease[`year${year}`]}
                  onChange={(e) => setEntry({
                    ...entry,
                    yearlyIncrease: {
                      ...entry.yearlyIncrease,
                      [`year${year}`]: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center"
                />
              </div>
            ))}
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

const MonthlyExpense = () => {
  const [totalExpenses, setTotalExpenses] = useState("2,23,366.00");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
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
          <ExpenseItem title="Rent" defaultAmount="2,23,365.00">
            
          </ExpenseItem>

          <ExpenseItem title="Salary" />
          <ExpenseItem title="Salary - Admin & sales" />
          <ExpenseItem title="Office expense & utilities" />
          <ExpenseItem title="Insurance" />
          <ExpenseItem title="Raw material/Purchase" />
          <ExpenseItem title="Wages" />
          <ExpenseItem title="Repairs and maintenance" />
          
          <ExpenseItem title="Electricity/Gas charges">
           
          </ExpenseItem>

          <ExpenseItem title="Other variable costs" defaultAmount="1.00" />
        </div>
      </div>
    </motion.div>
  );
};

export default MonthlyExpense;
