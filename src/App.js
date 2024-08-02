// src/App.js
import React, { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import Footer from './components/Footer';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Team from './components/Team';


const App = () => {
  const [report, setReport] = useState(null);
  var jsonData={};

  document.addEventListener('DOMContentLoaded', () => {
    const textbox =  document.getElementById('txt_input');
    const resetButton = document.getElementById('btn_reset');

    const btn_preview = document.getElementById('btn_preview');
    const btn_pdf = document.getElementById('btn_pdf');
    const btn_xls = document.getElementById('btn_xls');

    btn_preview.style.visibility='hidden';
    btn_pdf.style.visibility='hidden';
    btn_xls.style.visibility='hidden';

    const toggleResetButton = () => {
        if(textbox.value.trim() === '' && btn_preview.style.visibility=='hidden' && btn_pdf.style.visibility=='hidden' && btn_xls.style.visibility=='hidden'){
            resetButton.style.visibility='hidden'; 
          }
          else{
            resetButton.style.visibility='visible'; 
          }
    };

    toggleResetButton();
    textbox.addEventListener('input', toggleResetButton);
  });

  const generateReport = async (inputData) => {
      if(inputData.trim() === ''){
        const requirePopup = document.getElementById('requirePopup');
        requirePopup.style.display = 'block';
        const closeBtn = document.querySelector('.require-close-btn');
      
        closeBtn.addEventListener('click', () => {
          requirePopup.style.display = 'none';
        });
      
        window.addEventListener('click', (event) => {
          if (event.target === requirePopup) {
            requirePopup.style.display = 'none';
          }
        });
        jsonData={};
        const btn_preview = document.getElementById('btn_preview');
        const btn_pdf = document.getElementById('btn_pdf');
        const btn_xls = document.getElementById('btn_xls');

        btn_preview.style.visibility='hidden';
        btn_pdf.style.visibility='hidden';
        btn_xls.style.visibility='hidden';
      }
      else{
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
        const btn_preview = document.getElementById('btn_preview');
        const btn_pdf = document.getElementById('btn_pdf');
        const btn_xls = document.getElementById('btn_xls');
        btn_preview.style.visibility='visible';
        btn_pdf.style.visibility='visible';
        btn_xls.style.visibility='visible';
      })
      .catch(error => {
        const errorPopup = document.getElementById('errorPopup');
        const closeBtn = document.querySelector('.close-btn');
      
        closeBtn.addEventListener('click', () => {
          errorPopup.style.display = 'none';
        });
      
        window.addEventListener('click', (event) => {
          if (event.target === errorPopup) {
              errorPopup.style.display = 'none';
          }
        });
        jsonData={};
        const btn_preview = document.getElementById('btn_preview');
        const btn_pdf = document.getElementById('btn_pdf');
        const btn_xls = document.getElementById('btn_xls');

        btn_preview.style.visibility='hidden';
        btn_pdf.style.visibility='hidden';
        btn_xls.style.visibility='hidden';

        errorPopup.style.display = 'block';
        console.error('The details provided appear to be insufficient for generating the requested report. Please consider rephrasing your request.', error);
      });
    }
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

  const resetRequest = () => {
    const btn_preview = document.getElementById('btn_preview');
    const btn_pdf = document.getElementById('btn_pdf');
    const btn_xls = document.getElementById('btn_xls');
    const txt_input = document.getElementById('txt_input');
    const btn_reset = document.getElementById('btn_reset');
    btn_preview.style.visibility='hidden';
    btn_pdf.style.visibility='hidden';
    btn_xls.style.visibility='hidden';
    btn_reset.style.visibility='hidden'; 
    txt_input.value='';
    jsonData={};
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#AAD7D9' }}>
      <div class="top-strip">
            <h1 class="stylish-heading">ReportXpress</h1>
            <p class='sub-heading'>Intelligent Self Service Reporting Tool</p>
       </div>
      <div className="container text-center py-5">
        <UserInputForm
          onGenerate={generateReport}
          onReset={resetRequest}
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
      <div id="errorPopup" class="popup">
        <div class="popup-content">
            <span class="close-btn">&times;</span>
            <h4>Rephrase Your Requirement</h4>
            <p id="errorMessage">The details provided appear to be insufficient for generating the requested report. Please consider rephrasing your request!</p>
        </div>
       </div>

       <div id="requirePopup" class="popup">
        <div class="popup-content">
            <span class="require-close-btn">&times;</span>
            <h4>User Input Required</h4>
            <p id="errorMessage">Provide your requirements for generating the report</p>
        </div>
       </div>


      {/* <Router>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </Router> */}
      <Footer />
    </div>
  );
};

export default App;
