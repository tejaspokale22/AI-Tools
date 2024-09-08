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

    <div className="min-h-screen flex flex-col items-center relative">
      <h1 className="text-center text-4xl font-bold mb-6 mt-6 text-black">Image AI</h1>
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
      <DotPattern className="absolute top-0 left-0 w-full h-full z-[-1] opacity-60 bg-gray-200" />
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-xl">
        <textarea
          ref={textareaRef}
          className="border border-gray-300 rounded-lg p-4 w-full focus:border-black border-3 shadow-lg"
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
          className="bg-blue-600 text-white p-3 rounded-lg w-full transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 max-w-xs text-lg"
          disabled={loading}
        >
          Generate
        </button>)
      }
      </form>
      {imageBlob && (
        <div className="mt-6 p-4 w-full max-w-6xl overflow-hidden">
          <img src={imageBlob} alt="Generated" className="mx-auto w-full h-full" />
        </div>
      )}
    </div>
    </>
  );
}

export default Image;
