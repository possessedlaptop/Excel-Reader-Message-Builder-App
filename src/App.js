import React, { useState, useRef } from 'react';
import ExcelUploader from './components/ExcelUploader';
import OutputMessage from './components/OutputMessage'; // Add this import
import SelectedCells from './components/SelectedCells'; // Add this import
import RecipientEmail from './components/RecipientEmail'; // Add this import
import EmailSubject from './components/EmailSubject'; // Add this import
import SlothIcon from './Sloth-icon.png'; // Import the Sloth-icon.png image from the src folder

const App = () => {
  // State variables
  const [excelData, setExcelData] = useState([]); // Holds the loaded Excel data
  const [selectedCells, setSelectedCells] = useState([]); // Holds the selected cell values
  const [message, setMessage] = useState(''); // Holds the user input message
  const [outputMessage, setOutputMessage] = useState(''); // Holds the output message with replaced values
  const [copied, setCopied] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState(''); // Holds the recipient email
  const [emailSubject, setEmailSubject] = useState(''); // Holds the email subject


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

  // Function to handle the reordering of selected cells
  const handleReorderCells = (startIndex, endIndex) => {
    if (startIndex === endIndex) {
      return;
    }

    const reorderedCells = Array.from(selectedCells);
    const [removedCell] = reorderedCells.splice(startIndex, 1);
    reorderedCells.splice(endIndex, 0, removedCell);

    setSelectedCells(reorderedCells);
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

  // Function to remove a variable from the preview list
  const handleRemoveVariable = (index) => {
    const updatedSelectedCells = [...selectedCells];
    updatedSelectedCells.splice(index, 1);
    setSelectedCells(updatedSelectedCells);
  };

  // Function to remove a column from the table
  /* const handleRemoveColumn = (columnIndex) => {
    if (!selectedCells.some((selectedCell) => selectedCell.column === columnIndex)) {
      setExcelData((prevData) => prevData.map((row) => row.filter((_, index) => index !== columnIndex)));
    } else {
      alert("Cannot delete a column with selected cells. Clear the selection first.");
    }
  }; */

  // Function to remove a row from the table
  const handleRemoveRow = (rowIndex) => {
    if (!selectedCells.some((selectedCell) => selectedCell.row === rowIndex)) {
      setExcelData((prevData) => prevData.filter((_, index) => index !== rowIndex));
    } else {
      alert("Cannot delete a row with selected cells. Clear the selection first.");
    }
  };

  const outputRef = useRef(null);

  // Function to handle copying to clipboard
  const handleCopyToClipboard = () => {
    if (outputMessage) {
      outputRef.current.select();
      document.execCommand('copy');
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1000); // Reset "Copied!" message after 1 second
    }
  };

  const generateMailToLink = () => {
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(outputMessage)}`;
    return mailtoLink;
  };

  return (
    <div className="bg-gradient-to-br from-sky-300 to-white min-h-screen flex justify-center items-center p-4">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg w-full">
        {/* Title with sloth icon */}
        <div className="title-container flex items-center mb-8">
          {/* Your sloth icon */}
          <div className="sloth-icon-container w-12 h-12 mr-2">
            <img src={SlothIcon} alt="Sloth Icon" /> {/* Use the imported Sloth-icon.png */}
          </div>
          {/* Title */}
          <h1 className="title text-2xl font-semibold text-purple-600">Sloth Lazy Mail Builder</h1>
        </div>

        {/* Excel file uploader */}
        <ExcelUploader onDataLoaded={handleDataLoaded} />

        {/* Margin between the table and the uploader */}
        <div className="mt-6">
          {/* Display the Excel data as a table */}
          <table className="w-full table-auto mb-6">
            <tbody>
              {excelData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {/* Button to remove the entire row */}
                  <td className="text-center p-1">
                    <button
                      onClick={() => handleRemoveRow(rowIndex)}
                      className="remove-row-button bg-red-500 text-white rounded px-2 py-1"
                    >
                      Remove
                    </button>
                  </td>
                  {row.map((cell, columnIndex) => (
                    <td
                      key={columnIndex}
                      onClick={() => handleCellSelect(rowIndex, columnIndex)}
                      className={`px-4 py-2 border border-gray-300 ${
                        selectedCells.some(
                          (selectedCell) =>
                            selectedCell.row === rowIndex && selectedCell.column === columnIndex
                        ) ? 'bg-yellow-200' : ''}`}
                      draggable // Enable dragging
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', rowIndex + ',' + columnIndex)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        const [startRowIndex] = e.dataTransfer.getData('text/plain').split(',');
                        const startIndex = parseInt(startRowIndex);
                        const endIndex = rowIndex;

                        if (startIndex === endIndex) {
                          return;
                        }

                        handleReorderCells(startIndex, endIndex);
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Input message textarea */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>

        {/* Button to generate the output */}
        <button
          onClick={handleGenerateOutput}
          className="bg-purple-600 text-white rounded px-4 py-2 mt-4 mr-2"
        >
          Generate Output
        </button>

        {/* Button to clear the selection */}
        <button
          onClick={handleClearSelection}
          className="bg-purple-600 text-white rounded px-4 py-2 mt-4"
        >
          Clear Selection
        </button>

        {/* Output message textarea and "Copy to Clipboard" button */}
        <OutputMessage
          outputMessage={outputMessage}
          copied={copied}
          handleCopyToClipboard={handleCopyToClipboard}
          outputRef={outputRef} // Pass the outputRef as a prop
        />

        {/* Hint for using '?' as variables */}
        <div className="hint text-gray-500 text-sm mt-2">
        Hint: Use '?' as variables in your message. For example:<br />
        Input message: Hello, ?<br />
        Expected output: Hello, John
        </div>

        {/* Show selected cells */}
        <SelectedCells
          selectedCells={selectedCells}
          excelData={excelData}
          handleRemoveVariable={handleRemoveVariable}
          handleReorderCells={handleReorderCells}
        />

        {/* Recipient's email input */}
        <RecipientEmail
          recipientEmail={recipientEmail}
          setRecipientEmail={setRecipientEmail}
        />

        {/* Email subject input */}
        <EmailSubject
          emailSubject={emailSubject}
          setEmailSubject={setEmailSubject}
          generateMailToLink={generateMailToLink}
        />

      </div>
    </div>
  );

};

export default App;
