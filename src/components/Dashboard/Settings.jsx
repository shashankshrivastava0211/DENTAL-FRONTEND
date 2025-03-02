import React from "react";

export const Settings = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
      <p className="text-gray-600">Configure your dashboard settings.</p>

      <div className="mt-4 space-y-4">
        <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
          <span>Enable Dark Mode</span>
          <input type="checkbox" className="toggle-checkbox" />
        </div>
        <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
          <span>Receive Email Notifications</span>
          <input type="checkbox" className="toggle-checkbox" defaultChecked />
        </div>
      </div>
    </div>
  );
};


