import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';
// import '@fortawesome/fontawesome-free/js/brands';
// import '@fortawesome/fontawesome-free/js/regular';
import { Notify, Loading } from 'notiflix';
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
const imagesPerPage = 40;
let numberOfPages = 0;
let currentPage = 0;
let query = '';

window.onload = function () {
  document.body.style.paddingTop = getComputedStyle(refs.searchWrapper).height;
};

Notify.init({
  distance: '5%',
  fontSize: '15px',
  width: '350px',
  showOnlyTheLastOne: true,
});

refs.formSubmit.addEventListener('submit', searchImages);
refs.buttonLoadMore.addEventListener('click', laodMoreImages);

async function searchImages(e) {
  {
    e.preventDefault();

    refs.buttonLoadMore.style.display = 'none';

    page = 1;
    currentPage = 1;

    query = e.currentTarget.elements.searchQuery.value.trim();

    if (!query) {
      return;
    }

    try {
      const images = await fetchImages({ query, page, imagesPerPage });

      if (images.data.hits.length === 0) {
        Notify.info(
          'Sorry, there are no images matching your search query. Please try again.',
        );
        return;
      }

      numberOfPages = Math.ceil(images.data.totalHits / imagesPerPage);

      console.log('Number of pages: ', numberOfPages);
      console.log('Number of images: ', images.data.hits.length);

      refs.gallery.innerHTML = imagesTpl(images.data.hits);

      if (numberOfPages === 1) {
        Notify.success('These are all the photos that we found');
        console.log('These are all the photos that we found');
      }
    } catch (error) {
      console.log('Something wrong', error.message);
    }
  }

  if (numberOfPages > 1) {
    refs.buttonLoadMore.style.display = 'block';
  }
}

async function laodMoreImages(e) {
  e.preventDefault();

  // if (currentPage + 1 > numberOfPages) {
  //   alert('No more images');
  //   return;
  // }

  page += 1;
  currentPage += 1;

  if (!query) {
    return;
  }

  try {
    const images = await fetchImages({ query, page, imagesPerPage });
    gallery.insertAdjacentHTML('beforeend', imagesTpl(images.data.hits));
  } catch (error) {
    console.log('This is error', error.message);
  }

  if (currentPage === numberOfPages) {
    refs.buttonLoadMore.style.display = 'none';
    // Когда закончилась прокрутка страницы???
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
