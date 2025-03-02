import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-extrabold text-blue-600">404</h1>
      <h2 className="mt-4 text-xl text-gray-700">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" className="mt-4 text-blue-600 hover:text-blue-500">
        Go back to homepage
      </Link>
    </div>
  );
};

