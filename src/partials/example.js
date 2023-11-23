import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const KEY = '40816428-8ff543c0077c3bf6c3247c305';

export async function requestOnColechtion(value) {
  try {
    return await axios.get(`${URL}`, {
      params: {
        key: `${KEY}`,
        q: `${value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
}
