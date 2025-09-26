import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import CurrentStock from './pages/CurrentStock';
export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/current-stock" element={<CurrentStock />} />
      </Routes>
    </BrowserRouter>;
}