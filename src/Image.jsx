import React, { useState, useEffect, useRef } from 'react';
import Loading from './Utils/Loading/Loading';
// import GridPattern from './components/magicui/grid-pattern';
import { cn } from './lib/utils';
import DotPattern from './components/magicui/dot-pattern';
// import AnimatedGridPattern from './components/magicui/animated-grid-pattern';



function Image() {
  const [text, setText] = useState('');
  const [imageBlob, setImageBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const accessToken = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  const textareaRef = useRef(null);

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
        setLoading(false);
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

  useEffect(() => {
    // alert("running");
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    };
  

    const textarea = textareaRef.current;
    textarea.addEventListener('keydown', handleKeyDown);

    return () => {
      textarea.removeEventListener('keydown', handleKeyDown);
    };
  }, [text]);

  return (
    <>

    <div className="relative flex flex-col items-center min-h-screen">
      <h1 className="mt-6 mb-6 text-4xl font-bold text-center text-black">Image AI</h1>
      {/* <AnimatedGridPattern
        numSquares={50} // Increased number of squares
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "absolute inset-0 h-full z-[-1] w-full", // Occupy viewport width and height, set z-index
          "skew-y-12"
        )}
      /> */}
      <DotPattern className="absolute top-0 left-0 w-full h-full z-[-1] opacity-80 bg-gray-200" />
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-xl gap-4">
        <textarea
          ref={textareaRef}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-lg focus:border-black border-3"
          cols="60"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a Prompt"
        ></textarea>
      {
        loading  
        ? (<Loading />)
        :( <button 
          type="submit"
          className="w-full max-w-xs p-3 text-lg text-white transition-all duration-300 bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
          disabled={loading}
        >
          Generate
        </button>)
      }
      </form>
      {imageBlob && (
        <div className="w-full max-w-6xl p-4 mt-6 overflow-hidden">
          <img src={imageBlob} alt="Generated" className="w-full h-full mx-auto" />
        </div>
      )}
    </div>
    </>
  );
}

export default Image;
