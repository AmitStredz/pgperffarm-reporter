import React from 'react';
import { format } from 'date-fns';

const DateRangePicker = ({ fromDate, toDate, onFromDateChange, onToDateChange }) => {
  // Format date for input
  const formatDateForInput = (date) => {
    if (!date) return '';
    return format(date, 'yyyy-MM-dd');
  };

  // Parse date from input
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr);
  };

  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-4">
      <div>
        <label htmlFor="from-date" className="form-label">From Date:</label>
        <input
          type="date"
          id="from-date"
          value={formatDateForInput(fromDate)}
          onChange={(e) => onFromDateChange(parseDate(e.target.value))}
          className="select-input"
        />
      </div>
      <div>
        <label htmlFor="to-date" className="form-label">To Date:</label>
        <input
          type="date"
          id="to-date"
          value={formatDateForInput(toDate)}
          onChange={(e) => onToDateChange(parseDate(e.target.value))}
          className="select-input"
        />
      </div>
    </div>
  );
};

export default DateRangePicker; 