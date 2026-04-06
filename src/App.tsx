import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import { AddProduct } from './pages/AddProduct';
import { ContentBoard } from './pages/ContentBoard';
import { Analytics } from './pages/Analytics';
import { AgentPanel } from './pages/AgentPanel';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<div className="p-8 text-center text-muted">Products list coming soon...</div>} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/content" element={<ContentBoard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/agents" element={<AgentPanel />} />
          <Route path="/settings" element={<div className="p-8 text-center text-muted text-sm font-mono uppercase tracking-widest">Settings coming soon...</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
