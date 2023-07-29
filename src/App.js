// App.js
import React, { useState } from 'react';
import ExcelUploader from './ExcelUploader';
import './App.css';

const App = () => {
  const [excelData, setExcelData] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [message, setMessage] = useState('');
  const [outputMessage, setOutputMessage] = useState('');

  const handleDataLoaded = (data) => {
    setExcelData(data);
  };

  const handleCellSelect = (rowIndex, columnIndex) => {
    setSelectedCells([...selectedCells, excelData[rowIndex][columnIndex]]);
  };

  const handleGenerateOutput = () => {
    let output = message;
    selectedCells.forEach((data) => {
      output = output.replace('?', data);
    });
    setOutputMessage(output);
  };

  return (
    <div className="App">
      <ExcelUploader onDataLoaded={handleDataLoaded} />
      <div>
        {/* Display the Excel data as a table */}
        <table>
          <tbody>
            {excelData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <td
                    key={columnIndex}
                    onClick={() => handleCellSelect(rowIndex, columnIndex)}
                    className={selectedCells.includes(cell) ? 'selected' : ''}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Input message textarea */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
        ></textarea>

        {/* Button to generate the output */}
        <button onClick={handleGenerateOutput}>Generate Output</button>

        {/* Output message textarea */}
        <textarea value={outputMessage} readOnly></textarea>
      </div>
    </div>
  );
};

export default App;
