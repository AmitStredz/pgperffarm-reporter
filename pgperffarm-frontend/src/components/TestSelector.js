import React from 'react';

const TestSelector = ({ tests, selectedTest, onChange }) => {
  return (
    <div className="mb-4 min-w-[200px]">
      <label htmlFor="test-select" className="form-label">Select Test:</label>
      <select 
        id="test-select" 
        value={selectedTest} 
        onChange={(e) => onChange(e.target.value)}
        className="select-input"
      >
        <option value="">-- Select a Test --</option>
        {tests.map(test => (
          <option key={test.id} value={test.id}>
            {test.name} ({test.description})
          </option>
        ))}
      </select>
    </div>
  );
};

export default TestSelector; 