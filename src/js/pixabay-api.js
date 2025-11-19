import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '53264835-3cab029ef424b81cbc621d12a';
const BASE_URL = 'https://pixabay.com/api/';
export const perPage = 15;

export const getImagesByQuery = async (query, page = 1) => {
  if (!query || query.trim() === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Enter your search term',
      position: 'topRight',
    });
    return null;
  }

  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Axios error: ${error.message}`,
      position: 'topRight',
    });
    console.error('Axios error: ', error);
    throw error;
  }
};
