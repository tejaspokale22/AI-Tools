import React, { useState } from 'react';
import axios from 'axios';
import Loading from './Utils/Loading/Loading';
import { cn } from './lib/utils';
import DotPattern from './components/magicui/dot-pattern';

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
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCmEiSBwgBBd4jJ-6mEF_ARA7zlPE6lzQ8',
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

      let generatedText = result.data.candidates[0].content.parts[0].text;
      // Clean up the generated text
      generatedText = generatedText.replace(/[`*]/g, ''); // Remove backticks and asterisks
      setResponse(generatedText);
      setLoading(false);
    } catch (error) {
      console.error('Error generating content:', error);
      setResponse('An error occurred. Please try again.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="mt-6 mb-6 text-3xl font-bold text-center text-gray-800 sm:text-4xl">Text Generator AI</h1>
      <DotPattern className="absolute top-0 left-0 w-full h-[400vh] z-[-1] opacity-80 bg-gray-200" />
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-4 max-w-7xl">
        <textarea
          className="w-full p-3 text-base sm:text-lg rounded-lg shadow-lg focus:border-black border-3 resize-none 
          sm:resize sm:w-full md:w-[70%] lg:w-[60%] xl:w-[50%]"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a Prompt"
        ></textarea>
        {loading && (
          <div className="flex justify-center w-full mt-4">
            <Loading className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
        )}
        {!loading && (
          <button
            type="submit"
            className="w-full p-4 text-lg text-white transition-all duration-300 bg-gray-800 rounded-lg sm:w-auto hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
            disabled={loading}
          >
            Generate
          </button>
        )}
      </form>
      {response && !loading && (
        <div className="w-full max-w-4xl p-4 mt-6 mb-6 text-white bg-gray-900 rounded-lg sm:mt-8 sm:mb-8">
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </div>
  );
}

export default Text;
