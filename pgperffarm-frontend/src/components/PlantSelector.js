import React from 'react';

const PlantSelector = ({ plants, selectedPlant, onChange }) => {
  if (!plants || plants.length === 0) {
    return (
      <div className="mb-4 min-w-[200px]">
        <label htmlFor="plant-select" className="form-label">Select Plant:</label>
        <select id="plant-select" disabled className="select-input opacity-50 cursor-not-allowed">
          <option>No plants available</option>
        </select>
      </div>
    );
  }

  return (
    <div className="mb-4 min-w-[200px]">
      <label htmlFor="plant-select" className="form-label">Select Plant:</label>
      <select
        id="plant-select"
        value={selectedPlant}
        onChange={(e) => onChange(e.target.value)}
        className="select-input"
      >
        <option value="">-- Select a Plant --</option>
        {plants.map(plant => (
          <option key={plant.name} value={plant.name}>
            {plant.name} ({plant.host}) - Admin: {plant.admin}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlantSelector; 