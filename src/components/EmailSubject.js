import React from 'react';

const EmailSubject = ({ emailSubject, setEmailSubject, generateMailToLink }) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">Email Subject</label>
      <input
        type="text"
        value={emailSubject}
        onChange={(e) => setEmailSubject(e.target.value)}
        className="mt-1 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
      />
      <a
        href={generateMailToLink()}
        className="bg-blue-600 text-white rounded px-4 py-2 mt-4 ml-2 inline-block"
      >
        Send Email
      </a>
    </div>
  );
};

export default EmailSubject;
