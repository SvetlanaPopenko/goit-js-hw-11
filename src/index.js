import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31629453-3aa42bb9ff6dc8c3c3e379cd8';
const PER_PAGE = 40;

let searchQuery = '';
let page = 1;

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};

const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(onLoad, options);

// refs.searchForm.addEventListener('submit', onSearch);

// function onSearch(evt) {
//   evt.preventDefault();
//     searchQuery = evt.currentTarget.elements.value;

//   if (!searchQuery) {
//     return;
//     notifyInfo();
//   }

// }

function fetchPhotoApi(searchValue, page = 1) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchValue}&page=${page}&per_page=${PER_PAGE}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

fetchPhotoApi()
  .then(data => {
    refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    observer.observe(refs.guard);
  })
  .catch(error => console.error(error));

export function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a href="${largeImageURL}"><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div></a>`
    )
    .join('');
}

// function addMarkup(arr) {
//   refs.gallery.insertAdjacentHTML('beforeend', createMarkup(arr))
// }

function onLoad(entries, observer) {
 
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      fetchPhotoApi(page).then(data => {
        refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        if (data.page === data.pages) {
       observer.unobserve(refs.guard);
     }
      });
    }
  });
   console.log(entries);
}
