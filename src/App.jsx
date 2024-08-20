import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Text from "./Text";
import Image from "./Image";

function NavBar() {
  const location = useLocation();
  
  return (
    <nav className="bg-gray-800 p-4 shadow-lg font-['Poppins']">
      <div className="container mx-auto flex justify-center">
        <div className="space-x-10 flex items-center relative text-lg">
          <Link
            to="/"
            className={`text-gray-300 hover:text-white transition-colors duration-300 relative ${
              location.pathname === "/" ? "text-white border-b-2 border-white" : ""
            }`}
          >
            Text
          </Link>
          <Link
            to="/image"
            className={`text-gray-300 hover:text-white transition-colors duration-300 relative ${
              location.pathname === "/image" ? "text-white border-b-2 border-white" : ""
            }`}
          >
            Image
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mx-auto p-4 bg-gray-100">
        <Routes>
          <Route path="/" element={<Text />} />
          <Route path="/image" element={<Image />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
