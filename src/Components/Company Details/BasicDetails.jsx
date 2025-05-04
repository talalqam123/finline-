import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const CompanyDetails = () => {
  const { state, updateCompanyDetails } = useApp();
  const { company } = state.permanentDetails;

  const handleInputChange = (field, value) => {
    updateCompanyDetails({ [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <form className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block mb-2 text-xs font-medium text-gray-700">
            Company Name *
          </label>
          <input
            type="text"
            value={company.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter company name"
            className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Registration Number */}
        <div>
          <label className="block mb-2 text-xs font-medium text-gray-700">
            Registration Number
          </label>
          <input
            type="text"
            value={company.regNumber || ''}
            onChange={(e) => handleInputChange('regNumber', e.target.value)}
            placeholder="Enter registration number"
            className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Registration Date */}
        <div>
          <label className="block mb-2 text-xs font-medium text-gray-700">
            Registration Date
          </label>
          <input
            type="date"
            value={company.regDate || ''}
            onChange={(e) => handleInputChange('regDate', e.target.value)}
            className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* PAN Number */}
        <div>
          <label className="block mb-2 text-xs font-medium text-gray-700">
            PAN Number *
          </label>
          <input
            type="text"
            value={company.panNumber || ''}
            onChange={(e) => handleInputChange('panNumber', e.target.value)}
            placeholder="Enter PAN number"
            className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* GST Number */}
        <div>
          <label className="block mb-2 text-xs font-medium text-gray-700">
            GST Number
          </label>
          <input
            type="text"
            value={company.gstNumber || ''}
            onChange={(e) => handleInputChange('gstNumber', e.target.value)}
            placeholder="Enter GST number"
            className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Constitution */}
        <div>
          <label className="block mb-2 text-xs font-medium text-gray-700">
            Constitution
          </label>
          <select
            value={company.constitution || ''}
            onChange={(e) => handleInputChange('constitution', e.target.value)}
            className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select constitution</option>
            <option value="proprietorship">Proprietorship</option>
            <option value="partnership">Partnership</option>
            <option value="llp">LLP</option>
            <option value="pvtLtd">Private Limited</option>
            <option value="publicLtd">Public Limited</option>
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block mb-2 text-xs font-medium text-gray-700">
            Address *
          </label>
          <textarea
            value={company.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows="3"
            placeholder="Enter company address"
            className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Business Type */}
        <div>
          <label className="block mb-2 text-xs font-medium text-gray-700">
            Type of Business *
          </label>
          <select
            value={company.businessType || ''}
            onChange={(e) => handleInputChange('businessType', e.target.value)}
            className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select business type</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="trading">Trading</option>
            <option value="service">Service</option>
            <option value="agriculture">Agriculture</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-xs font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            value={company.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter email address"
            className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-2 text-xs font-medium text-gray-700">
            Phone Number *
          </label>
          <input
            type="tel"
            value={company.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block mb-2 text-xs font-medium text-gray-700">
            Website
          </label>
          <input
            type="url"
            value={company.website || ''}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="Enter company website"
            className="w-full px-4 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </form>
    </motion.div>
  );
};

export default CompanyDetails;
