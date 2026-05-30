import Home from "./components/Home";
import Navbar from "./components/Navbar";
import PlayingVideo from "./components/PlayingVideo";
import Search from "./components/Search";
import {Routes, Route} from "react-router-dom";
import Loader from "./loader/Loader";
import { useAuth } from "./context/AuthProvider";

function App() {
  const {loading} = useAuth()
  if(loading){
    return (<Loader />)
  }
  return (
    <div className="">
      <Navbar />
      <div className="">
        <div className="flex-1 overflow-y-auto bg-gray-50 transition-all duration-200 ease-in-out">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/search/:searchQuery" element={<Search />} />
            <Route path="/video/:id" element={<PlayingVideo />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;