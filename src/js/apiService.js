export default {
  fetchPictures: function (searchQuery, page) {
    const apiKey = "19421734-bf7a181eb9207294daffefae5";
    const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${apiKey}`;
    return fetch(BASE_URL).then((response) => {
      return response.json();
    });
  },
};
