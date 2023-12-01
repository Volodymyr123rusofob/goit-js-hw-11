import { RequestOnColechtion } from './class';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renImg } from './function';

const ref = {
  divGallery: document.querySelector('.gallery'),
  formSerch: document.querySelector('.search-form'),
  api: new RequestOnColechtion(),
};

const { divGallery, formSerch, api } = ref;
const lightbox = new SimpleLightbox('.photo-card a');
let userValue = '';
let number = 1;
let totalImg = 0;

formSerch.addEventListener('submit', inicialRequestColechtio);

function handleScroll() {
  const lastElement = divGallery.lastElementChild;
  if (isElementInViewport(lastElement)) {
    scrollBy();
  }
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function inicialRequestColechtio(e) {
  e.preventDefault();
  api.page = '1';
  number = 1;
  divGallery.innerHTML = '';
  userValue = e.target[0].value;
  const queryValue = userValue.trim();
  if (!userValue || !queryValue)
    return Notify.warning('EThe field must not be empty');

  api.requestColechtion(userValue).then(data => {
    const arrBek = data.hits;
    const { totalHits } = data;
    totalImg = arrBek.length;

    if (arrBek.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    render(arrBek);
    Notify.success(`Hooray! We found ${totalHits} images.`);
    if (totalImg < 40) {
      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    listenerOn();
  });
  e.target[0].value = '';
}

function render(arr) {
  const oneElement = arr.map(el => renImg(el));
  const elemRend = oneElement.join('');
  divGallery.insertAdjacentHTML('beforeend', elemRend);
  lightbox.refresh();
}

function scrollBy() {
  number += 1;
  api.page = number.toString();
  api.requestNextColechtion(userValue).then(data => {
    const { totalHits } = data;
    const arrBek = data.hits;
    render(arrBek);
    totalImg += arrBek.length;
    if (totalImg === totalHits) {
      listenerOff();
      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

function listenerOff() {
  window.removeEventListener('scroll', handleScroll);
}

function listenerOn() {
  window.addEventListener('scroll', handleScroll);
}
