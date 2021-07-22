import axios from 'axios';
import imagesTpl from '../templates/image';

export const fetchImages = ({ query, page, imagesPerPage }) => {
  const baseURL = 'https://pixabay.com/api/';
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

// export const renderImages = async (query, page, gallery) => {
//   gallery.innerHTML = imagesTpl(images);
// };

// export const renderMoreImages = async (query, page, gallery) => {
//   page += 1;
//   const imagesObject = await fetchImages({ query, page });
//   const images = await imagesObject.data.hits;
//   const newImages = await imagesTpl(images);
//   gallery.insertAdjacentHTML('beforeend', newImages);
// };
