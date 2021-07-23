import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';

export const fetchImages = ({ query, page, imagesPerPage }) => {
  const params = {
    key: '21989340-5677ac132e2fa2f040ad0925d',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: imagesPerPage,
    page,
  };
  return axios(baseURL, { params });
};
