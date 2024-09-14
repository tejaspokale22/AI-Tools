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
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="mt-6 mb-6 text-4xl font-bold text-center text-gray-800">Text AI</h1>
      <DotPattern className="absolute top-0 left-0 w-full h-[400vh] z-[-1] opacity-80 bg-gray-200" />
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-xl gap-4">
        <textarea
          className="w-full p-4 rounded-lg shadow-lg focus:border-black border-3"
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
          className="w-full max-w-xs p-3 text-lg text-white transition-all duration-300 bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
          disabled={loading}
        >
          Generate
        </button>)
      }
       
      </form>
      {
        response && !loading && (
    <div className="w-full max-w-6xl p-4 mt-6 mb-6 text-white bg-gray-900 rounded-lg">
        <pre className="whitespace-pre-wrap">{response}</pre>
      </div>
        )
}
    </div>
  );
}

export default Text;
