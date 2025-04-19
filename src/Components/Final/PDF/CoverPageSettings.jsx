import React, { useState } from 'react';

const CoverPageSettings = ({ onSettingsChange }) => {
  const [coverImages, setCoverImages] = useState({
    leftImage: '/public/manufacturing.svg',
    rightImage: '/public/calculator.svg'
  });

  const handleImageChange = (side, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = {
          ...coverImages,
          [side]: reader.result
        };
        setCoverImages(newImages);
        onSettingsChange(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="cover-page-settings bg-white rounded-lg p-6 mb-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Cover Page Images</h3>
      <div className="grid grid-cols-2 gap-6">
        {/* Left Image Settings */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Left Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange('leftImage', e)}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100
              "
            />
          </label>
          <div className="w-full h-40 border rounded-lg overflow-hidden">
            <img
              src={coverImages.leftImage}
              alt="Left cover"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Image Settings */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Right Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange('rightImage', e)}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100
              "
            />
          </label>
          <div className="w-full h-40 border rounded-lg overflow-hidden">
            <img
              src={coverImages.rightImage}
              alt="Right cover"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverPageSettings;
