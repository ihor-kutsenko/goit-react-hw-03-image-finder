import axios from 'axios';

const fetchImages = async (query, page) => {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '37204496-df431910de8bd473c8d385424';
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });

  const { data } = await axios.get(`${BASE_URL}/?${searchParams}`);
  return data;
};

export default fetchImages;
