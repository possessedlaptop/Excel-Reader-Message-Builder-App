// ExcelUploader.js
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUploader = ({ onDataLoaded }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        onDataLoaded(jsonData);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-gradient-to-br from-indigo-500 to-purple-600">
      <label htmlFor="fileInput" className="block mb-2 font-medium text-white">
        Upload Excel File (.xlsx):
      </label>
      <input
        type="file"
        id="fileInput"
        accept=".xlsx"
        className="w-full px-4 py-2 text-sm text-white bg-transparent border-2 border-white rounded-md focus:outline-none focus:ring focus:ring-white"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ExcelUploader;
