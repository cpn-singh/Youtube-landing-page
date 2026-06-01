import { createContext, useState, useEffect, useContext } from "react";
import { fetchData } from "../utils/rapidapi";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("New");

  useEffect(() => {
    fetchAllData(value);
  }, [value]);

  const fetchAllData = async (query) => {
    setLoading(true);
    try {
      // Endpoint format required by the official Google endpoint
      const endpoint = `search?part=snippet&maxResults=24&q=${encodeURIComponent(query)}&type=video`;
      const response = await fetchData(endpoint);
      
      // 🔑 CRITICAL: Google stores the array in '.items', not '.contents'
      setData(response?.items || []);
    } catch (error) {
      console.error("Error fetching data from YouTube API:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loading, data, value, setValue }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
