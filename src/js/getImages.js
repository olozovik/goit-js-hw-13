import axios from 'axios';
import imagesTpl from '../templates/image';

export const fetchImages = async ({ query, page }) => {
  const baseURL = 'https://pixabay.com/api/';
  const params = {
    key: '21989340-5677ac132e2fa2f040ad0925d',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page,
  };

  try {
    const images = await axios(baseURL, { params });
    return images;
  } catch (error) {
    alert('We have some problem');
  }
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
