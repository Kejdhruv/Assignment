import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BaseNode from './Layout/BaseNode';

function App() {
  return (
    <Routes>
      {/* Auth page without navbar */}
      <Route path="/" element={<BaseNode/>} />

    
    </Routes>
  );
}

export default App;