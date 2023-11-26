import { RequestOnColechtion } from './example';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const ref = {
  btnLoad: document.querySelector('.load-more'),
  divGallery: document.querySelector('.gallery'),
  divImgCard: document.querySelector('.photo-card'),
  formSerch: document.querySelector('.search-form'),
  api: new RequestOnColechtion(),
};

const { divGallery, formSerch, api, btnLoad, divImgCard } = ref;
let userValue = '';
let number = 1;
let totalImg = 0;
const simpLayt = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
});

formSerch.addEventListener('submit', e => {
  e.preventDefault();
  btnLoad.style.display = 'none';
  api.page = '1';
  number = 1;
  divGallery.innerHTML = '';
  userValue = e.target[0].value;
  if (!userValue) return Notify.warning('EThe field must not be empty');
  api.requestColechtion(userValue).then(data => {
    const arrBek = data.hits;
    const { totalHits } = data;
    Notify.success(`Hooray! We found ${totalHits} images.`);
    totalImg = arrBek.length;
    if (arrBek.length === 0)
      return Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    renderImg(arrBek);
    if (totalImg < 40) {
      btnLoad.style.display = 'none';
      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    btnLoad.style.display = 'block';
  });
  e.target[0].value = '';
});

btnLoad.addEventListener('click', () => {
  number += 1;
  api.page = number.toString();
  api.requestNextColechtion(userValue).then(data => {
    const { totalHits } = data;
    const arrBek = data.hits;
    totalImg += arrBek.length;
    if (arrBek.length === 0)
      return Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    renderImg(arrBek);
    simpLayt.refresh();
    if (totalImg === totalHits) {
      btnLoad.style.display = 'none';
      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
});

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
    galleryRender.push(`<div class="photo-card">
    
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
  </div>
</div>`);
  });
  divGallery.insertAdjacentHTML('beforeend', galleryRender);
  simpLayt;
}
