import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'loaders.css/loaders.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

form.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  const searchValue = input.value.trim();
  if (!searchValue) return;
  clearGallery();
  showLoader();

  try {
    //Добавил задержку, чтобы было удобнее проверять
    await new Promise(resolve => setTimeout(resolve, 1000));
    const images = await getImagesByQuery(searchValue);

    if (images.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(images.hits);
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
