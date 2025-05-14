import React, { useState } from 'react';
import { useBusinessReport } from '../../context/BusinessReportContext';
import { Button } from "../ui/button";
import { useParams } from 'react-router-dom';

const Annexure = () => {
  const { id } = useParams();
  const { state, dispatch } = useBusinessReport();
  const [isAssumptionsEditing, setIsAssumptionsEditing] = useState(false);
  const [isAnnexureEditing, setIsAnnexureEditing] = useState(false);

  const handleAssumptionsUpdate = (text) => {
    dispatch({
      type: 'UPDATE_ANNEXURE',
      payload: { assumptions: text }
    });
  };

  const handleAnnexureUpdate = (text) => {
    dispatch({
      type: 'UPDATE_ANNEXURE',
      payload: { annexureText: text }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 sm:mb-8 text-center">
        Business Report Annexure
      </h2>

      {/* Assumptions Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 sm:mb-8 transition-all duration-300 hover:shadow-md">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 sm:gap-0">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                Business Assumptions
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Define key assumptions for your business analysis
              </p>
            </div>
            <Button
              onClick={() => setIsAssumptionsEditing(!isAssumptionsEditing)}
              variant={isAssumptionsEditing ? "default" : "outline"}
              size="sm"
              className="w-full sm:w-auto min-w-[100px]"
            >
              {isAssumptionsEditing ? "Save" : "Edit"}
            </Button>
          </div>

          {isAssumptionsEditing ? (
            <div className="transition-all duration-300">
              <textarea
                value={state.annexure?.assumptions || ''}
                onChange={(e) => handleAssumptionsUpdate(e.target.value)}
                className="w-full min-h-[200px] sm:min-h-[250px] p-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-y transition-all duration-200"
                placeholder="Enter your business assumptions here..."
              />
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
              {state.annexure?.assumptions ? (
                <div className="prose prose-sm sm:prose max-w-none text-gray-700 dark:text-gray-300">
                  {state.annexure.assumptions}
                </div>
              ) : (
                <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 italic">
                  No assumptions defined yet. Click "Edit" to add your business assumptions.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Annexure Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 sm:gap-0">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                Annexure Details
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Additional information and supporting documents
              </p>
            </div>
            <Button
              onClick={() => setIsAnnexureEditing(!isAnnexureEditing)}
              variant={isAnnexureEditing ? "default" : "outline"}
              size="sm"
              className="w-full sm:w-auto min-w-[100px]"
            >
              {isAnnexureEditing ? "Save" : "Edit"}
            </Button>
          </div>

          {isAnnexureEditing ? (
            <div className="transition-all duration-300">
              <textarea
                value={state.annexure?.annexureText || ''}
                onChange={(e) => handleAnnexureUpdate(e.target.value)}
                className="w-full min-h-[200px] sm:min-h-[250px] p-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-y transition-all duration-200"
                placeholder="Enter additional annexure details here..."
              />
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
              {state.annexure?.annexureText ? (
                <div className="prose prose-sm sm:prose max-w-none text-gray-700 dark:text-gray-300">
                  {state.annexure.annexureText}
                </div>
              ) : (
                <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 italic">
                  No annexure details added yet. Click "Edit" to add supporting information.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Annexure;