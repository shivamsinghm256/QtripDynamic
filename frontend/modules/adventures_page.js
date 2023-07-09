
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  const obj = new URLSearchParams(search);
  // console.log(obj.get('city'));
  return obj.get('city');
  // TODO: MODULE_ADVENTURES 
  // 1. Extract the city id from the URL's Query Param and return it

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try {
    return await fetch("http://3.111.181.230:8082/adventures?city=" + city)
      .then(data => data.json());
  } catch (error) {
      return null;
  }
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // console.log(adventures);
  let data = document.getElementById("data");
  for(let i=0;i<adventures.length;i++){
    let div = document.createElement("div");
    div.className = "col-sm-6 col-lg-3 mb-4"; 
    div.innerHTML = `<a href="detail/?adventure=${adventures[i].id}" id = "${adventures[i].id}">
              <div class = "bg-warning" style="position: absolute; z-index: 1; padding: 5px; margin-left: 200px; margin-top: 20px; width: 70px; border-radius: 10px 0px 0px 10px;"><p>${adventures[i].category}</p></div>
              <div class=" card activity-card">
                <img
                  src="${adventures[i].image}"
                  alt="Image Not available"
                />
                <div class="card-body d-flex-column" style = "width: 100%">
                  <div class="d-flex justify-content-between" style = "width: 100%">
                    <div><p>${adventures[i].name}<p></div>
                    <div><p>${adventures[i].costPerHead}</p></div>
                  </div>
                  <div class="d-flex justify-content-between" style = "width: 100%">
                    <div><p>Duration</p></div>
                    <div><p>${adventures[i].duration} hours</p></div>
                  </div>
                </div>
              </div>
            </a>`;
    data.append(div);
  }
  
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log(list);
  list = list.filter((adv) => (adv.duration>=low && adv.duration<high));
  // console.log(list);
  return list;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {

  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  if(categoryList.length>0)
    list = list.filter((adv) => categoryList.includes(adv.category));
  // console.log(list);
  return list;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(list);
  let filteredList = [];
  if(filters.duration.length>0 && filters.category.length>0){
    let duList = filters.duration.split('-');
    filteredList = filterByDuration(list, parseInt(duList[0]), parseInt(duList[1]));
    filteredList = filterByCategory(filteredList, filters.category);
  }
  else if(filters.duration.length>0){
    let duList = filters.duration.split('-');
    filteredList = filterByDuration(list, parseInt(duList[0]), parseInt(duList[1]));
  }
  else{
    filteredList = filterByCategory(list, filters.category);
  }
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  console.log(filters);
  localStorage.setItem(filters, JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem("filters"));


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  var data = document.getElementById("category-list");
  for(let i=0;i<filters.category.length;i++){
    var tag = document.createElement("div");
    tag.className = "border border-warning rounded-pill ms-3 ps-2 pe-2";
    var text = document.createTextNode(filters.category[i]);
    tag.appendChild(text);
    data.appendChild(tag);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
