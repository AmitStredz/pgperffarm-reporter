import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import PlantPage from './pages/PlantPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="pg-container bg-gray-50">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/test/:testId" element={<TestPage />} />
              <Route path="/test/:testId/plant/:plantId" element={<PlantPage />} />
              {/* Default to DBT-2 and vanillaleaf plant for demo purposes */}
              <Route path="/demo" element={<Navigate to="/test/dbt2/plant/vanillaleaf" />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
