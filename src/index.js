import { RequestOnColechtion } from './example';
import { Notify } from 'notiflix';

const divGallery = document.querySelector('.gallery');
const formSerch = document.querySelector('.search-form');
const api = new RequestOnColechtion();

formSerch.addEventListener('submit', e => {
  e.preventDefault();
  const userValue = e.target[0].value;
  if (!userValue) return Notify.warning('EThe field must not be empty');
  api.requestColechtion(userValue).then(data => {
    const arrBek = data.hits;
    if (arrBek.length === 0)
      return Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    renderImg(arrBek);
  });
  e.target[0].value = '';
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
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes${likes}</b>
    </p>
    <p class="info-item">
      <b>Views${views}</b>
    </p>
    <p class="info-item">
      <b>Comments${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
    </p>
  </div>
</div>`);
  });
  divGallery.innerHTML = galleryRender;
}
