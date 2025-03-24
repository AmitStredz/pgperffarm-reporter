import React from 'react';
import { api } from '../services/api';
import { formatDateTime } from '../utils/helpers';

const CommitDetailsModal = ({ commit, onClose }) => {
  if (!commit) return null;

  const {
    branch,
    revision,
    metric,
    timestamp,
    scale,
    commit_message
  } = commit;

  const commitUrl = api.getCommitUrl(revision);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-pg-blue text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h3 className="text-xl font-semibold">Commit Details</h3>
          <button 
            className="text-white hover:text-pg-orange-light transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-pg-blue font-semibold mb-3">Branch Information</h4>
              <p className="mb-2 flex items-start">
                <span className="text-gray-600 font-medium w-20">Branch:</span>
                <span className="text-gray-800 font-mono">{branch}</span>
              </p>
              <p className="mb-2 flex items-start">
                <span className="text-gray-600 font-medium w-20">Commit:</span>
                <a 
                  href={commitUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pg-blue hover:underline font-mono break-all"
                >
                  {revision}
                </a>
              </p>
              <p className="mb-2 flex items-start">
                <span className="text-gray-600 font-medium w-20">Date:</span>
                <span className="text-gray-800">{timestamp}</span>
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-pg-blue font-semibold mb-3">Performance Data</h4>
              <p className="mb-2 flex items-center">
                <span className="text-gray-600 font-medium w-28">Metric Value:</span>
                <span className="text-gray-800 font-semibold font-mono">{metric.toLocaleString()}</span>
              </p>
              <p className="mb-2 flex items-center">
                <span className="text-gray-600 font-medium w-28">Scale:</span>
                <span className="text-gray-800">{scale}</span>
              </p>
            </div>
          </div>
          
          {commit_message && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-pg-blue font-semibold mb-3">Commit Message</h4>
              <p className="text-gray-800 whitespace-pre-line">{commit_message}</p>
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between items-center border-t border-gray-200">
          <a 
            href={commitUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-outline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View on GitHub
          </a>
          <button 
            className="btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommitDetailsModal; 