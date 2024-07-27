// src/components/ReportDisplay.js
import React from 'react';

const ReportDisplay = ({ report, exportAsPDF, exportAsExcel }) => {
  return (
    <div className="mt-4 text-center">
      <h2>Report</h2>
      <p>{report}</p>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-info mr-2" onClick={() => alert('Previewing report...')}>
          Preview
        </button>
        <button className="btn btn-success mr-2" onClick={exportAsPDF}>
          Export as PDF
        </button>
        <button className="btn btn-warning" onClick={exportAsExcel}>
          Export in Excel
        </button>
      </div>
    </div>
  );
};

export default ReportDisplay;
