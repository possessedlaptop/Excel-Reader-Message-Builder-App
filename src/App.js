// App.js
import React, { useState } from 'react';
import ExcelUploader from './ExcelUploader';
import './App.css';

const App = () => {
  // State variables
  const [excelData, setExcelData] = useState([]); // Holds the loaded Excel data
  const [selectedCells, setSelectedCells] = useState([]); // Holds the selected cell values
  const [message, setMessage] = useState(''); // Holds the user input message
  const [outputMessage, setOutputMessage] = useState(''); // Holds the output message with replaced values

  // Function to handle data loaded from Excel file
  const handleDataLoaded = (data) => {
    setExcelData(data); // Update the state with the loaded data
  };

  // Function to handle cell selection
  const handleCellSelect = (rowIndex, columnIndex) => {
    const cellValue = excelData[rowIndex][columnIndex];
    if (!selectedCells.includes(cellValue)) {
      setSelectedCells([...selectedCells, cellValue]); // Add the selected cell value to the state
    }
  };

  // Function to generate the output message
  const handleGenerateOutput = () => {
    let output = message; // Copy the input message

    // Find all occurrences of '?' in the message and replace them with selected cell values
    selectedCells.forEach((data) => {
      output = output.replace('?', data);
    });

    setOutputMessage(output); // Update the state with the output message
  };

  // Function to clear the selected cells
  const handleClearSelection = () => {
    setSelectedCells([]); // Clear the selected cell values from the state
  };

  return (
    <div className="App">
      <div className="container">
        {/* Title with sloth icon */}
        <div className="title-container">
          {/* Your sloth icon */}
          <div className="sloth-icon">
            <img
              src="https://w7.pngwing.com/pngs/745/972/png-transparent-sleeping-sloth-sleep-rest-animal-relax-lazy-cute-nap-nature.png"
              alt="Sloth Icon"
            />
          </div>
          {/* Title */}
          <h1 className="title">Sloth Lazy Mail Builder</h1>
        </div>

        {/* Excel file uploader */}
        <ExcelUploader onDataLoaded={handleDataLoaded} />

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

        {/* Show selected cells */}
        <div className="selected-cells">
          {selectedCells.map((cell, index) => (
            <span key={index} className="selected-cell">
              {cell}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
