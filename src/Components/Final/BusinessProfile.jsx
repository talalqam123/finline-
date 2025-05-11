import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useBusinessReport } from '../../context/BusinessReportContext';
import { Button } from "../../ui/button";

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
    <div className="p-4 mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Profile</h3>
        <p className="text-gray-600">Create or generate your business description</p>
      </div>

      {/* Generate button and modal */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="mb-6"
        variant="default"
      >
        Generate Business Description
      </Button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h4 className="text-lg font-semibold mb-4">Generate Business Description</h4>
            <div className="space-y-4">
              <textarea
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter key points about your business..."
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={generateDescription}
                  disabled={loading || !searchInput.trim()}
                  variant="default"
                >
                  {loading ? "Generating..." : "Generate"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Display Section */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Business Description</h4>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              size="sm"
            >
              {isEditing ? "Save Changes" : "Edit"}
            </Button>
          </div>
          
          {isEditing ? (
            <textarea
              value={state.scope.paragraphs[0] || ""}
              onChange={(e) => handleEdit(e.target.value)}
              className="w-full min-h-[200px] p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your business description..."
            />
          ) : (
            <div className="prose max-w-none">
              <div className="p-4 bg-gray-50 rounded-md">
                {state.scope.paragraphs[0] || (
                  <p className="text-gray-500 italic">
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