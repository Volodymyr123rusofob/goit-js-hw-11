// !==================IMPORT====================
import { requestOnColechtion } from './partials/example';
// !==================IMPORT====================

// @==================LINK======================
const divGallery = document.querySelector('.gallery');
const formSerch = document.querySelector('.search-form');
// @==================LINK======================
// %========================================Const, function,....=====================================

// %========================================Const, function,....=====================================
// $================LISTENER==================
formSerch.addEventListener('submit', e => {
  e.preventDefault();
  const userValue = e.target[0].value;
  requestOnColechtion(userValue).then(data => {
    const arrBek = data.data.hits;
    const galleryRender = [];
    arrBek.forEach(e => {
      galleryRender.push(`<div class="photo-card">
  <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes${e.likes}</b>
    </p>
    <p class="info-item">
      <b>Views${e.views}</b>
    </p>
    <p class="info-item">
      <b>Comments${e.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${e.downloads}</b>
    </p>
  </div>
</div>`);
    });
    divGallery.innerHTML = galleryRender;
  });
});
// $================LISTENER==================
