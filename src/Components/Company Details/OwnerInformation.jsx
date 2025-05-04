import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useApp } from '../../context/AppContext';

const OwnerInformation = () => {
  const { state, updateOwners } = useApp();
  const [activeOwner, setActiveOwner] = useState(1);

  const addNewOwner = () => {
    const newId = state.permanentDetails.owners.length + 1;
    const newOwners = [...state.permanentDetails.owners, {
      id: newId,
      name: '',
      address: '',
      gender: 'male',
      designation: '',
      email: '',
      phone: '',
      category: 'general',
      dob: new Date().toISOString().split('T')[0]
    }];
    updateOwners(newOwners);
    setActiveOwner(newId);
  };

  const removeOwner = (id) => {
    if (state.permanentDetails.owners.length > 1) {
      const newOwners = state.permanentDetails.owners.filter(owner => owner.id !== id);
      updateOwners(newOwners);
      if (activeOwner === id) {
        setActiveOwner(newOwners[0].id);
      }
    }
  };

  const updateOwnerDetails = (id, field, value) => {
    const newOwners = state.permanentDetails.owners.map(owner => 
      owner.id === id ? { ...owner, [field]: value } : owner
    );
    updateOwners(newOwners);
  };

  const activeOwnerData = state.permanentDetails.owners.find(owner => owner.id === activeOwner) || {};

  // Initialize with one owner if none exists
  if (state.permanentDetails.owners.length === 0) {
    addNewOwner();
  }

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
          {state.permanentDetails.owners.map((owner) => (
            <button
              key={owner.id}
              onClick={() => setActiveOwner(owner.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeOwner === owner.id
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>Owner {owner.id}</span>
              {state.permanentDetails.owners.length > 1 && (
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
          <FaPlus className="w-3 h-3" />
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
          <div>
            <label className="block mb-2 text-xs font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              value={activeOwnerData.name || ''}
              onChange={(e) => updateOwnerDetails(activeOwner, 'name', e.target.value)}
              placeholder="Enter owner name"
              className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-medium text-gray-700">
              Address
            </label>
            <textarea
              value={activeOwnerData.address || ''}
              onChange={(e) => updateOwnerDetails(activeOwner, 'address', e.target.value)}
              placeholder="Enter address"
              rows="3"
              className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-medium text-gray-700">
              Gender
            </label>
            <select
              value={activeOwnerData.gender || 'male'}
              onChange={(e) => updateOwnerDetails(activeOwner, 'gender', e.target.value)}
              className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-xs font-medium text-gray-700">
              Designation *
            </label>
            <input
              type="text"
              value={activeOwnerData.designation || ''}
              onChange={(e) => updateOwnerDetails(activeOwner, 'designation', e.target.value)}
              placeholder="Enter designation"
              className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={activeOwnerData.email || ''}
              onChange={(e) => updateOwnerDetails(activeOwner, 'email', e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={activeOwnerData.phone || ''}
              onChange={(e) => updateOwnerDetails(activeOwner, 'phone', e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-medium text-gray-700">
              Category
            </label>
            <select
              value={activeOwnerData.category || 'general'}
              onChange={(e) => updateOwnerDetails(activeOwner, 'category', e.target.value)}
              className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="scst">SC/ST</option>
              <option value="minority">Minority</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-xs font-medium text-gray-700">
              Date of birth
            </label>
            <input
              type="date"
              value={activeOwnerData.dob || ''}
              onChange={(e) => updateOwnerDetails(activeOwner, 'dob', e.target.value)}
              className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </motion.form>
      </AnimatePresence>
    </motion.div>
  );
};

export default OwnerInformation;
