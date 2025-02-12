import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckmarkCircle } from "react-icons/io5";
import Layout from './Layout';
import { toast } from 'react-toastify';

const steps = [
  'Step 1: Business Details',
  'Step 2: Owner Information',
  'Step 3: Address Details',
  'Step 4: Project Cost',
  'Step 5: Monthly Expenses',
  'Step 6: Market Analysis',
  'Step 7: Financial Projections',
  'Step 8: Documentation',
  'Step 9: Bank Details',
  'Step 10: Review & Submit'
];

export default function FormWizardSample() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    businessType: '',
    industry: '',
    loan: '',
    reasonofloan: '',
    requirements: {
      land: { selected: false, cost: '' },
      building: { selected: false, cost: '' },
      machinery: { selected: false, cost: '' },
      computers: { selected: false, cost: '' },
      furniture: { selected: false, cost: '' },
      electrification: { selected: false, cost: '' },
      storage: { selected: false, cost: '' },
      transportation: { selected: false, cost: '' },
      installation: { selected: false, cost: '' },
      other: { selected: false, cost: '' }
    },

    monthlyExpenses: {
      rent: { selected: false, cost: '' },
      salary: { selected: false, cost: '' },
      consumables: { selected: false, cost: '' },
      stationary: { selected: false, cost: '' },
      utilities: { selected: false, cost: '' },
      maintenance: { selected: false, cost: '' },
      transportation: { selected: false, cost: '' },
      communication: { selected: false, cost: '' },
      marketing: { selected: false, cost: '' },
      miscellaneous: { selected: false, cost: '' }
    },
    personalInfo: {
      ownerName: '',
      gender: '',
      education: '',
      category: '',
      businessStart: ''
    },
    businessInfo: {
      address: '',
      locality: '',
      panchayath: '',
      town: '',
      pincode: '',
      registrationType: '',
      phone: '',
      email: ''
    }
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleRequirementChange = (requirement) => {
    setFormData(prev => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        [requirement]: {
          ...prev.requirements[requirement],
          selected: !prev.requirements[requirement].selected
        }
      }
    }));
  };

  const handleCostChange = (requirement, value) => {
    setFormData(prev => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        [requirement]: {
          ...prev.requirements[requirement],
          cost: value
        }
      }
    }));
  };
  const handleMonthlyExpenseChange = (expense) => {
    setFormData(prev => ({
      ...prev,
      monthlyExpenses: {
        ...prev.monthlyExpenses,
        [expense]: {
          ...prev.monthlyExpenses[expense],
          selected: !prev.monthlyExpenses[expense].selected
        }
      }
    }));
  };

  const handleMonthlyExpenseCostChange = (expense, value) => {
    setFormData(prev => ({
      ...prev,
      monthlyExpenses: {
        ...prev.monthlyExpenses,
        [expense]: {
          ...prev.monthlyExpenses[expense],
          cost: value
        }
      }
    }));
  };

  const calculateTotals = () => {
    const totalCost = Object.values(formData.requirements).reduce((sum, item) => {
      return sum + (item.selected ? Number(item.cost) || 0 : 0)
    }, 0);

    const marginMoney = totalCost * 0.10; // 10% of total cost
    const eligibleLoan = totalCost - marginMoney;

    return {
      totalCost,
      marginMoney,
      eligibleLoan
    };
  };
  const calculateMonthlyTotal = () => {
    return Object.values(formData.monthlyExpenses).reduce((sum, item) => {
      return sum + (item.selected ? Number(item.cost) || 0 : 0)
    }, 0);
  };
  const StepperProgress = () => (
    <div className="relative mb-8">
      <div className="w-full h-1 bg-gray-200 rounded-full">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
        {steps.map((step, idx) => (
          <motion.button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`w-8 h-8 rounded-full flex items-center justify-center
              ${idx <= activeStep ? 'bg-indigo-500' : 'bg-gray-200'} 
              transition-colors duration-300`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {idx < activeStep ? (
              <IoCheckmarkCircle className="w-6 h-6 text-white" />
            ) : (
              <span className={`text-sm ${idx <= activeStep ? 'text-white' : 'text-gray-600'}`}>
                {idx + 1}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                  1
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-1">Personal Information</h3>
                <p className="text-gray-600 mb-4">Key information about the business promoter.</p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name*</label>
                  <input
                    type="text"
                    value={formData.personalInfo.ownerName}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, ownerName: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter owner's name"
                  />
                </div>

                {/* Gender */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender*</label>
                  <div className="space-y-2">
                    {['Male', 'Female', 'Non-binary', "Can't disclose"].map((option) => (
                      <label key={option} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={formData.personalInfo.gender === option}
                          onChange={e => setFormData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, gender: e.target.value }
                          }))}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Educational qualification*</label>
                  <select
                    value={formData.personalInfo.education}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, education: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select qualification</option>
                    <option value="8th_failed">8th failed</option>
                    <option value="9th_failed">9th failed</option>
                    <option value="12th_pass">12th pass</option>
                  </select>
                </div>

                {/* Social Category */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Social category*</label>
                  <div className="space-y-2">
                    {['General', 'OBC', 'Minority', 'SC/ST', 'Not interested to disclose'].map((option) => (
                      <label key={option} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="category"
                          value={option}
                          checked={formData.personalInfo.category === option}
                          onChange={e => setFormData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, category: e.target.value }
                          }))}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Business Start */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">When did you start the business?</label>
                  <select
                    value={formData.personalInfo.businessStart}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, businessStart: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select when</option>
                    <option value="not_started">Not started</option>
                    <option value="6_months">6 months ago</option>
                  </select>
                </div>
              </div>
            </div>  
        );
      
        case 1:
          return (
            <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                  2
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-1">Business Information</h3>
                <p className="text-gray-600 mb-4">Overview of the business details.</p>
  
                {/* Address */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address*</label>
                  <textarea
                    value={formData.businessInfo.address}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      businessInfo: { ...prev.businessInfo, address: e.target.value }
                    }))}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter business address"
                  />
                </div>
  
                {/* Locality */}
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Locality*</label>
                  <input
                    type="text"
                    value={formData.businessInfo.locality}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      businessInfo: { ...prev.businessInfo, locality: e.target.value }
                    }))}
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter locality"
                  />
                </div>
  
                {/* Panchayath-Village */}
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Panchayath-Village</label>
                  <input
                    type="text"
                    value={formData.businessInfo.panchayath}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      businessInfo: { ...prev.businessInfo, panchayath: e.target.value }
                    }))}
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter Panchayath or Village"
                  />
                </div>
  
                {/* Town */}
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Town, Municipality, Corporation</label>
                  <input
                    type="text"
                    value={formData.businessInfo.town}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      businessInfo: { ...prev.businessInfo, town: e.target.value }
                    }))}
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter town/municipality/corporation"
                  />
                </div>
  
                {/* Pin Code */}
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Pin code*</label>
                  <input
                    type="text"
                    maxLength="6"
                    value={formData.businessInfo.pincode}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      businessInfo: { ...prev.businessInfo, pincode: e.target.value }
                    }))}
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter pin code"
                  />
                </div>
  
                {/* Registration Type */}
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Registeration Type*</label>
                  <div class="space-y-2">
                    <label class="flex items-center space-x-3">
                      <input
                        type="radio"
                        value="proprietorship"
                        checked={formData.businessInfo.registrationType === 'proprietorship'}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          businessInfo: { ...prev.businessInfo, registrationType: e.target.value }
                        }))}
                        class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Proprietorship</span>
                    </label>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">
                  "If the business is owned by a single individual, it is classified as a Proprietorship. If multiple partners are involved, it falls under a Partnership. If the company is registered with the MCA under company law, it is categorized as LLP, Pvt Ltd, etc
                  </p>
                </div>
  
                {/* Contact Details */}
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Contact phone number*</label>
                  <input
                    type="tel"
                    value={formData.businessInfo.phone}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      businessInfo: { ...prev.businessInfo, phone: e.target.value }
                    }))}
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter contact number"
                  />
                </div>
  
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Contact email*</label>
                  <input
                    type="email"
                    value={formData.businessInfo.email}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      businessInfo: { ...prev.businessInfo, email: e.target.value }
                    }))}
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>
          );
          case 2:
            return (
              <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                    1
                  </span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-1">Name of your business entity?</h3>
                  <p className="text-gray-600 mb-4">Type the whole legal name.</p>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter business name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>
              </div>
            );
            case 3:
              return (
                <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                      2
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-1">"What category does your business fall under?</h3>
                    <p className="text-gray-600 mb-4">E.g., Soap Manufacturing, Pickles manufacturing, Diary Farm etc.</p>
                    <input
                      type="text"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter business type"
                    />
                    {errors.businessType && (
                      <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>
                    )}
                  </div>
                </div>
              );
              case 4:
                return (
                  <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                        3
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-1">Please select your industry</h3>
                      <p className="text-gray-600 mb-4">Click the most applicable one to pick.</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { id: 'manufacturing', icon: '/manufacturing.svg', label: 'Manufacturing' },
                          { id: 'trading', icon: '/trading.svg', label: 'Trading' },
                          { id: 'service', icon: '/service.svg', label: 'Service' },
                          { id: 'agriculture', icon: '/agriculture.svg', label: 'Agriculture' },
                        ].map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, industry: option.id }));
                              setErrors(prev => ({ ...prev, industry: '' }));
                            }}
                            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all
                                ${formData.industry === option.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-200'}`}
                          >
                            <img src={option.icon} alt={option.label} className="w-16 h-16 mb-2" />
                            <span className="text-sm font-medium">{option.label}</span>
                          </button>
                        ))}
                      </div>
                      {errors.industry && (
                        <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                      )}
                    </div>
                  </div>
                );
                case 5:
          return (
            <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                  4
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-1">What type of loan do you need?</h3>
                <p className="text-gray-600 mb-4">Click the most applicable one to select.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'mudra', icon: '/trading.svg', label: 'Mudra' },
                    { id: 'pmegp', label: 'PMEGP' },
                    { id: 'msmeloan', label: 'Normal MSME loan' },
  
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, loan: option.id }));
                        setErrors(prev => ({ ...prev, loan: '' }));
                      }}
                      className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all
                          ${formData.loan === option.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'}`}
                    >
                      {/* <img src={option.icon} alt={option.label} className="w-16 h-16 mb-2" /> */}
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
                {errors.industry && (
                  <p className="text-red-500 text-sm mt-1">{errors.loan}</p>
                )}
              </div>
            </div>
          );
      case 6:
        return (
          <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                5
              </span>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-1">Why do you need the loan?</h3>
              <p className="text-gray-600 mb-4">Please select the purpose for the loan. </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {
                    id: 'termloan',
                    icons: ['/land.svg', '/machinary.svg', '/computer.svg', 'vehicle.svg'], // Multiple icons per option
                    label: 'Term Loan',
                    description: 'Eg. Buy Land, Machinery, Computer, Vehicle etc. for the business.' // Optional description
                  },
                  {
                    id: 'workingcaploan',
                    icons: ['/stock.svg', '/calculator.svg'],
                    label: 'Working Capital Loan',
                    description: 'Eg. Purchase stock, Manage daily/monthly  expenses. '
                  },
                  {
                    id: 'termworkingcaploan',
                    icons: ['/land.svg', '/machinary.svg', '/computer.svg', 'vehicle.svg', '/stock.svg', '/calculator.svg'],
                    label: 'Term + Working Capital Loan',
                    description: 'For all the above'
                  },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, loan: option.id }));
                      setErrors(prev => ({ ...prev, loan: '' }));
                    }}
                    className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all
                    ${formData.loan === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'}`}
                  >
                    <div className="flex gap-2 mb-3">
                      {option.icons.map((icon, index) => (
                        <img
                          key={index}
                          src={icon}
                          alt={`${option.label} icon ${index + 1}`}
                          className="w-8 h-10"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-gray-500 mt-1">{option.description}</span>
                    )}
                  </button>
                ))}
              </div>
              {errors.loan && (
                <p className="text-red-500 text-sm mt-1">{errors.loan}</p>
              )}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                6
              </span>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-1">What all do you need?</h3>
              <p className="text-gray-600 mb-4">Please select all that you need and enter estimated costs</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'land', label: 'Land' },
                  { id: 'building', label: 'Shed/building' },
                  { id: 'machinery', label: 'Machinery' },
                  { id: 'computers', label: 'Computers/laptops & printers' },
                  { id: 'furniture', label: 'Furniture & fixtures' },
                  { id: 'electrification', label: 'Electrification & electricity backup' },
                  { id: 'storage', label: 'Racks & storage' },
                  { id: 'transportation', label: 'Transportation cost' },
                  { id: 'installation', label: 'Machinery installation' },
                  { id: 'other', label: 'Other initial expenditure' },
                ].map((item) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.requirements[item.id].selected}
                        onChange={() => handleRequirementChange(item.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>{item.label}</span>
                    </label>
                    {formData.requirements[item.id].selected && (
                      <input
                        type="number"
                        value={formData.requirements[item.id].cost}
                        onChange={(e) => handleCostChange(item.id, e.target.value)}
                        placeholder="Estimated Cost"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        case 8:
        return (
          <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                1
              </span>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-1">Monthly Expenses</h3>
              <p className="text-gray-600 mb-4">Please select applicable expenses and enter estimated monthly costs</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'rent', label: 'Rented building' },
                  { id: 'salary', label: 'Salary' },
                  { id: 'consumables', label: 'Purchase of consumables/ spare parts' },
                  { id: 'stationary', label: 'Stationary expenses' },
                  { id: 'utilities', label: 'Electricity/water expense' },
                  { id: 'maintenance', label: 'Repair and maintenance charges' },
                  { id: 'transportation', label: 'Transportation cost' },
                  { id: 'communication', label: 'Telephone/postal & internet charges' },
                  { id: 'marketing', label: 'Marketing & advertising cost' },
                  { id: 'miscellaneous', label: 'Miscellaneous expenses' },
                ].map((item) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.monthlyExpenses[item.id].selected}
                        onChange={() => handleMonthlyExpenseChange(item.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>{item.label}</span>
                    </label>
                    {formData.monthlyExpenses[item.id].selected && (
                      <input
                        type="number"
                        value={formData.monthlyExpenses[item.id].cost}
                        onChange={(e) => handleMonthlyExpenseCostChange(item.id, e.target.value)}
                        placeholder="Monthly Cost"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Monthly Expenses:</span>
                  <span className="text-lg font-semibold text-blue-600">₹ {calculateMonthlyTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 9:
        return (
          <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                7
              </span>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-1">Confirm the figures you have entered</h3>
              <p className="text-gray-600 mb-4">
                Adjust the loan amount by increasing the initial expenses or edit loan details after creating the report.
              </p>
              <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="font-medium">Total project cost:</span>
                  <span className="text-lg font-semibold">₹ {calculateTotals().totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="font-medium">Your investment (margin money) 10%:</span>
                  <span className="text-lg font-semibold">₹ {calculateTotals().marginMoney.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Eligible loan amount:</span>
                  <span className="text-lg font-semibold text-green-600">₹ {calculateTotals().eligibleLoan.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Can change all the values after creating the reports
              </p>
            </div>
          </div>
        );
        
      
        
      default:
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">{steps[step]}</h3>
            <p className="text-gray-600 mb-4">Content for {steps[step]}</p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={`Field for ${steps[step]}`}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 
                  focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300"
              />
            </div>
          </div>
        );
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0: // Personal Information
        if (!formData.personalInfo.ownerName?.trim()) {
          newErrors.ownerName = 'Owner name is required';
        }
        if (!formData.personalInfo.gender) {
          newErrors.gender = 'Gender selection is required';
        }
        if (!formData.personalInfo.education) {
          newErrors.education = 'Education qualification is required';
        }
        if (!formData.personalInfo.category) {
          newErrors.category = 'Social category is required';
        }
        break;

      case 1: // Business Information
        if (!formData.businessInfo.address?.trim()) {
          newErrors.address = 'Business address is required';
        }
        if (!formData.businessInfo.locality?.trim()) {
          newErrors.locality = 'Locality is required';
        }
        if (!formData.businessInfo.pincode?.trim()) {
          newErrors.pincode = 'Pin code is required';
        } else if (!/^\d{6}$/.test(formData.businessInfo.pincode)) {
          newErrors.pincode = 'Pin code must be 6 digits';
        }
        if (!formData.businessInfo.phone?.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.businessInfo.phone)) {
          newErrors.phone = 'Enter valid 10-digit phone number';
        }
        if (!formData.businessInfo.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.businessInfo.email)) {
          newErrors.email = 'Enter valid email address';
        }
        break;

      case 2: // Business Name
        if (!formData.fullName?.trim()) {
          newErrors.fullName = 'Business name is required';
        }
        break;

      case 3: // Business Type
        if (!formData.businessType?.trim()) {
          newErrors.businessType = 'Business type is required';
        }
        break;

      case 4: // Industry
        if (!formData.industry) {
          newErrors.industry = 'Please select an industry';
        }
        break;

      case 5: // Loan Type
        if (!formData.loan) {
          newErrors.loan = 'Please select a loan type';
        }
        break;

      case 7: // Requirements
        const requirementsSelected = Object.values(formData.requirements).some(req => req.selected);
        if (!requirementsSelected) {
          newErrors.requirements = 'Please select at least one requirement';
        }
        Object.entries(formData.requirements).forEach(([key, value]) => {
          if (value.selected && (!value.cost || value.cost <= 0)) {
            newErrors[`${key}Cost`] = 'Please enter a valid cost';
          }
        });
        break;

      case 8: // Monthly Expenses
        const expensesSelected = Object.values(formData.monthlyExpenses).some(exp => exp.selected);
        if (!expensesSelected) {
          newErrors.expenses = 'Please select at least one monthly expense';
        }
        Object.entries(formData.monthlyExpenses).forEach(([key, value]) => {
          if (value.selected && (!value.cost || value.cost <= 0)) {
            newErrors[`${key}Cost`] = 'Please enter a valid cost';
          }
        });
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      if (activeStep === steps.length - 1) {
        // Handle form submission
        toast.success('Form submitted successfully!');
        navigate('/');
      } else {
        setActiveStep(Math.min(steps.length - 1, activeStep + 1));
      }
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="text-center p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a Project Report</h1>
            <p className="text-gray-600">Complete all 10 steps to submit your application</p>
          </div>

          <div className="p-6">
            {/* Progress Stepper */}
            <StepperProgress />

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent(activeStep)}
                {Object.keys(errors).length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    {Object.values(errors).map((error, index) => (
                      <p key={index} className="text-red-600 text-sm">{error}</p>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                className={`px-6 py-2 rounded-lg text-indigo-500 border border-indigo-500
                  ${activeStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-50'}`}
                disabled={activeStep === 0}
              >
                Previous
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 
                  text-white shadow-md hover:shadow-lg"
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}