import React from "react";

export const Analytics = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
      <p className="text-gray-600">Track key metrics and insights about appointments, patients, and revenue.</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-100 p-4 rounded-md text-blue-700">
          <h3 className="text-lg font-semibold">Total Appointments</h3>
          <p className="text-xl font-bold">124</p>
        </div>
        <div className="bg-green-100 p-4 rounded-md text-green-700">
          <h3 className="text-lg font-semibold">Total Patients</h3>
          <p className="text-xl font-bold">58</p>
        </div>
      </div>
    </div>
  );
};
