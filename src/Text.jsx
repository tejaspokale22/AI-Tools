import React, { useState } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

function Text() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const result = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCv00emW9wjDEOxmihSO1TNtzyzS9I2KMc',
        method: 'post',
        data: {
          contents: [
            {
              parts: [{
                text: text
              }]
            }
          ]
        }
      });

      const generatedText = result.data.candidates[0].content.parts[0].text;
      setResponse(generatedText);
    } catch (error) {
      console.error('Error generating content:', error);
      setResponse('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 mt-6">
      <h1 className="text-center text-4xl font-bold mb-6 text-gray-800">Text AI</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-xl">
        <textarea
          className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
          cols="60"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a prompt"
        ></textarea>
        <button 
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg w-full max-w-sm font-semibold transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Generate"}
        </button>
      </form>
      {
        response &&  (

      <div className="mt-6 p-4 w-full max-w-6xl bg-gray-200 rounded-lg">
        <pre className="whitespace-pre-wrap text-gray-700">{response}</pre>
      </div>
        )
}
    </div>
  );
}

export default Text;
