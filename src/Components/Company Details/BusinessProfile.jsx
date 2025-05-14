import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useBusinessReport } from '../../context/BusinessReportContext';
import { Button } from "../ui/button";

const BusinessProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { state, dispatch } = useBusinessReport();

  const saveDescription = (description) => {
    dispatch({
      type: 'UPDATE_SCOPE',
      payload: {
        paragraphs: [description]
      }
    });
  };

  const generateDescription = async () => {
    try {
      setLoading(true);
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Generate a professional business description based on the following input: ${searchInput}. 
                     Make it concise, engaging, and highlight the key aspects of the business.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedText = response.text();
      
      // Save to context
      saveDescription(generatedText);
      setIsModalOpen(false);
      setSearchInput("");
    } catch (error) {
      console.error("Error generating description:", error);
      alert("Error generating description. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (newText) => {
    saveDescription(newText);
  };

  return (
    <div className="w-full max-w-7xl p-4 sm:p-6 lg:p-8 mx-auto">
      <div className="mb-6 md:mb-8">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Business Profile</h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Create or generate your business description</p>
      </div>

      {/* Generate button and modal */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 w-full sm:w-auto"
        variant="default"
      >
        Generate Business Description
      </Button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg w-full max-w-2xl mx-4">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Generate Business Description</h4>
            <div className="space-y-4">
              <textarea
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter key points about your business..."
                className="w-full h-32 sm:h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  onClick={generateDescription}
                  disabled={loading || !searchInput.trim()}
                  variant="default"
                  className="w-full sm:w-auto"
                >
                  {loading ? "Generating..." : "Generate"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Display Section */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Business Description</h4>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
            >
              {isEditing ? "Save Changes" : "Edit"}
            </Button>
          </div>
          
          {isEditing ? (
            <textarea
              value={state.scope.paragraphs[0] || ""}
              onChange={(e) => handleEdit(e.target.value)}
              className="w-full min-h-[200px] sm:min-h-[250px] p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter your business description..."
            />
          ) : (
            <div className="prose max-w-none dark:prose-invert">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md text-sm sm:text-base">
                {state.scope.paragraphs[0] || (
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    No business description yet. Click "Generate Business Description" or "Edit" to add one.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;