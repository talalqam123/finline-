import React, { useState } from 'react';

const Settings = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState({
    showLogo: true,
    includeAnnexure: true,
    showFooter: true,
    orientation: 'portrait'
  });

  const handleChange = (e) => {
    const { name, checked, value } = e.target;
    const newValue = e.target.type === 'checkbox' ? checked : value;
    setSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
    onSettingsChange({ ...settings, [name]: newValue });
  };

  return (
    <div className="settings-container">
      <h3>Report Settings</h3>
      <div className="settings-options">
        <label>
          <input
            type="checkbox"
            name="showLogo"
            checked={settings.showLogo}
            onChange={handleChange}
          />
          Show Company Logo
        </label>
        <label>
          <input
            type="checkbox"
            name="includeAnnexure"
            checked={settings.includeAnnexure}
            onChange={handleChange}
          />
          Include Annexure
        </label>
        <label>
          <input
            type="checkbox"
            name="showFooter"
            checked={settings.showFooter}
            onChange={handleChange}
          />
          Show Footer
        </label>
        <label>
          <select
            name="orientation"
            value={settings.orientation}
            onChange={handleChange}
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Settings;
