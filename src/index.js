import './css/styles.css';
import itemTpl from './templates/items.hbs';
import DataApiService from './js/apiService';
import LoadMoreBtn from './js/load-more'


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
}

function fetchArticles() {
    loadMoreBtn.disable();
    dataApiService.fetchData().then(hits => {
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














