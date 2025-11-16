import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'loaders.css/loaders.min.css';

const galleryLightbox = new SimpleLightbox('.gallery a');

const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

export function createGallery(images) {
  const gallery = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="gallery-card-wrapper"><a class="gallery-item" href="${largeImageURL}"><img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360"/><ul class="gallery-item-info">
  <li class="info-item">Likes </br> <span>${likes}</span></li>
  <li class="info-item">Views </br><span>${views}</span></li>
  <li class="info-item">Comments </br><span>${comments}</span></li>
  <li class="info-item">Downloads </br><span>${downloads}</span></li>
</ul></a></div>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', gallery);
  galleryLightbox.refresh();
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function showLoader() {
  refs.loader.classList.add('is-visible');
}

export function hideLoader() {
  refs.loader.classList.remove('is-visible');
}
