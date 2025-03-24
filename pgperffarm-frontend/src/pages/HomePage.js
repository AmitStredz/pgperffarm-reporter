import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const HomePage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const testsData = await api.getTests();
        setTests(testsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching tests:', err);
        setError('Failed to load tests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 bg-gray-100 rounded-lg text-gray-600">
        Loading test data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-100 rounded-lg text-red-800">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8 pb-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-pg-blue mb-2">PostgreSQL Performance Farm</h1>
        <p className="text-gray-600">Select a performance test to view results</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {tests.map(test => (
          <div 
            key={test.id} 
            className="card hover:transform hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-pg-blue mb-2">{test.name}</h2>
            <p className="text-gray-600 mb-4">Type: {test.description}</p>
            <Link 
              to={`/test/${test.id}`} 
              className="btn inline-block mt-2"
            >
              View Results
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage; 