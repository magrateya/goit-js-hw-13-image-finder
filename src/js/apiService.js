export default class DataApiService {
  constructor() {
    this.searchInput = '';
    this.page = 1;
  }

  async fetchData() {
    try {
      const BASE_URL = 'https://pixabay.com/api/';
      const API_KEY = '18994558-99c21eb2af8503bc6443a1f41';

      const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchInput}&page=${this.page}&per_page=12&key=${API_KEY}`;

      return await fetch(url)
        .then(responce => responce.json())
        .then(({ hits }) => {
          this.page += 1;
          return hits;
        });
    } catch (error) {
      console.log(error);
    }
  }

  restPage() {
    this.page = 1;
  }

  get query() {
    return this.searchInput;
  }

  set query(newQuery) {
    this.searchInput = newQuery;
  }
}
