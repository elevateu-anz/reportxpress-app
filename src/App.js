// src/App.js
import React, { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import Footer from './components/Footer';
import jsPDF from 'jspdf';
import { utils, writeFile } from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [report, setReport] = useState(null);

  const generateReport = async (inputData) => {
    try {
      // Placeholder API endpoint
      const response = await fetch(' ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputData }),
      });

      if (response.ok) {
        const result = await response.json();
        setReport(result.report);
      } else {
        console.error('Error generating report:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const previewReport = () => {
    if (report) {
      alert(`Previewing report: ${report}`);
    } else {
      alert('Please generate a report first.');
    }
  };

  const exportAsPDF = () => {
    if (report) {
      const doc = new jsPDF();
      doc.text(report, 10, 10);
      doc.save('report.pdf');
    } else {
      alert('Please generate a report first.');
    }
  };

  const exportAsExcel = () => {
    if (report) {
      const worksheet = utils.json_to_sheet([{ Report: report }]);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      writeFile(workbook, 'report.xlsx');
    } else {
      alert('Please generate a report first.');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#AAD7D9' }}>
      <div className="container text-center py-5">
        <h1>ReportXpress</h1>
        <UserInputForm
          onGenerate={generateReport}
          onPreview={previewReport}
          onExportPDF={exportAsPDF}
          onExportExcel={exportAsExcel}
        />
        {report && (
          <div className="mt-4">
            <h2>Generated Report</h2>
            <p>{report}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
