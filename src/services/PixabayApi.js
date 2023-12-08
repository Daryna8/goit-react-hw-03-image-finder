import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export const fetchPhotosByQuery = async configParams => {
  const { data } = await axios.get('/api/', {
    params: {
      key: '40690513-b077cfa16de2d7f38a98e7259',
      per_page: 12,
      ...configParams,
    },
  });
  if (data.totalHits === 0) {
    throw new Error(`Not found image for the query "${configParams.q}"`);
  }
  return data;
};
