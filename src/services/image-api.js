function fetchImages(image, pageNumber, pageSize) {
  const BASE_URL = `https://pixabay.com/api/`;
  const API_KEY = `23915751-8a3ca73cec67b4d724eaf6158`;
  // let pageNumber = 1;
  //   const pageSize = 12;

  return fetch(
    `${BASE_URL}?q=${image}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${pageSize}`,
  ).then(response => {
    if (response.ok) {
      console.log('response', response.ok);
      return response.json();
    }
    return Promise.reject(new Error(`Something wrong. Please try again`));
  });
}

const api = {
  fetchImages,
};
export default api;
