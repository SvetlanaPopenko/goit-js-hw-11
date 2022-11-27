import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSearch);

let searchQuery = '';

function onSearch(evt) {
  evt.preventDefault();
  console.dir(evt.currentTarget.elements);
  searchQuery = evt.currentTarget.elements.value.trim();

  if (!searchQuery) {
    return;
    notifyInfo();
  }
  fetchPhotoApi(searchQuery).then(data => createMarkup(data.hits));
}

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31629453-3aa42bb9ff6dc8c3c3e379cd8';

function fetchPhotoApi(searchValue) {
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchValue}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .catch(error => console.error(error));
}

// const options = {
//     headers:{
//         Authorization: 1236,
//     }
// }

function createMarkup(arr) {
  const markup = arr
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
</div></a>`;
      }
    )
    .join('');

  refs.gallery.innerHTML = markup;
}
