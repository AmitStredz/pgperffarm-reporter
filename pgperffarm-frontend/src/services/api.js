import axios from 'axios';
import { 
  testTypes, 
  plantsList, 
  branchesList, 
  testResults,
  metricNames,
  scaleUnits
} from '../mock-data/testData';

// Set to true to use mock data instead of actual API calls
const USE_MOCK_DATA = true;

// Base URL for the API
const API_BASE_URL = 'http://localhost:8080/api';

// GitHub URL for PostgreSQL commits
const POSTGRES_COMMIT_URL = 'https://github.com/postgres/postgres/commit';

export const api = {
  // Get list of available tests
  async getTests() {
    if (USE_MOCK_DATA) {
      return Promise.resolve(testTypes);
    }
    
    const response = await axios.get(`${API_BASE_URL}/tests`);
    return response.data;
  },
  
  // Get list of plants for a specific test
  async getPlants(test) {
    if (USE_MOCK_DATA) {
      return Promise.resolve(plantsList[test] || []);
    }
    
    const response = await axios.get(`${API_BASE_URL}/plants?test=${test}`);
    return response.data;
  },
  
  // Get list of available branches
  async getBranches() {
    if (USE_MOCK_DATA) {
      return Promise.resolve(branchesList);
    }
    
    const response = await axios.get(`${API_BASE_URL}/branches`);
    return response.data;
  },
  
  // Get results for a specific test and plant
  async getResults(test, plant, selectedBranches = [], fromDate = null, toDate = null) {
    if (USE_MOCK_DATA) {
      // Get mock data for the test and plant
      const results = testResults[test]?.[plant] || [];
      
      // Filter by selected branches if any
      let filteredResults = results;
      if (selectedBranches.length > 0) {
        filteredResults = results.filter(result => 
          selectedBranches.includes(result.branch)
        );
      }
      
      // Filter by date range if specified
      if (fromDate || toDate) {
        filteredResults = filteredResults.map(branch => {
          const filteredTests = branch.tests.filter(test => {
            const testDate = new Date(test.ctime * 1000);
            if (fromDate && toDate) {
              return testDate >= fromDate && testDate <= toDate;
            } else if (fromDate) {
              return testDate >= fromDate;
            } else if (toDate) {
              return testDate <= toDate;
            }
            return true;
          });
          
          return {
            ...branch,
            tests: filteredTests
          };
        });
      }
      
      return Promise.resolve(filteredResults);
    }
    
    // Construct query parameters
    const params = new URLSearchParams();
    if (selectedBranches.length > 0) {
      params.append('branches', selectedBranches.join(','));
    }
    if (fromDate) {
      params.append('from', Math.floor(fromDate.getTime() / 1000));
    }
    if (toDate) {
      params.append('to', Math.floor(toDate.getTime() / 1000));
    }
    
    const response = await axios.get(
      `${API_BASE_URL}/results?test=${test}&plant=${plant}&${params.toString()}`
    );
    return response.data;
  },
  
  // Get commit URL
  getCommitUrl(revision) {
    return `${POSTGRES_COMMIT_URL}/${revision}`;
  },
  
  // Get metric name for a test
  getMetricName(test) {
    return metricNames[test] || 'Unknown Metric';
  },
  
  // Get scale unit for a test
  getScaleUnit(test) {
    return scaleUnits[test] || 'Unknown Unit';
  }
}; 