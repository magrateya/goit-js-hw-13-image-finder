import './css/styles.css';
import itemTpl from './templates/items.hbs';
import DataApiService from './js/apiService';
import LoadMoreBtn from './js/load-more';

import '@pnotify/core/dist/PNotify.css';
import { error, info } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';


const refs = {
    searchForm: document.querySelector('.js-search-form'),
    galleryContainer: document.querySelector('.gallery'),
}
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const dataApiService = new DataApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
    e.preventDefault();

    dataApiService.query = e.currentTarget.elements.query.value;

    if (dataApiService.query === '') {
        return;
    }

    loadMoreBtn.show();
    dataApiService.restPage();
    clearGalleryContainer();

    fetchArticles();
    info({ text: "Запит успішний.", delay: 1000 });
}

function fetchArticles() {
    loadMoreBtn.disable();
    dataApiService.fetchData().then(hits => {
        if (hits.length === 0) {
            error({ text: "За вашим запитом нічого не знайдено, спробуйте ще.", delay: 2000 }); 
        }
        appendGalleryMarkup(hits);
        loadMoreBtn.enable();
        scrollDown();
    });
}

function appendGalleryMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', itemTpl(hits));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function scrollDown() {
    window.scrollBy({
        top: document.documentElement.clientHeight,
        behavior: 'smooth'
        });
}














