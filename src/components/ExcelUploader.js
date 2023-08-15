// ExcelUploader.js
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUploader = ({ onDataLoaded }) => {
  // State to hold the selected file, !DONT CHANGE THE FILE CONST OR IT WONT HOLD IT CORRECTLY
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState(null);

  // Function to handle file selection change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Update the state with the selected file
    setFile(selectedFile);

    // Check if a file is selected
    if (selectedFile) {
      // Create a FileReader to read the contents of the file
      const reader = new FileReader();

      // Callback when the file is loaded
      reader.onload = (e) => {
        // Get the binary data from the result
        const data = new Uint8Array(e.target.result);

        // Parse the binary data as an Excel workbook
        const workbook = XLSX.read(data, { type: 'array' });

        // Get the name of the first sheet in the workbook
        const sheetName = workbook.SheetNames[0];

        // Get the worksheet by its name
        const worksheet = workbook.Sheets[sheetName];

        // Convert the worksheet data into a JSON format
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Pass the JSON data to the parent component via the onDataLoaded callback
        onDataLoaded(jsonData);
      };

      // Read the selected file as an ArrayBuffer
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  return (
    // Container with a gradient background for styling
    <div className="p-4 rounded-lg shadow-md bg-gradient-to-br from-indigo-500 to-purple-600">
      {/* Label for the file input */}
      <label htmlFor="fileInput" className="block mb-2 font-medium text-white">
        Upload Excel File (.xlsx):
      </label>

      {/* File input element */}
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
