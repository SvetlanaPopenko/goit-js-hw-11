import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallary: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();
}

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31629453 - 3aa42bb9ff6dc8c3c3e379cd8';

function fetchPhotoApi(searchQuery) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

fetchPhotoApi();

// const options = {
//     headers:{
//         Authorization: 1236,
//     }
// }
