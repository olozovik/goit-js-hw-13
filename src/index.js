import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';
// import '@fortawesome/fontawesome-free/js/brands';
// import '@fortawesome/fontawesome-free/js/regular';
import 'modern-normalize/modern-normalize.css';
import imagesTpl from './templates/image';
import './sass/main.scss';
import { fetchImages } from './js/getImages';

const refs = {
  searchWrapper: document.querySelector('.search-wrapper'),
  formSubmit: document.querySelector('#search-form'),
  // input: document.querySelector('#search-input'),
  // buttonSearch: document.querySelector('#search-button'),
  gallery: document.querySelector('#gallery'),
  buttonLoadMore: document.querySelector('#load-more'),
};

let page = 1;
let query = '';

window.onload = function () {
  document.body.style.paddingTop = getComputedStyle(refs.searchWrapper).height;
};

refs.formSubmit.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.currentTarget.elements.searchQuery.value.trim();
  if (!query) {
    return;
  }
  const images = await fetchImages({ query, page });
  if (images.data.hits.length === 0) {
    alert('There are no images');
    return;
  }
  refs.gallery.innerHTML = imagesTpl(images.data.hits);
  refs.buttonLoadMore.style.display = 'block';
});

refs.buttonLoadMore.addEventListener('click', async e => {
  e.preventDefault();
  page += 1;
  const images = await fetchImages({ query, page });
  gallery.insertAdjacentHTML('beforeend', imagesTpl(images.data.hits));
});
