import { getImagesByQuery, perPage } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'loaders.css/loaders.min.css';

let query = '';
let page = 1;

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const moreBtn = document.querySelector('.moreBtn');

form.addEventListener('submit', onSearch);
if (moreBtn) moreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  hideLoadMoreButton();
  query = input.value.trim();
  page = 1;
  if (!query) return;

  clearGallery();
  showLoader();

  try {
    //Добавил задержку, чтобы было удобнее проверять
    await new Promise(resolve => setTimeout(resolve, 1000));
    const data = await getImagesByQuery(query, page);

    if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (page * perPage >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    // здесь тоже искусственная задержка
    await new Promise(resolve => setTimeout(resolve, 1000));

    const data = await getImagesByQuery(query, page);

    if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);

    smoothScrollAfterLoad();

    if (page * perPage >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while loading more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScrollAfterLoad() {
  const firstCard = document.querySelector('.gallery .gallery-card-wrapper');
  if (!firstCard) return;
  const { height: cardHeight } = firstCard.getBoundingClientRect();
  window.scrollBy({ top: cardHeight * 3, behavior: 'smooth' });
}
