import React from 'react';

const RecipientEmail = ({ recipientEmail, setRecipientEmail }) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">Recipient's Email</label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="text"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="flex-1 block w-full min-w-0 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
        />
      </div>
    </div>
  );
};

export default RecipientEmail;
