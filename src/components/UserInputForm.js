// src/components/UserInputForm.js
import React, { useState } from 'react';

const UserInputForm = ({ onGenerate, onPreview, onExportPDF, onExportExcel }) => {
  const [inputData, setInputData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(inputData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="chat-box mb-4">
        <div className="form-group">
          <label>Share your inputs:</label>
          <textarea
            className="form-control"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            rows="6" // Increased size
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mb-2">
          Generate
        </button>
      </form>
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-info mr-2" onClick={onPreview}>
          Preview
        </button>
        <button className="btn btn-success mr-2" onClick={onExportPDF}>
          Export as PDF
        </button>
        <button className="btn btn-warning" onClick={onExportExcel}>
          Export in Excel
        </button>
      </div>
    </div>
  );
};

export default UserInputForm;
