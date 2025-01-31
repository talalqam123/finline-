import React, { useState } from "react";
import FormWizard from "react-form-wizard-component";
import { motion, AnimatePresence } from "framer-motion";
import { HiExclamationCircle } from "react-icons/hi";
import "react-form-wizard-component/dist/style.css";

export default function FormWizardSample() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        reportTitle: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [activeField, setActiveField] = useState(0);

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

    const handleComplete = () => {
        console.log("Form completed!", formData);
    };

    const nextField = () => {
        const currentField = fields[activeField];
        const error = validateField(currentField.name, formData[currentField.name]);
        
        if (error) {
            setErrors(prev => ({
                ...prev,
                [currentField.name]: error
            }));
            // Shake animation for error feedback
            const input = document.querySelector(`[name="${currentField.name}"]`);
            input?.classList.add('shake');
            setTimeout(() => input?.classList.remove('shake'), 500);
            return;
        }

        if (activeField < fields.length - 1) {
            setActiveField(prev => prev + 1);
        }
    };

    const prevField = () => {
        if (activeField > 0) {
            setActiveField(prev => prev - 1);
        }
    };

    const fields = [
        {
            label: "Full Name",
            name: "fullName",
            type: "text",
            placeholder: "Enter your full name",
            icon: "👤"
        },
        {
            label: "Email Address",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            icon: "📧"
        },
        {
            label: "Report Title",
            name: "reportTitle",
            type: "text",
            placeholder: "Enter report title"
        },
        {
            label: "Description",
            name: "description",
            type: "textarea",
            placeholder: "Enter description"
        }
    ];

    const slideVariants = {
        enter: (direction) => ({
            y: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            y: 0,
            opacity: 1
        },
        exit: (direction) => ({
            y: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    return (
        <div className="max-w-2xl mx-auto">
            <FormWizard
                shape="circle"
                color="#2563eb"
                onComplete={handleComplete}
            >
                <FormWizard.TabContent title="Personal details" icon="ti-user">
                    <div className="p-4 relative min-h-[300px]">
                        <div className="space-y-4">
                            <AnimatePresence mode="wait" custom={activeField}>
                                <motion.div
                                    key={activeField}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    custom={activeField}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="space-y-4"
                                >
                                    <div className="relative">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-2xl">{fields[activeField].icon}</span>
                                            <label className="text-lg font-semibold text-gray-700">
                                                {fields[activeField].label}
                                            </label>
                                        </div>
                                        
                                        <div className="relative">
                                            {fields[activeField].type === 'textarea' ? (
                                                <textarea
                                                    name={fields[activeField].name}
                                                    value={formData[fields[activeField].name]}
                                                    onChange={handleInputChange}
                                                    placeholder={fields[activeField].placeholder}
                                                    className={`w-full px-4 py-2 border rounded-md transition-all duration-200 ${
                                                        errors[fields[activeField].name] 
                                                            ? 'border-red-500 focus:ring-red-500' 
                                                            : 'border-gray-300 focus:ring-blue-500'
                                                    }`}
                                                    rows="4"
                                                />
                                            ) : (
                                                <input
                                                    type={fields[activeField].type}
                                                    name={fields[activeField].name}
                                                    value={formData[fields[activeField].name]}
                                                    onChange={handleInputChange}
                                                    placeholder={fields[activeField].placeholder}
                                                    className={`w-full px-4 py-2 border rounded-md transition-all duration-200 ${
                                                        errors[fields[activeField].name] 
                                                            ? 'border-red-500 focus:ring-red-500' 
                                                            : 'border-gray-300 focus:ring-blue-500'
                                                    }`}
                                                />
                                            )}
                                            
                                            {errors[fields[activeField].name] && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-center gap-1 text-red-500 text-sm mt-1"
                                                >
                                                    <HiExclamationCircle className="h-4 w-4" />
                                                    {errors[fields[activeField].name]}
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="flex justify-between pt-4">
                                        <button
                                            onClick={prevField}
                                            disabled={activeField === 0}
                                            className={`px-4 py-2 rounded-md ${
                                                activeField === 0 
                                                    ? 'bg-gray-200 cursor-not-allowed' 
                                                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                            } transition-all duration-200`}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={nextField}
                                            disabled={activeField === fields.length - 1}
                                            className={`px-4 py-2 rounded-md ${
                                                activeField === fields.length - 1 
                                                    ? 'bg-gray-200 cursor-not-allowed' 
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                            } transition-all duration-200`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Progress Indicators */}
                            <div className="flex justify-center gap-2 pt-4">
                                {fields.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveField(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                            activeField === index 
                                                ? 'bg-blue-600 w-4' 
                                                : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Additional Info" icon="ti-settings">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Report Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Report Title</label>
                                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Last step" icon="ti-check">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Confirm Details</h3>
                        <div className="space-y-4">
                            <p className="text-gray-600">Please review your information before submitting.</p>
                            {/* Add summary of collected information here */}
                        </div>
                    </div>
                </FormWizard.TabContent>
            </FormWizard>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    75% { transform: translateX(8px); }
                }
                .shake {
                    animation: shake 0.3s ease-in-out;
                }
                
                .wizard-card-footer {
                    display: flex;
                    justify-content: space-between;
                    padding: 1rem;
                }
                .wizard-btn {
                    padding: 0.5rem 1rem;
                    border-radius: 0.375rem;
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
}
