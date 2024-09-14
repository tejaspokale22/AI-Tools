import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Text from "./Text";
import Image from "./Image";

function NavBar() {
  const location = useLocation();
  
  return (
    <nav className="bg-gray-900 p-3 shadow-lg font-['Poppins']">
      <div className="container flex justify-center mx-auto">
        <div className="relative flex items-center space-x-10">
          <Link
            to="/"
            className={`text-gray-300 hover:text-white transition-colors duration-300 relative text-md ${
              location.pathname === "/" ? "text-white border-b-2 border-white text-lg" : ""
            }`}
          >
            Text
          </Link>
          <Link
            to="/image"
            className={`text-gray-300 hover:text-white transition-colors duration-300 relative text-md ${
              location.pathname === "/image" ? "text-white border-b-2 border-white text-lg" : ""
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
      <div className="mx-auto">
        <Routes>
          <Route path="/" element={<Text />} />
          <Route path="/image" element={<Image />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
