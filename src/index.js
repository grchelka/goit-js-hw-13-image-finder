import "./css/styles.css";
import pictureCardTpl from "./templates/picture-card.handlebars";
import API from "./js/apiService.js";
const debounce = require("lodash.debounce");

const refs = {
  searchInput: document.querySelector(".js-search-input"),
  btnRequest: document.querySelector(".js-btn"),
  cardContainer: document.querySelector(".js-gallery"),
};

let page = 1;
let searchQuery = "";
refs.searchInput.addEventListener("input", debounce(onSearch, 500));

function onSearch(event) {
  searchQuery = event.target.value;
  if (searchQuery) {
    page = 1;
    API.fetchPictures(searchQuery, page)
      .then(renderResponse)
      .catch(onFetchError);
  } else {
    refs.cardContainer.innerHTML = "";
  }
}

refs.btnRequest.addEventListener("click", debounce(onLoadMore, 500));
function onLoadMore() {
  if (searchQuery) {
    page += 1;
    API.fetchPictures(searchQuery, page)
      .then(renderAdditionalResponse)
      .catch(onFetchError);
  } else {
    refs.cardContainer.innerHTML = "";
  }
}

function renderResponse(response) {
  refs.cardContainer.innerHTML = pictureCardTpl(response);
}

function renderAdditionalResponse(response) {
  refs.cardContainer.insertAdjacentHTML("beforeend", pictureCardTpl(response));
}

function onFetchError(error) {
  alert("Not found");
}
