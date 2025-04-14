import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';

const AddSalesModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    serviceName: '',
    calculation: '',
    workingDays: 26,
    unitsPerDay: '',
    unitPrice: '',
    unit: ''
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-sm bg-black/10"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl relative z-50"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Add Sales</h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name of the service
                  </label>
                  <input
                    type="text"
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter service name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How do you calculate your sales & revenue?
                  </label>
                  <textarea
                    value={formData.calculation}
                    onChange={(e) => setFormData({ ...formData, calculation: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                    placeholder="Describe your calculation method"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avg working days in a month
                    </label>
                    <input
                      type="number"
                      value={formData.workingDays}
                      onChange={(e) => setFormData({ ...formData, workingDays: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      No. of units/day
                    </label>
                    <input
                      type="number"
                      value={formData.unitsPerDay}
                      onChange={(e) => setFormData({ ...formData, unitsPerDay: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter units per day"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Unit
                    </label>
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select a unit</option>
                      <option value="hours">Hours</option>
                      <option value="pieces">Pieces</option>
                      <option value="projects">Projects</option>
                      <option value="services">Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.unitPrice}
                        onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add Service
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ServiceEntryForm = ({ onDelete, isOnly = false }) => {
  const [entry, setEntry] = useState({
    name: '',
    amount: '',
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
        <h5 className="text-sm font-medium text-gray-700">Service Entry</h5>
        {!isOnly && (
          <button onClick={onDelete} className="text-red-500 hover:text-red-600 p-1">
            <FaTrash size={14} />
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Service Name *
            </label>
            <input
              type="text"
              value={entry.name}
              onChange={(e) => setEntry({ ...entry, name: e.target.value })}
              placeholder="Enter service name"
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

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">
            % of increase in revenue yearly
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

const ServiceItem = ({ name, defaultAmount = "0.00", children }) => {
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
          <span className="font-medium text-gray-700">{name}</span>
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
              {entries.map((entry) => (
                <ServiceEntryForm
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
                <span>Add Another Entry</span>
              </button>

              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SalesRevenue = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalSales, setTotalSales] = useState("14.00");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const services = [
    { name: "Website development", amount: "3.16" },
    { name: "Website maintanance", amount: "0.84" },
    { name: "SEO", amount: "3.16" },
    { name: "Social media marketing B2C", amount: "2.11" },
    { name: "Socialmedia marketing B2B", amount: "1.58" },
    { name: "Content writing", amount: "1.58" },
    { name: "Graphic design", amount: "1.58" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold">Sales</h4>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
        >
          <FaPlus /> Add Sales
        </button>
      </div>

      <AddSalesModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total sales and revenue:</span>
            <span className="text-2xl font-bold text-indigo-600">₹{totalSales}</span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              name={service.name}
              defaultAmount={service.amount}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-gray-700 mb-2">
          Additional notes on sales and revenue
        </label>
        <textarea
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
        />
      </div>

      <div className="mt-8 mb-8 flex justify-center gap-4">
        <button className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
          Cancel
        </button>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default SalesRevenue;