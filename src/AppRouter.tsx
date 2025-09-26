import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import CurrentStock from './pages/CurrentStock';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/current-stock" element={<CurrentStock />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>;
}