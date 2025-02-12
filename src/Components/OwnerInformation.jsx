import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const OwnerInformation = () => {
  const [owners, setOwners] = useState([{ id: 1, name: '' }]);
  const [activeOwner, setActiveOwner] = useState(1);

  const addNewOwner = () => {
    const newId = owners.length + 1;
    setOwners([...owners, { id: newId, name: '' }]);
    setActiveOwner(newId);
  };

  const removeOwner = (id) => {
    if (owners.length > 1) {
      const newOwners = owners.filter(owner => owner.id !== id);
      setOwners(newOwners);
      if (activeOwner === id) {
        setActiveOwner(newOwners[0].id);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      {/* Owner Tabs */}
      <div className="flex items-center mb-6 border-b border-gray-200">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {owners.map((owner) => (
            <button
              key={owner.id}
              onClick={() => setActiveOwner(owner.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeOwner === owner.id
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>Owner {owner.id}</span>
              {owners.length > 1 && (
                <IoClose
                  className="ml-2 cursor-pointer hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOwner(owner.id);
                  }}
                />
              )}
            </button>
          ))}
        </div>
        <button
          onClick={addNewOwner}
          className="ml-4 p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all duration-200"
        >
          <FaPlus className="w-4 h-4" />
        </button>
      </div>

      {/* Owner Form */}
      <AnimatePresence mode="wait">
        <motion.form
          key={activeOwner}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              placeholder="Talal Ahmad Qamar"
              className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              placeholder="79-A, Gul-E-Damn, College Road, Near Ameer Chowk, Hs"
              rows="3"
              className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Gender
              </label>
              <select className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Designation *
              </label>
              <input
                type="text"
                placeholder="Enter designation"
                className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="sas@gmail.com"
                className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="917428730894"
                className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Category
              </label>
              <select className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
                <option value="general">General</option>
                <option value="obc">OBC</option>
                <option value="scst">SC/ST</option>
                <option value="minority">Minority</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Date of birth
              </label>
              <input
                type="date"
                defaultValue="2003-07-24"
                className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          </div>
        </motion.form>
      </AnimatePresence>
    </motion.div>
  );
};

export default OwnerInformation;
