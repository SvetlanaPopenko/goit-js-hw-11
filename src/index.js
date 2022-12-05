import './css/styles.css';

import { createMarkup } from './modules.js/markup';
import { PER_PAGE, fetchPhotoApi } from './modules.js/fetch';
import { simpleGallery } from './modules.js/simplelightbox';
import { refs } from './modules.js/refs';

import {
  notifyFailure,
  notifySuccess,
  notifyInfoSearch,
} from './modules.js/notify';

let searchQuery = '';
let page = 1;
let totalHits = '';

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(evt) {
  evt.preventDefault();
  page = 1;
  observer.unobserve(refs.guard);
  searchQuery = evt.currentTarget.searchQuery.value.trim();
  refs.gallery.innerHTML = '';
  evt.currentTarget.reset();

  if (!searchQuery) {
    refs.gallery.innerHTML = '';
    notifyInfoSearch();
    return;
  }

  await fetchPhotoApi(searchQuery, page)
    .then(gallery => {
      totalHits = gallery.data.totalHits;

      if (!totalHits) {
        return notifyFailure();
      }
      notifySuccess(totalHits);
      addMarkup(gallery.data.hits);
      simpleGallery.refresh();

      observer.observe(refs.guard);
    })
    .catch(error => console.log(error));
}

function addMarkup(arr) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(arr));
}

const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(onLoad, options);

async function onLoad(entries, observer) {
  await entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;

      fetchPhotoApi(searchQuery, page)
        .then(gallery => {
          addMarkup(gallery.data.hits);
          simpleGallery.refresh();

          const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();

          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        })
        .catch(error => {
          console.log(error);
        });
      if (page === Math.round(totalHits / PER_PAGE)) {
        observer.unobserve(refs.guard);
        page = 1;
      }
    }
  });
}
