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

  const handleClearSelection = () => {
    setSelectedCells([]);
  };

  return (
    <div className="App">
      <div className="container App-container">
        <div className="title-container">
          {/* Your sloth icon */}
          <img
            src="https://w7.pngwing.com/pngs/745/972/png-transparent-sleeping-sloth-sleep-rest-animal-relax-lazy-cute-nap-nature.png"
            alt="Sloth Icon"
            className="sloth-icon"
          />

          {/* Title */}
          <h1 className="title">Sloth Lazy Mail Builder</h1>
        </div>

        <ExcelUploader onDataLoaded={handleDataLoaded} />

        <table>
          {/* Display the Excel data as a table */}
          {/* ... (rest of your code) ... */}
        </table>

        {/* Input message textarea */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
        ></textarea>

        {/* Button to generate the output */}
        <button onClick={handleGenerateOutput}>Generate Output</button>

        {/* Button to clear the selection */}
        <button onClick={handleClearSelection}>Clear Selection</button>

        {/* Output message textarea */}
        <textarea
          value={outputMessage}
          readOnly
          placeholder="Your output will appear here..."
        ></textarea>

        {/* Hint for using '?' as variables */}
        <div className="hint">Hint: Use '?' as variables in your message.</div>
      </div>
    </div>
  );
};

export default App;
