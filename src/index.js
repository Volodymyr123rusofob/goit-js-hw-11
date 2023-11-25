import { RequestOnColechtion } from './example';
import { Notify } from 'notiflix';

const ref = {
  btnLoad: document.querySelector('.load-more'),
  divGallery: document.querySelector('.gallery'),
  formSerch: document.querySelector('.search-form'),
  api: new RequestOnColechtion(),
};

const { divGallery, formSerch, api, btnLoad } = ref;
let userValue = '';

formSerch.addEventListener('submit', e => {
  e.preventDefault();
  userValue = e.target[0].value;
  if (!userValue) return Notify.warning('EThe field must not be empty');
  api.requestColechtion(userValue).then(data => {
    const arrBek = data.hits;
    if (arrBek.length === 0)
      return Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    renderImg(arrBek);
    btnLoad.style.display = 'block';
  });

  e.target[0].value = '';
});

btnLoad.addEventListener('click', () => {
  console.log();
  api.page += 1;
  console.log(userValue);
  api.requestNextColechtion(userValue).then(data => {
    const arrBek = data.hits;
    if (arrBek.length === 0)
      return Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    renderImg(arrBek);
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
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
  divGallery.innerHTML = galleryRender;
}
// per_page - кількість фото на сторінці.
// page - кількість сторінок по per_page штук
