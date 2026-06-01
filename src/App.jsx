import Home from "./components/Home";
import Navbar from "./components/Navbar";
import PlayingVideo from "./components/PlayingVideo";
import Search from "./components/Search";
import { Routes, Route } from "react-router-dom";
import Loader from "./loader/Loader";
import { useAuth } from "./context/AuthProvider";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Persistent Top Navigation Bar */}
      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* If you add a Sidebar component later, it goes here! 
          <Sidebar /> 
        */}
        
        <div className="flex-1 overflow-y-auto bg-gray-50 transition-all duration-200 ease-in-out">
          <Routes>
            {/* Google API lists home videos. React Router v6 handles 'exact' automatically */}
            <Route path="/" element={<Home />} />
            
            {/* Matches your URL search utility: /search/coding */}
            <Route path="/search/:searchQuery" element={<Search />} />
            
            {/* Google Video IDs will pass perfectly straight into this route parameter */}
            <Route path="/video/:id" element={<PlayingVideo />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;