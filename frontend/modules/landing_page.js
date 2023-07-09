import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {

  try {
    return await fetch("http://3.111.181.230:8082/cities")
    .then(data => data.json());
    // .then(post => console.log(post));
  }
  catch(error){
    return null;
  }
  
  
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  let data = document.getElementById("data");
  let div = document.createElement("div");
  // div.id = id;
  div.className = "col-sm-6 col-lg-3 mb-4";
  div.innerHTML = `<a href="pages/adventures/?city=${id}" id="${id}">
  <div class="tile">
    <img
      src="${image}"
      alt="Image not available"
    />
    <div class="tile-text">
      <b>${city}</b>
      <p style="font-size: 14px">${description}</p>
    </div>
  </div>
</a>`
  data.append(div);




  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

}

export { init, fetchCities, addCityToDOM };
