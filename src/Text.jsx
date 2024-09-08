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

      let generatedText = result.data.candidates[0].content.parts[0].text;
      // Clean up the generated text
      generatedText = generatedText.replace(/[`*]/g, ''); // Remove backticks and asterisks
      // console.log(generatedText);
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
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-center text-4xl font-bold text-gray-800 mt-6 mb-6">Text AI</h1>
      <DotPattern className="absolute top-0 left-0 w-full h-[400vh] z-[-1] opacity-60 bg-gray-200" />
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-xl">
        <textarea
          className="focus:border-black border-3 rounded-lg p-4 w-full shadow-lg"
          cols="60"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown} // Add this line
          placeholder="Enter a Prompt"
        ></textarea>
       {
        loading  
        ? (<Loading mt={10}/>)
        :( <button 
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg w-full transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 max-w-xs text-lg"
          disabled={loading}
        >
          Generate
        </button>)
      }
       
      </form>
      {
        response && !loading && (
    <div className="mt-6 p-4 w-full max-w-6xl rounded-lg bg-gray-900 text-white mb-6">
        <pre className="whitespace-pre-wrap">{response}</pre>
      </div>
        )
}
    </div>
  );
}

export default Text;
