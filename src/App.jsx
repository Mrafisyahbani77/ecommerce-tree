import React from 'react';
import RouterApp from './route';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <RouterApp />
      <Toaster
        toastOptions={{
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          }
        }}
      />
    </>
  );
};

export default App;
