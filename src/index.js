import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallary: document.querySelector('.gallery'),
}

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(evt) {
    evt.preventDefault();

}

const options = {
    headers:{
Authorization:
    }
}