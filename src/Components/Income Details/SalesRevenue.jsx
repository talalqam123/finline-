import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const RevenueEntryForm = ({ onDelete, isOnly = false, entry, onChange }) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h5 className="text-xs font-medium text-gray-700">Revenue Entry</h5>
        {!isOnly && (
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-600 p-1"
          >
            <FaTrash size={12} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1.5 text-xs font-medium text-gray-700">
              Item/Service *
            </label>
            <input
              type="text"
              value={entry.item}
              onChange={(e) => onChange({ ...entry, item: e.target.value })}
              placeholder="Enter service name"
              className="w-full px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1.5 text-xs font-medium text-gray-700">
              Rate *
            </label>
            <input
              type="number"
              value={entry.rate}
              onChange={(e) => onChange({ ...entry, rate: e.target.value })}
              placeholder="Enter rate"
              className="w-full px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1.5 text-xs font-medium text-gray-700">
              Estimated Monthly Sales
            </label>
            <input
              type="number"
              value={entry.quantity}
              onChange={(e) => onChange({ ...entry, quantity: e.target.value })}
              placeholder="Monthly units"
              className="w-full px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-4">
            % of growth in yearly sales
          </h4>
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((year) => (
              <div key={year}>
                <label className="block mb-2 text-xs text-gray-600">
                  Year {year}
                </label>
                <input
                  type="number"
                  value={entry.yearlyGrowth[`year${year}`]}
                  onChange={(e) => onChange({
                    ...entry,
                    yearlyGrowth: {
                      ...entry.yearlyGrowth,
                      [`year${year}`]: e.target.value
                    }
                  })}
                  className="w-full px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SalesRevenue = () => {
  const { state, updateSalesRevenue } = useApp();
  const { salesRevenue } = state.incomeDetails;

  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Initialize with one entry if empty
    if (!salesRevenue.entries || salesRevenue.entries.length === 0) {
      updateSalesRevenue({
        entries: [{
          id: Date.now(),
          item: '',
          rate: '',
          quantity: '',
          yearlyGrowth: {
            year1: '10',
            year2: '10',
            year3: '10',
            year4: '10',
            year5: '10'
          }
        }]
      });
    }
  }, []);

  useEffect(() => {
    const total = salesRevenue.entries?.reduce((sum, entry) => 
      sum + ((parseFloat(entry.rate) || 0) * (parseFloat(entry.quantity) || 0)), 0
    ) || 0;
    setTotalRevenue(total);
  }, [salesRevenue.entries]);

  const addEntry = () => {
    const newEntry = {
      id: Date.now(),
      item: '',
      rate: '',
      quantity: '',
      yearlyGrowth: {
        year1: '10',
        year2: '10',
        year3: '10',
        year4: '10',
        year5: '10'
      }
    };
    updateSalesRevenue({ entries: [...(salesRevenue.entries || []), newEntry] });
  };

  const removeEntry = (id) => {
    if (salesRevenue.entries?.length > 1) {
      updateSalesRevenue({ 
        entries: salesRevenue.entries.filter(entry => entry.id !== id)
      });
    }
  };

  const updateEntry = (id, updatedEntry) => {
    updateSalesRevenue({
      entries: salesRevenue.entries.map(entry => 
        entry.id === id ? updatedEntry : entry
      )
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-1xl mx-auto"
    >
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-800">
                Monthly Revenue Entries
              </h3>
              <div className="text-base font-bold text-indigo-600">
                ₹{totalRevenue.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {salesRevenue.entries?.map((entry) => (
              <RevenueEntryForm
                key={entry.id}
                entry={entry}
                onChange={(updatedEntry) => updateEntry(entry.id, updatedEntry)}
                onDelete={() => removeEntry(entry.id)}
                isOnly={salesRevenue.entries.length === 1}
              />
            ))}
            
            <button
              onClick={addEntry}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 text-xs font-medium"
            >
              <FaPlus size={12} />
              <span>Add Another Revenue Entry</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SalesRevenue;