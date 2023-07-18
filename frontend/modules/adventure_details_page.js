import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // Place holder for functionality to work in the Stubs
  return search.split("=")[1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  // console.log(typeof(adventureId));
  try {
    return await fetch(config.backendEndpoint +"/adventures/detail/?adventure=" + adventureId)
      .then(data => data.json());
  } catch (error) {
      return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure);
  let name = document.getElementById("adventure-name");
  name.textContent = adventure.name;

  let subtitle = document.getElementById("adventure-subtitle");
  subtitle.textContent = adventure.subtitle;

  let imgGallery = document.getElementById("photo-gallery");
  for(let i=0;i<adventure.images.length;i++){
    let img = document.createElement("img");
    img.setAttribute("src", adventure.images[i]);
    img.setAttribute("alt", "Image not available");
    img.className = "activity-card-image";
    imgGallery.appendChild(img);
  }

  let content = document.getElementById("adventure-content");
  content.textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let imgGallery = document.getElementById("photo-gallery");

  let carouselMainDiv = document.createElement("div");
  carouselMainDiv.className = "carousel slide";
  carouselMainDiv.id = "carousel-indicators-id";
  carouselMainDiv.setAttribute("data-bs-ride", "carousel");

  let carouselButtonDiv = document.createElement("div");
  carouselButtonDiv.className = "carousel-indicators";
  for(let i=0;i<images.length;i++){
    let button = document.createElement("button");
    button.type = "button";
    button.setAttribute("data-bs-target", "#carousel-indicators-id");
    button.setAttribute("data-bs-slide-to", i.toString());
    if(i===0){
      button.className = "active";
    }
    carouselButtonDiv.append(button);
  }

  let carouselInnerDiv = document.createElement("div");
  carouselInnerDiv.className = "carousel-inner";
  for(let i=0;i<images.length;i++){
    let div = document.createElement("div");
    if(i===0){
      div.className = "carousel-item active";
    }
    else{
      div.className = "carousel-item";
    }
    let img = document.createElement("img");
    img.setAttribute("src", images[i]);
    img.setAttribute("alt", "Image not available");
    img.className = "activity-card-image";
    div.append(img);
    carouselInnerDiv.append(div);    
  }

  let nextButton = document.createElement("button");
  nextButton.className = "carousel-control-next";
  nextButton.type = "button";
  nextButton.setAttribute("data-bs-target", "#carousel-indicators-id");
  nextButton.setAttribute("data-bs-slide", "next");
  nextButton.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>`;

  let prevButton = document.createElement("button");
  prevButton.className = "carousel-control-prev";
  prevButton.type = "button";
  prevButton.setAttribute("data-bs-target", "#carousel-indicators-id");
  prevButton.setAttribute("data-bs-slide", "prev");
  prevButton.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>`;
  carouselMainDiv.append(carouselButtonDiv);
  carouselMainDiv.append(carouselInnerDiv);
  carouselMainDiv.append(prevButton);
  carouselMainDiv.append(nextButton);
  imgGallery.innerHTML = ``;
  imgGallery.append(carouselMainDiv);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOut = document.getElementById("reservation-panel-sold-out");
  let avails = document.getElementById("reservation-panel-available");
  // console.log(adventure);
  if(adventure.available === true){
    soldOut.style.display = "none";
    avails.style.display = "block";
    let costPerHead = document.getElementById("reservation-person-cost");
    costPerHead.innerHTML = `${adventure.costPerHead}`;
    
  }
  else{
    soldOut.style.display = "block";
    avails.style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // console.log(persons);
  let total = document.getElementById("reservation-cost");
  total.innerHTML = `${adventure.costPerHead * persons}`;
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async(event) =>{
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";
    let formElement = form.elements;
    let bodyString = JSON.stringify({
      name: formElement["name"].value,
      date: formElement["date"].value,
      person: formElement["person"].value,
      adventure: adventure.id,
    });
    try {
      let res = await fetch(url, {
        method: "POST",
        body: bodyString,
        headers: {
          "Content-Type" : "application/json",
        },
      });
      if(res.ok){
        alert("Success!");
        window.location.reload();
      }
      else{
        let data = await res.json();
        alert(`Failed - ${data.message}`)
      }
    } catch (error) {
      console.log(error);
      alert("Failed - fetch call resulted in error.");
    }
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  // console.log(adventure);
  let reservedBanner = document.getElementById("reserved-banner");
  if(adventure.reserved){
    reservedBanner.style.display = "block";
  }
  else{
    reservedBanner.style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
