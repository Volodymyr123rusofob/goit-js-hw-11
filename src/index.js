import { RequestOnColechtion } from './example';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
    renderImg(arrBek);
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

function renderImg(arr) {
  const galleryRender = [];
  arr.forEach(e => {
    const {
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
      largeImageURL,
    } = e;
    galleryRender.push(` <div class="photo-card">
    <a class="photo-card-lin" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div></div> `);
  });
  divGallery.insertAdjacentHTML('beforeend', galleryRender);
  lightbox.refresh();
}

function scrollBy() {
  number += 1;
  api.page = number.toString();
  api.requestNextColechtion(userValue).then(data => {
    const { totalHits } = data;
    const arrBek = data.hits;
    if (totalImg === totalHits) {
      listenerOff();
      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    renderImg(arrBek);
    totalImg += arrBek.length;
  });
}

function listenerOff() {
  window.removeEventListener('scroll', handleScroll);
}

function listenerOn() {
  window.addEventListener('scroll', handleScroll);
}
// !================================================================================================================
// formSerch.addEventListener('submit', e => {
//   e.preventDefault();
//   btnLoad.style.display = 'none';
//   api.page = '1';
//   number = 1;
//   divGallery.innerHTML = '';
//   userValue = e.target[0].value;

//   if (!userValue) return Notify.warning('EThe field must not be empty');

//   api.requestColechtion(userValue).then(data => {
//     const arrBek = data.hits;
//     const { totalHits } = data;
//     Notify.success(`Hooray! We found ${totalHits} images.`);
//     totalImg = arrBek.length;

//     if (arrBek.length === 0)
//       return Notify.info(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     renderImg(arrBek);
//     if (totalImg < 40) {
//       btnLoad.style.display = 'none';
//       return Notify.info(
//         "We're sorry, but you've reached the end of search results."
//       );
//     }
//     // scrollInf();
//     // btnLoad.style.display = 'block';
//   });
//   e.target[0].value = '';
// });

// $==========================================================================================
// btnLoad.addEventListener('click', () => {
//   number += 1;
//   api.page = number.toString();
//   api.requestNextColechtion(userValue).then(data => {
//     const { totalHits } = data;
//     const arrBek = data.hits;
//     totalImg += arrBek.length;
//     if (arrBek.length === 0)
//       return Notify.info(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     renderImg(arrBek);
//     if (totalImg === totalHits) {
//       btnLoad.style.display = 'none';
//       return Notify.info(
//         "We're sorry, but you've reached the end of search results."
//       );
//     }
//     scrollBy();
//   });
// });
// @================================================================================================================

// function scrollBy() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }
// !================================================================================================================
