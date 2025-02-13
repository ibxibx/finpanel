import React from "react";

const Settings = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Settings</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-medium mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              className="rounded border-gray-300"
            />
            <label htmlFor="notifications" className="ml-2">
              Enable notifications
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="darkMode"
              className="rounded border-gray-300"
            />
            <label htmlFor="darkMode" className="ml-2">
              Dark mode
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
