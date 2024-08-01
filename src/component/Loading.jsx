import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center min-h-screen items-center w-full h-full">
      <div className="animate-spin rounded-full border-t-4 border-green-700 border-opacity-25 w-24 h-24"></div>
    </div>
  );
};

export default Loading;
