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
          <label class="lable-text">Simply describe your needs in your own words, and we'll create customized reports for you as requested</label>
          <div class="text-box-wrapper">
          <textarea class="text-area" placeholder="Start writing your requirements..." 
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}></textarea>
          <button type="submit" class="right-arrow-btn">&#9654;</button>
          </div>
        </div>
      </form>
      <div className="d-flex justify-content-center mb-4">
      <div className="button-seperator">
      <button id="btn_preview" class="preview-button" onClick={onPreview}>
       <i class="icon">👁️</i> Preview
       </button>
       </div>
       <div className="button-seperator">
        <button id="btn_pdf" class="export-button"  onClick={onExportPDF}>
        <i class="icon">📄</i> Export to PDF
        </button>
        </div>
        <div className="button-seperator">
        <button id="btn_xls" class="export-button excel-button"  onClick={onExportExcel}>
        <i class="icon">📊</i> Export to Excel
        </button>
        </div>
      </div>
    </div>
  );
};

export default UserInputForm;
