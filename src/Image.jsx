import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

function Image() {
  const [text, setText] = useState('');
  const [imageBlob, setImageBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const accessToken = import.meta.env.VITE_HUGGINGFACE_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageBlob(null);

    const data = { inputs: text };

    try {
      const result = await query(data);
      if (result) {
        const image = URL.createObjectURL(result);
        setImageBlob(image);
      } else {
        console.error('No image data received.');
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  async function query(data) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.blob();
      return result;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 mt-6">
      <h1 className="text-center text-4xl font-bold mb-6 text-gray-800">Image AI</h1>
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
      
      {text && imageBlob && (
        <div className="mt-6 p-4 w-full max-w-6xl bg-gray-200 rounded-lg overflow-hidden">
          <img src={imageBlob} alt="Generated" className="mx-auto w-full object-contain" />
        </div>
      )}
    </div>
  );
}

export default Image;
