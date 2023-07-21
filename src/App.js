import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ConfigRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <ConfigRoutes />
    </BrowserRouter>
  );
}

export default App;
