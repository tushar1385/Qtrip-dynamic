import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
  let adventure = params.get('adventure');
  
  // Place holder for functionality to work in the Stubs
  return adventure;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const url = config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
  let adventureDetailData = []

  try{
    let res = await fetch(url);
    adventureDetailData = await res.json();
  }catch(error){
    return null;
  }
 
  // Place holder for functionality to work in the Stubs
  // console.log(Object.keys(adventureDetailData).length);
  return adventureDetailData;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const {name, subtitle, images, content} = adventure;

  const headingElement = document.querySelector("#adventure-name");
  headingElement.innerHTML = name;

  const subtitleElement = document.querySelector("#adventure-subtitle");
  subtitleElement.innerHTML = subtitle;

  const photoElement = document.querySelector("#photo-gallery");
  
  images.forEach((image) => {
    let photoDivElement = document.createElement("div");
    photoDivElement.innerHTML = `
      <img class="activity-card-image" src="${image}">
    `;
    
    photoElement.appendChild(photoDivElement);
  })

  const contentElement = document.querySelector("#adventure-content");
  contentElement.innerHTML = content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  const photoElement = document.querySelector("#photo-gallery");

  photoElement.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${images[0]}" class="d-block w-100 activity-card-image" alt="...">
    </div>
    <div id="image-insert"><div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;

  const imageInsertElement = document.querySelector("#image-insert");
  for(let i=1;i<images.length;i++){
    const divElement = document.createElement("div");
    divElement.setAttribute("class","carousel-item");
    divElement.innerHTML = `
      <img src="${images[i]}" class="d-block w-100 activity-card-image" alt="...">
    `;
    imageInsertElement.appendChild(divElement);
  }
  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  // let len = Object.keys(adventure).length;
  // console.log(adventure.available);

  
  if(adventure.available > 0){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.querySelector("#reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const cost = adventure.costPerHead;
  let totalCost = persons * cost;

  const updatedFinalCost = document.getElementById("reservation-cost");
  updatedFinalCost.innerHTML = totalCost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  document.getElementById("myForm").addEventListener("submit", async function(event){
    event.preventDefault();
    
    const formData = {
      name : document.getElementsByClassName("form-control").name.value,
      date : document.getElementsByClassName("form-control").date.value,
      person: document.getElementsByClassName("form-control").person.value,
      adventure : adventure.id
    };
    
    let response = await fetch(`${config.backendEndpoint}/reservations/new`,{
      method : 'POST',
      headers : {
        'content-type' : 'application/json',
      },
      body : JSON.stringify(formData),
    })
    let result = await response.json();
    if(result.success)
      alert("Success!");
    else
      alert("Failed");
  })
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
    document.getElementById("reserved-banner").style.display="block";
  else
    document.getElementById("reserved-banner").style.display="none";
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
