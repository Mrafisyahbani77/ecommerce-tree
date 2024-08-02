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
            border: '1px solid gray',
            padding: '10px',
          },
        }}
      />
    </>
  );
};

export default App;
