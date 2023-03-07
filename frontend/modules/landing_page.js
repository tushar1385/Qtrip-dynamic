import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let cityData = []
  try {
    const url=config.backendEndpoint + "/cities";
    let res = await fetch(url);
    cityData = await res.json();
    // console.log(cityData)
  } catch (error) {
    return null;
  }
    return cityData;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cityElement = document.querySelector("#data");
  const divCol = document.createElement("div");
  divCol.setAttribute("class","col-6 col-sm-3 mb-4");
  // divCol.setAttribute("id",id);
  const colData = `
    <a href="pages/adventures/?city=${id}" id="${id}">
    <div class="tile">
    <img src="${image}">
    <div class="tile-text text-center">
    <h5>${city}</h5>
    <p>${description}</p>
    </div>
    </div>
    </a>
  `;

  divCol.innerHTML = colData;
  cityElement.appendChild(divCol); 
    
}

export { init, fetchCities, addCityToDOM };
