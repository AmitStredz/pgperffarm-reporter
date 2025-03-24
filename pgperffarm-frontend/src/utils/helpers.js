import { format } from 'date-fns';

// Format timestamp to readable date
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return format(date, 'yyyy-MM-dd');
};

// Format timestamp to date with time
export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return format(date, 'yyyy-MM-dd HH:mm');
};

// Shorten commit hash for display
export const shortenCommit = (hash, length = 8) => {
  return hash.substring(0, length);
};

// Get predefined color for specific branches or generate one
export const getBranchColor = (branch) => {
  // PostgreSQL specific branch colors - more meaningful color mapping
  const branchColors = {
    'master': '#336791',        // PostgreSQL blue
    'main': '#336791',          // PostgreSQL blue (alternative name)
    'HEAD': '#336791',          // PostgreSQL blue (alternative name)
    'REL_17_STABLE': '#ea7330', // PostgreSQL orange
    'REL_16_STABLE': '#4c72b0', // Blue shade
    'REL_15_STABLE': '#dd8452', // Orange shade
    'REL_14_STABLE': '#55a868', // Green
    'REL_13_STABLE': '#c44e52', // Red
    'REL_12_STABLE': '#8172b3', // Purple
    'REL_11_STABLE': '#937860', // Brown
    'REL_10_STABLE': '#da8bc3', // Pink
    'REL_9_STABLE': '#8c8c8c'   // Gray
  };
  
  // Return predefined color if exists
  if (branchColors[branch]) {
    return branchColors[branch];
  }
  
  // Fallback colors for other branches
  const fallbackColors = [
    '#4285F4', // Google Blue
    '#EA4335', // Google Red
    '#FBBC05', // Google Yellow
    '#34A853', // Google Green
    '#8952ff', // Purple
    '#ff7b25', // Orange
    '#00b7c3', // Teal
    '#8bc34a'  // Light Green
  ];
  
  // Simple hash function to get consistent color
  const sum = branch.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return fallbackColors[sum % fallbackColors.length];
};

// Process results data for chart.js
export const processResultsForChart = (results) => {
  if (!results || !results.length) return [];
  
  return results.map(branchData => {
    const color = getBranchColor(branchData.branch);
    
    // Sort tests by timestamp
    const sortedTests = [...branchData.tests].sort((a, b) => a.ctime - b.ctime);
    
    return {
      label: branchData.branch,
      data: sortedTests.map(test => ({
        x: test.ctime * 1000, // Convert to milliseconds for chart.js
        y: test.metric,
        revision: test.revision,
        commit_message: test.commit_message,
        scale: test.scale,
        timestamp: formatDate(test.ctime)
      })),
      borderColor: color,
      backgroundColor: color + '20', // Add transparency
      borderWidth: 2,
      pointBackgroundColor: color,
      pointRadius: 4,
      pointHoverRadius: 7,
      hoverBackgroundColor: color,
      hoverBorderColor: 'white',
      hoverBorderWidth: 2,
      cubicInterpolationMode: 'monotone',
      tension: 0.4
    };
  });
}; 