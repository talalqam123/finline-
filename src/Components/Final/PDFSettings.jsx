import React, { useRef } from "react";
import { useBusinessReport } from "../../context/BusinessReportContext";

const PDFSettings = () => {
  const { state, dispatch } = useBusinessReport();
  const fileInputRef = useRef(null);
  
  const handleCurrencyChange = (currency, symbol) => {
    dispatch({
      type: 'UPDATE_PDF_SETTINGS',
      payload: { currency, currencySymbol: symbol }
    });
  };

  const handleMoneyFormatChange = (format) => {
    dispatch({
      type: 'UPDATE_PDF_SETTINGS',
      payload: { moneyFormat: format }
    });
  };

  const handleTitleFormatChange = (format) => {
    dispatch({
      type: 'UPDATE_PDF_SETTINGS',
      payload: { titleFormat: format }
    });
  };

  const handleSpacingChange = (spacing) => {
    dispatch({
      type: 'UPDATE_PDF_SETTINGS',
      payload: { pageSpacing: spacing }
    });
  };

  const handleConsolidatedChange = (field, value) => {
    dispatch({
      type: 'UPDATE_PDF_SETTINGS',
      payload: { [field]: value }
    });
  };

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch({
          type: 'UPDATE_PDF_SETTINGS',
          payload: { 
            coverPhoto: e.target?.result,
            coverPhotoName: file.name 
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditCoverPage = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-6 text-gray-900">Report Settings</h3>
      
      {/* Currency Selection */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Select Currency</h4>
        <div className="flex gap-3">
          <button
            onClick={() => handleCurrencyChange('rupees', '₹')}
            className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
              state.pdfSettings?.currency === 'rupees' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            Rupees <span className="text-xs">₹</span>
          </button>
          <button
            onClick={() => handleCurrencyChange('dollars', '$')}
            className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
              state.pdfSettings?.currency === 'dollars' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            Dollars <span className="text-xs">$</span>
          </button>
          <button
            onClick={() => handleCurrencyChange('dirham', 'AED')}
            className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
              state.pdfSettings?.currency === 'dirham' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            Dirham <span className="text-xs">AED</span>
          </button>
        </div>
      </div>

      {/* Money Format */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Select money format</h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleMoneyFormatChange('lakhs')}
            className={`py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
              state.pdfSettings?.moneyFormat === 'lakhs' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            Figures in Lakhs
          </button>
          <button
            onClick={() => handleMoneyFormatChange('noDecimals')}
            className={`py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
              state.pdfSettings?.moneyFormat === 'noDecimals' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            Figures with no decimals
          </button>
          <button
            onClick={() => handleMoneyFormatChange('decimals')}
            className={`py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
              state.pdfSettings?.moneyFormat === 'decimals' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            Figures with decimal points
          </button>
          <button
            onClick={() => handleMoneyFormatChange('crores')}
            className={`py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
              state.pdfSettings?.moneyFormat === 'crores' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            Figures in Crores
          </button>
        </div>
      </div>

      {/* Title Format */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Title format</h4>
        <div className="flex gap-3">
          <button
            onClick={() => handleTitleFormatChange('projected')}
            className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
              state.pdfSettings?.titleFormat === 'projected' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            Projected / Estimated
          </button>
          <button
            onClick={() => handleTitleFormatChange('date')}
            className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
              state.pdfSettings?.titleFormat === 'date' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            Mar 25
          </button>
          <button
            onClick={() => handleTitleFormatChange('year')}
            className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
              state.pdfSettings?.titleFormat === 'year' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            Year 1
          </button>
        </div>
      </div>

      {/* Page Spacing */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Page Spacing</h4>
        <div className="flex gap-3">
          <button
            onClick={() => handleSpacingChange('none')}
            className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
              state.pdfSettings?.pageSpacing === 'none' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            No Spacing
          </button>
          <button
            onClick={() => handleSpacingChange('onePerPage')}
            className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
              state.pdfSettings?.pageSpacing === 'onePerPage' 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            1 item per page
          </button>
        </div>
      </div>

      {/* Cover Photo Section */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Change report color, cover image</h4>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="relative aspect-[4/3] max-h-[300px] overflow-hidden">
            {state.pdfSettings?.coverPhoto ? (
              <img 
                src={state.pdfSettings.coverPhoto} 
                alt="Report Cover" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">No cover image selected</p>
                </div>
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/50 to-transparent">
              <p className="text-white text-sm truncate">
                {state.pdfSettings?.coverPhotoName || 'Default Cover'}
              </p>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleEditCoverPage}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Edit cover page
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverPhotoChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Consolidated Figures */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Contribution Split</h4>
        <button
          onClick={() => dispatch({
            type: 'UPDATE_PDF_SETTINGS',
            payload: { showContributionEdit: true }
          })}
          className="w-full py-2 px-4 rounded-lg border text-sm font-medium text-indigo-600 border-indigo-600 hover:bg-indigo-50 transition-all text-left"
        >
          Edit Contribution Split
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Consolidated figure of sales in the profit and loss account</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleConsolidatedChange('consolidatedSales', true)}
              className={`px-4 py-1 rounded-lg border text-sm font-medium transition-all ${
                state.pdfSettings?.consolidatedSales 
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleConsolidatedChange('consolidatedSales', false)}
              className={`px-4 py-1 rounded-lg border text-sm font-medium transition-all ${
                state.pdfSettings?.consolidatedSales === false
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Consolidated figure of Machinery in project cost</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleConsolidatedChange('consolidatedMachinery', true)}
              className={`px-4 py-1 rounded-lg border text-sm font-medium transition-all ${
                state.pdfSettings?.consolidatedMachinery 
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleConsolidatedChange('consolidatedMachinery', false)}
              className={`px-4 py-1 rounded-lg border text-sm font-medium transition-all ${
                state.pdfSettings?.consolidatedMachinery === false 
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFSettings;