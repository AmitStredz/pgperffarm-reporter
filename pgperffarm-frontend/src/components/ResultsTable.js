import React from 'react';
import { api } from '../services/api';
import { formatDate, shortenCommit } from '../utils/helpers';

const ResultsTable = ({ results, metricName, scaleUnit, onRowClick }) => {
  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center p-10 bg-gray-50 rounded-lg italic text-gray-500">
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          No results available
        </span>
      </div>
    );
  }

  // Function to flatten results data for table display
  const flattenResults = () => {
    let flatData = [];
    
    results.forEach(branchData => {
      const branch = branchData.branch;
      
      branchData.tests.forEach(test => {
        flatData.push({
          branch,
          revision: test.revision,
          scale: test.scale,
          ctime: test.ctime,
          metric: test.metric,
          complete_at: test.complete_at,
          commit_message: test.commit_message
        });
      });
    });
    
    // Sort by date (newest first)
    return flatData.sort((a, b) => b.ctime - a.ctime);
  };

  const flatData = flattenResults();
  
  // Function to determine if metric is improved compared to previous
  const isImproved = (index, currentValue) => {
    if (index >= flatData.length - 1) return null; // No previous value to compare
    const nextValue = flatData[index + 1].metric;
    return currentValue > nextValue;
  };

  return (
    <div>
      <div className="overflow-x-auto shadow-sm rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="table-header">Date</th>
              <th className="table-header">Branch</th>
              <th className="table-header">Commit</th>
              <th className="table-header">Scale ({scaleUnit})</th>
              <th className="table-header text-right">{metricName}</th>
              <th className="table-header">Message</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flatData.map((row, index) => {
              const improved = isImproved(index, row.metric);
              return (
                <tr 
                  key={`${row.branch}-${row.revision}-${index}`} 
                  onClick={() => onRowClick && onRowClick(row)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <td className="table-cell">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(row.ctime)}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <span className="font-medium">{row.branch}</span>
                    </span>
                  </td>
                  <td className="table-cell">
                    <a 
                      href={api.getCommitUrl(row.revision)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-pg-blue hover:underline flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-mono">{shortenCommit(row.revision)}</span>
                    </a>
                  </td>
                  <td className="table-cell text-center">{row.scale}</td>
                  <td className="table-cell text-right font-mono">
                    <div className="flex items-center justify-end">
                      {improved !== null && (
                        improved ? (
                          <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 mr-1.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        )
                      )}
                      <span className={improved ? 'text-green-600 font-medium' : improved === false ? 'text-red-600 font-medium' : ''}>
                        {row.metric.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell truncate max-w-xs">
                    <span className="flex items-start">
                      <svg className="w-4 h-4 mr-1.5 mt-0.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <span className="line-clamp-1">{row.commit_message || 'No message'}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-2 italic">
        Click on any row to view detailed commit information
      </p>
    </div>
  );
};

export default ResultsTable; 