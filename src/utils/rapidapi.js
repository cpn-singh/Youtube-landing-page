import axios from "axios";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchData = async (url) => {
    try {
        const separator = url.includes('?') ? '&' : '?';
        const fullUrl = `${BASE_URL}/${url}${separator}key=${API_KEY}`;

        const { data } = await axios.get(fullUrl);
        return data;
    } catch (error) {
        console.error("Error fetching data from YouTube API:", error?.response?.data || error.message);
        throw error;
    }
}