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
    const isCellSelected = selectedCells.some(
      (cell) => cell.row === rowIndex && cell.column === columnIndex
    );
  
    if (isCellSelected) {
      setSelectedCells(selectedCells.filter((cell) => !(cell.row === rowIndex && cell.column === columnIndex)));
    } else {
      setSelectedCells([...selectedCells, { row: rowIndex, column: columnIndex }]);
    }
  };
  
  

  // Function to generate the output message
  const handleGenerateOutput = () => {
    let output = message; // Copy the input message

    // Find all occurrences of '?' in the message and replace them with selected cell values
    selectedCells.forEach((data) => {
      const cellValue = excelData[data.row][data.column];
      output = output.replace('?', cellValue);
    });

    setOutputMessage(output); // Update the state with the output message
  };


  // Function to clear the selected cells
  const handleClearSelection = () => {
    setSelectedCells([]); // Clear the selected cell values from the state
  };

  // Function to handle variable drag
  const handleVariableDrag = (event, rowIndex, columnIndex) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ row: rowIndex, column: columnIndex }));
  };

  // Function to handle variable drop
  const handleVariableDrop = (event) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));
    const { row, column } = data;

    if (selectedCells.some((cell) => cell.row === row && cell.column === column)) {
      return; // Don't do anything if the cell is already in the selectedCells
    }

    setSelectedCells([...selectedCells, { row, column }]);
  };

  // Function to handle variable deselection
  const handleVariableDeselect = (rowIndex, columnIndex) => {
    setSelectedCells(selectedCells.filter((cell) => cell.row !== rowIndex || cell.column !== columnIndex));
  };

  // Function to remove a column from the table
  const handleRemoveColumn = (columnIndex) => {
    setExcelData((prevData) => prevData.map((row) => row.filter((cell, index) => index !== columnIndex)));
  };

  // Function to remove a row from the table
  const handleRemoveRow = (rowIndex) => {
    setExcelData((prevData) => prevData.filter((row, index) => index !== rowIndex));
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
                    className={selectedCells.some(
                      (selectedCell) =>
                        selectedCell.row === rowIndex && selectedCell.column === columnIndex
                    )
                      ? 'selected'
                      : ''}
                    draggable // Enable dragging
                    onDragStart={(e) => handleVariableDrag(e, rowIndex, columnIndex)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleVariableDrop}
                  >
                    {cell}
                    {selectedCells.some(
                      (selectedCell) =>
                        selectedCell.row === rowIndex && selectedCell.column === columnIndex
                    ) && (
                      <button onClick={() => handleVariableDeselect(rowIndex, columnIndex)}>
                        X
                      </button>
                    )}
                  </td>
                ))}
                {/* Button to remove the entire column */}
                <td>
                  <button onClick={() => handleRemoveColumn(rowIndex)}>Remove Column</button>
                </td>
              </tr>
            ))}
            {/* Button to remove the entire row */}
            <tr>
              <td>
                <button onClick={() => handleRemoveRow(excelData.length - 1)}>Remove Row</button>
              </td>
              {excelData[0]?.map((_, columnIndex) => (
                <td key={columnIndex}></td>
              ))}
            </tr>
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
          {selectedCells.map((cell) => (
            <div key={`${cell.row}-${cell.column}`} className="selected-cell">
              {/* Uncomment the next line if you want to display both the value and its position */}
              {/* Row {cell.row}, Column {cell.column}: {excelData[cell.row][cell.column]} */}
              
              {/* Display only the value of the selected cell*/}
              {excelData[cell.row][cell.column]}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default App;
