import React, { useState } from 'react';
import { useBusinessReport } from '../../context/BusinessReportContext';
import { Button } from "../../ui/button";
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-1xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Business Report Annexure
        </h2>

        {/* Assumptions Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 transition-all duration-300 hover:shadow-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Business Assumptions
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Define key assumptions for your business analysis
                </p>
              </div>
              <Button
                onClick={() => setIsAssumptionsEditing(!isAssumptionsEditing)}
                variant={isAssumptionsEditing ? "default" : "outline"}
                size="sm"
                className="min-w-[100px]"
              >
                {isAssumptionsEditing ? "Save" : "Edit"}
              </Button>
            </div>

            {isAssumptionsEditing ? (
              <div className="transition-all duration-300">
                <textarea
                  value={state.annexure?.assumptions || ''}
                  onChange={(e) => handleAssumptionsUpdate(e.target.value)}
                  className="w-full min-h-[250px] p-4 text-gray-700 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 resize-y transition-all duration-200"
                  placeholder="Enter your business assumptions here..."
                />
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6">
                {state.annexure?.assumptions ? (
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {state.annexure.assumptions}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">
                    No assumptions defined yet. Click "Edit" to add your business assumptions.
                  </p>
                )}
              </div>
            )}

          
          </div>
        </div>

        {/* Annexure Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Annexure Details
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Additional information and supporting documents
                </p>
              </div>
              <Button
                onClick={() => setIsAnnexureEditing(!isAnnexureEditing)}
                variant={isAnnexureEditing ? "default" : "outline"}
                size="sm"
                className="min-w-[100px]"
              >
                {isAnnexureEditing ? "Save" : "Edit"}
              </Button>
            </div>

            {isAnnexureEditing ? (
              <div className="transition-all duration-300">
                <textarea
                  value={state.annexure?.annexureText || ''}
                  onChange={(e) => handleAnnexureUpdate(e.target.value)}
                  className="w-full min-h-[250px] p-4 text-gray-700 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 resize-y transition-all duration-200"
                  placeholder="Enter additional annexure details here..."
                />
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6">
                {state.annexure?.annexureText ? (
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {state.annexure.annexureText}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">
                    No annexure details added yet. Click "Edit" to add supporting information.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Annexure;