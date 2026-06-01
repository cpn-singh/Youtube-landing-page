import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import PlayingVideo from "./components/PlayingVideo";
import Search from "./components/Search";
import Sidebar2 from "./components/Sidebar2";
import Loader from "./loader/Loader";
import { useAuth } from "./context/AuthProvider";

function App() {
  const { loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Global Sidebar */}
        <div
          className={`
            fixed
            top-14
            left-0
            z-40
            h-[calc(100vh-3.5rem)]
            bg-white
            border-r border-gray-100
            transition-all
            duration-300
            overflow-hidden
            ${sidebarOpen ? "w-20" : "w-0"}
          `}
        >
          <Sidebar2 />
        </div>

        {/* Main Content */}
        <div
          className={`
            flex-1
            overflow-y-auto
            bg-white
            transition-all
            duration-300
            ${sidebarOpen ? "ml-20" : "ml-0"}
          `}
        >
          <Routes>
            <Route path="/" element={<Home sidebarOpen={sidebarOpen} />} />
            <Route
              path="/search/:searchQuery"
              element={<Search />}
            />
            <Route
              path="/video/:id"
              element={<PlayingVideo />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;