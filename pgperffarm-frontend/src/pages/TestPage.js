import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const [plants, setPlants] = useState([]);
  const [testInfo, setTestInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!testId) {
        navigate('/');
        return;
      }
      
      try {
        setLoading(true);
        
        // Fetch test info
        const testsData = await api.getTests();
        const currentTest = testsData.find(test => test.id === testId);
        
        if (!currentTest) {
          setError(`Test "${testId}" not found.`);
          return;
        }
        
        setTestInfo(currentTest);
        
        // Fetch plants for this test
        const plantsData = await api.getPlants(testId);
        setPlants(plantsData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [testId, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 bg-gray-100 rounded-lg text-gray-600">
        Loading plant data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-100 rounded-lg text-red-800">
        <div>{error}</div>
        <Link to="/" className="mt-4 inline-block btn-secondary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8 pb-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-pg-blue mb-2">{testInfo?.name || testId}</h1>
        <p className="text-gray-600 mb-4">{testInfo?.description}</p>
        <Link to="/" className="btn-secondary">Back to Home</Link>
      </header>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-pg-blue mb-4">Select a Plant</h2>
        
        {plants.length === 0 ? (
          <p className="text-gray-600">No plants available for this test.</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="table-header">Plant Name</th>
                  <th className="table-header">Host</th>
                  <th className="table-header">Admin</th>
                  <th className="table-header">Test Results</th>
                  <th className="table-header">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {plants.map(plant => (
                  <tr key={plant.name} className="hover:bg-gray-50">
                    <td className="table-cell">{plant.name}</td>
                    <td className="table-cell">{plant.host}</td>
                    <td className="table-cell">{plant.admin}</td>
                    <td className="table-cell text-center">{plant.results}</td>
                    <td className="table-cell">
                      <Link 
                        to={`/test/${testId}/plant/${plant.name}`} 
                        className="btn"
                      >
                        View Results
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage; 