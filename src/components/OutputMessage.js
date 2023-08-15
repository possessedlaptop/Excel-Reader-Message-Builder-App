import React from 'react';

const OutputMessage = ({ outputMessage, copied, handleCopyToClipboard, outputRef }) => {
  return (
    <div>
      <textarea
        ref={outputRef}
        value={outputMessage}
        readOnly
        placeholder="Your output will appear here..."
        className="w-full p-2 border border-gray-300 rounded mt-4"
      ></textarea>
      <button
        onClick={handleCopyToClipboard}
        className={`${copied ? 'bg-green-500' : 'bg-purple-600'} text-white rounded px-4 py-2 mt-4 ml-2`}
      >
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
};

export default OutputMessage;
