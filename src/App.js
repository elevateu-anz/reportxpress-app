// src/App.js
import React, { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import Footer from './components/Footer';
import jsPDF from 'jspdf';
import { utils, writeFile } from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable';


const App = () => {
  const [report, setReport] = useState(null);
  var jsonData={};

  const generateReport = async (inputData) => {
      console.log(inputData);
      const response = await fetch('https://elevatu.pythonanywhere.com/?input=' + inputData)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(text => {
        text = text.replace(/'/g, '"');
        jsonData = JSON.parse(text);
        previewReport(jsonData)
      })
      .catch(error => {
        console.error('There was a problem in generating report.', error);
      });
  };

  const previewReport = () => {
    const doc = new jsPDF();
    const columns = Object.keys(jsonData[0]).map(key => ({ header: key, dataKey: key }));
    const rows = jsonData.map(item => {
      const row = {};
      Object.keys(item).forEach(key => {
          row[key] = item[key];
      });
      return row;
    });
    autoTable(doc, {
      head: [columns.map(col => col.header)],
      body: rows,
      columns,
    });
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const popup = window.open(pdfUrl, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
    if (popup) {
        popup.document.write('<html><head><title>Report Preview</title></head><body>');
        popup.document.write('<iframe src="' + pdfUrl + '" frameborder="0" style="width:100%;height:100%;"></iframe>');
        popup.document.write('</body></html>');
        popup.document.close(); // Important for IE
    } else {
        alert('Popup blocked. Please allow popups for this site.');
    }
  };

  const formatDate = (date) => {
    return date.toISOString().replace(/[-:.T]/g, '_').split('_')[0] + '_' + date.toTimeString().split(' ')[0].replace(/:/g, '_');
  };
  const now = new Date();
  const formattedDate = formatDate(now);

  const exportAsPDF = () => {
    const doc = new jsPDF();
    //doc.text('Report', 10, 10);
    const columns = Object.keys(jsonData[0]).map(key => ({ header: key, dataKey: key }));
    const rows = jsonData.map(item => {
      const row = {};
      Object.keys(item).forEach(key => {
          row[key] = item[key];
      });
      return row;
    });
    autoTable(doc, {
      head: [columns.map(col => col.header)],
      body: rows,
      columns,
    });

    doc.save('report' + formattedDate + '.pdf');
  };

  const exportAsExcel = () => {
    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'report' + formattedDate + '.xlsx');
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
