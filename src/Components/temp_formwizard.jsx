import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckmarkCircle } from "react-icons/io5";
import Layout from './Layout';
import api from '../services/api';
import { toast } from 'react-toastify';

const steps = ['Business Information', 'Address & Expenses', 'Review & Submit'];

export default function FormWizardSample() {
  const navigate = useNavigate(); // Add this hook
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    reportTitle: '',
    description: '',
    businessType: '',
    industry: '', // Add this new field
    loan: '', // Add this new field
    reasonofloan: '', // Add this new field
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return value.trim().length >= 3 ? '' : 'Name must be at least 3 characters';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email';
      case 'reportTitle':
        return value.trim().length >= 5 ? '' : 'Title must be at least 5 characters';
      case 'description':
        return value.trim().length >= 10 ? '' : 'Description must be at least 10 characters';
      case 'businessType':
        return value.trim().length >= 3 ? '' : 'Business type must be at least 3 characters';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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

  const renderSummaryCard = (title, content) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
      {content}
    </div>
  );

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = async () => {
    if (!isLastStep()) {
      setCompleted({
        ...completed,
        [activeStep]: true,
      });
      handleNext();
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.submitForm(formData);
      
      if (response.success) {
        toast.success('Form submitted successfully! 🎉', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/'); // Use navigate function instead of Navigate component
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to submit form. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          // Your existing Business Information content
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                  1
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-1">What's the name of your business entity?</h3>
                <p className="text-gray-600 mb-4">Enter the whole legal name.</p>
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

            <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                  2
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-1">What type of business are you planning?</h3>
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
                    { id: 'mudra',icon: '/trading.svg', label: 'Mudra' },
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
                      icons: ['/land.svg', '/machinary.svg', '/computer.svg', 'vehicle.svg','/stock.svg', '/calculator.svg'],
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
          </div>
        );
      case 1:
        return (
          // Your existing Address & Expenses content
          <div className="flex flex-col gap-6">
            {/* Business Information Section */}
            <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                  1
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-1">Business Information</h3>
                <p className="text-gray-600 mb-4">General details of the business</p>
                
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
                  <label class="block text-sm font-medium text-gray-700 mb-2">Type of registration*</label>
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
                    If it's a single owner then its Proprietership. If multiple partners, then partnership. 
                    If company registered with MCA as per the company law, then LLP/Pvt ltd etc.
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

            {/* Existing Monthly Expenses Section */}
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

            {/* Existing Personal Information Section */}
            <div className="flex gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                  1
                </span>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-1">Personal Information</h3>
                <p className="text-gray-600 mb-4">General details of the promoter of the business</p>
                
                {/* Owner Name */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name of the owner*</label>
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
          </div>
        );
      case 2:
        return (
          // Your existing Review & Submit content
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Application Summary</h2>
              <p className="text-gray-600">Review your application details before submission</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Business Details */}
              {renderSummaryCard("Business Details",
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Business Name</span>
                    <span className="font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Business Type</span>
                    <span className="font-medium">{formData.businessType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry</span>
                    <span className="font-medium capitalize">{formData.industry}</span>
                  </div>
                </div>
              )}

              {/* Loan Details */}
              {renderSummaryCard("Loan Information",
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Type</span>
                    <span className="font-medium capitalize">{formData.loan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Project Cost</span>
                    <span className="font-medium">₹ {calculateTotals().totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligible Loan Amount</span>
                    <span className="font-medium text-green-600">₹ {calculateTotals().eligibleLoan.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              {renderSummaryCard("Contact Information",
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-medium">{formData.businessInfo.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium">{formData.businessInfo.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">{formData.businessInfo.locality}</span>
                  </div>
                </div>
              )}

              {/* Monthly Overview */}
              {renderSummaryCard("Monthly Overview",
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Expenses</span>
                    <span className="font-medium">₹ {calculateMonthlyTotal().toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-sm text-gray-600 mb-2">Selected Expenses:</div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(formData.monthlyExpenses)
                        .filter(([_, value]) => value.selected)
                        .map(([key, _]) => (
                          <span key={key} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {key}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Requirements Summary */}
            {renderSummaryCard("Selected Requirements",
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formData.requirements)
                    .filter(([_, value]) => value.selected)
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 capitalize">{key}</span>
                        <span className="font-medium">₹ {Number(value.cost).toFixed(2)}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Summary
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const StepperForm = ({ steps, activeStep, setActiveStep }) => {
    return (
      <div className="w-full">
        {/* Progress Bar */}
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

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h4 className="text-xl font-semibold mb-4 text-gray-800">
              {steps[activeStep].title}
            </h4>
            {steps[activeStep].content}
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
            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
            className={`px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 
              text-white shadow-md hover:shadow-lg
              ${activeStep === steps.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </motion.button>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="text-center p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a Project Report</h1>
            <p className="text-gray-600">Submit with your loan application as a Startup or Small Medium Business</p>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <StepperForm
              steps={steps.map((step, index) => ({
                title: step,
                content: renderStepContent(index)
              }))}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}