import React from 'react';

const BranchSelector = ({ branches, selectedBranches, onChange }) => {
  const handleCheckboxChange = (branch) => {
    if (selectedBranches.includes(branch)) {
      // Remove branch if already selected
      onChange(selectedBranches.filter(b => b !== branch));
    } else {
      // Add branch if not selected
      onChange([...selectedBranches, branch]);
    }
  };

  if (!branches || branches.length === 0) {
    return (
      <div className="mb-4 min-w-[200px]">
        <label className="form-label">Select Branches:</label>
        <p className="text-gray-500 italic">No branches available</p>
      </div>
    );
  }

  return (
    <div className="mb-4 min-w-[200px]">
      <label className="form-label">Select Branches:</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {branches.map(branch => (
          <div key={branch} className="flex items-center mr-4">
            <input
              type="checkbox"
              id={`branch-${branch}`}
              checked={selectedBranches.includes(branch)}
              onChange={() => handleCheckboxChange(branch)}
              className="mr-2 h-4 w-4 rounded border-gray-300 text-pg-blue focus:ring-pg-blue"
            />
            <label htmlFor={`branch-${branch}`} className="text-sm font-medium text-gray-700">
              {branch}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchSelector; 