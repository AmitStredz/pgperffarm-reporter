import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import TestSelector from '../components/TestSelector';
import PlantSelector from '../components/PlantSelector';
import BranchSelector from '../components/BranchSelector';
import DateRangePicker from '../components/DateRangePicker';
import PerformanceChart from '../components/PerformanceChart';
import ResultsTable from '../components/ResultsTable';
import CommitDetailsModal from '../components/CommitDetailsModal';

const PlantPage = () => {
  const { testId, plantId } = useParams();
  const navigate = useNavigate();
  
  // States for the current test and plant
  const [testInfo, setTestInfo] = useState(null);
  const [plants, setPlants] = useState([]);
  
  // States for filtering and data
  const [branches, setBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [results, setResults] = useState([]);
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [optimizeYAxis, setOptimizeYAxis] = useState(false);
  
  // First, fetch test info and plants when the component mounts
  useEffect(() => {
    const fetchTestData = async () => {
      if (!testId) {
        navigate('/');
        return;
      }
      
      try {
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
        
        // If current plant doesn't exist in the list, redirect
        if (plantId && plantsData.length > 0 && !plantsData.some(p => p.name === plantId)) {
          navigate(`/test/${testId}`);
        }
        
        // Fetch available branches
        const branchesData = await api.getBranches();
        setBranches(branchesData);
        
        // Default to selecting all branches
        setSelectedBranches(branchesData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load test data. Please try again later.');
      }
    };

    fetchTestData();
  }, [testId, plantId, navigate]);
  
  // Fetch results when filters change
  useEffect(() => {
    const fetchResults = async () => {
      if (!testId || !plantId || selectedBranches.length === 0) {
        return;
      }
      
      try {
        setLoading(true);
        const resultsData = await api.getResults(
          testId, 
          plantId, 
          selectedBranches,
          fromDate,
          toDate
        );
        setResults(resultsData);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to load results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [testId, plantId, selectedBranches, fromDate, toDate]);
  
  // Handler for plant selection change
  const handlePlantChange = (plantName) => {
    navigate(`/test/${testId}/plant/${plantName}`);
  };
  
  // Handler for test selection change
  const handleTestChange = (testId) => {
    navigate(`/test/${testId}`);
  };
  
  // Handler for commit selection
  const handleCommitSelect = (commit) => {
    setSelectedCommit(commit);
  };
  
  // Handler for date range changes
  const handleApplyFilters = () => {
    // This will trigger the useEffect to fetch results
  };
  
  // Toggle filters visibility
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Toggle Y-axis optimization
  const toggleYAxisOptimization = () => {
    setOptimizeYAxis(!optimizeYAxis);
  };
  
  // Calculate optimal Y-axis settings if needed
  const calculateChartOptions = () => {
    if (!optimizeYAxis || !results || results.length === 0) {
      return null;
    }
    
    // Find min and max values across all datasets
    let minValue = Number.MAX_SAFE_INTEGER;
    let maxValue = Number.MIN_SAFE_INTEGER;
    
    results.forEach(branchData => {
      branchData.tests.forEach(test => {
        if (test.metric < minValue) minValue = test.metric;
        if (test.metric > maxValue) maxValue = test.metric;
      });
    });
    
    // Add some padding (5%)
    const padding = (maxValue - minValue) * 0.05;
    
    return {
      scales: {
        y: {
          min: Math.max(0, minValue - padding),
          max: maxValue + padding
        }
      }
    };
  };
  
  if (error) {
    return (
      <div className="bg-red-100 rounded-lg p-6 border-l-4 border-red-600 shadow-md">
        <h2 className="text-red-800 text-lg font-semibold mb-2">Error</h2>
        <p className="text-red-700 mb-4">{error}</p>
        <Link to="/" className="btn-secondary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb navigation */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex space-x-2">
          <li>
            <Link to="/" className="hover:text-pg-blue hover:underline">Home</Link>
          </li>
          <li className="flex items-center space-x-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to={`/test/${testId}`} className="hover:text-pg-blue hover:underline">
              {testInfo?.name || 'Test'}
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-medium text-gray-800">{plantId}</span>
          </li>
        </ol>
      </nav>

      {/* Page header */}
      <header className="pg-header">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="pg-title">{testInfo?.name || testId}</h1>
            <p className="text-gray-600 mb-2">Plant: <span className="font-semibold">{plantId}</span></p>
            <p className="text-gray-600 text-sm">{testInfo?.description}</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to={`/test/${testId}`} className="btn-secondary btn-small">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Test
              </span>
            </Link>
            <Link to="/" className="btn-secondary btn-small">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Filters panel */}
      <div className="pg-card mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-pg-blue">Data Filters</h2>
          <button 
            onClick={toggleFilters}
            className="text-gray-600 hover:text-pg-blue"
          >
            {isFilterOpen ? (
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Hide Filters
              </span>
            ) : (
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Show Filters
              </span>
            )}
          </button>
        </div>
        
        {isFilterOpen && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-pg-blue mb-3">Test & Plant</h3>
                <TestSelector 
                  tests={testInfo ? [testInfo] : []} 
                  selectedTest={testId} 
                  onChange={handleTestChange} 
                />
                
                <PlantSelector 
                  plants={plants} 
                  selectedPlant={plantId} 
                  onChange={handlePlantChange} 
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-pg-blue mb-3">Date Range</h3>
                <DateRangePicker 
                  fromDate={fromDate} 
                  toDate={toDate} 
                  onFromDateChange={setFromDate} 
                  onToDateChange={setToDate} 
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-pg-blue mb-3">PostgreSQL Branches</h3>
              <BranchSelector 
                branches={branches} 
                selectedBranches={selectedBranches} 
                onChange={setSelectedBranches} 
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <label className="flex items-center text-gray-700 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={optimizeYAxis} 
                    onChange={toggleYAxisOptimization}
                    className="h-4 w-4 rounded border-gray-300 text-pg-blue focus:ring-pg-blue mr-2"
                  />
                  <span className="font-medium">Optimize Y-axis to highlight differences</span>
                </label>
                <div className="ml-2 text-gray-500 group relative">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                    Adjusts Y-axis scale to make differences between branches more visible
                  </div>
                </div>
              </div>
              
              <button 
                className="btn flex items-center"
                onClick={handleApplyFilters}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Apply Filters
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Results section */}
      <div className="pg-card">
        <h2 className="text-2xl font-semibold text-pg-blue mb-6">Performance Results</h2>
        
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="text-center">
              <svg className="animate-spin h-10 w-10 text-pg-blue mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading performance data...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-pg-blue mb-3">Performance Chart</h3>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <PerformanceChart 
                  results={results} 
                  testType={testInfo?.name || testId}
                  metricName={api.getMetricName(testId)}
                  scaleUnit={api.getScaleUnit(testId)}
                  onPointClick={handleCommitSelect}
                  options={calculateChartOptions()}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Click on any data point to view detailed commit information
                </span>
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-pg-blue mb-3">Results Table</h3>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <ResultsTable 
                  results={results}
                  metricName={api.getMetricName(testId)}
                  scaleUnit={api.getScaleUnit(testId)}
                  onRowClick={handleCommitSelect}
                />
              </div>
            </div>
          </>
        )}
      </div>
      
      {selectedCommit && (
        <CommitDetailsModal 
          commit={selectedCommit} 
          onClose={() => setSelectedCommit(null)} 
        />
      )}
    </div>
  );
};

export default PlantPage; 