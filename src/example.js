import axios from 'axios';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import 'simplelightbox/dist/simple-lightbox.min.css';
export class RequestOnColechtion {
  #URL = 'https://pixabay.com/api/';
  #KEY = '40816428-8ff543c0077c3bf6c3247c305';
  #page = 1;
  #params = new URLSearchParams({
    key: `${this.#KEY}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  });

  constructor() {
    // Зберігаємо створений екземпляр SimpleLightbox
    this.lightbox = new SimpleLightbox('.gallery a');
  }

  updateLightbox() {
    this.lightbox.refresh();
  }

  // simple() {
  //   return new SimpleLightbox('.gallery a');
  // }

  // updateLightbox() {
  //   this.simple().refresh();
  // }

  async requestColechtion(value) {
    const url = `${this.#URL}?${this.#params}&q=${value}&page=${this.#page}`;
    try {
      const { data } = await axios(url);
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }
  async requestNextColechtion(value) {
    const url = `${this.#URL}?${this.#params}&q=${value}&page=${this.#page}`;
    try {
      const { data } = await axios(url);
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }
  set page(newPage) {
    this.#page = newPage;
  }
}