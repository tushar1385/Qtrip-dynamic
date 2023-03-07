import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  let city = params.get('city');
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let adventureData=[]
  try{
    let url = config.backendEndpoint + `/adventures/?city=${city}`;
    // console.log(url);
    let res = await fetch(url);
    adventureData = await res.json();
    // console.log(adventureData);
  }catch(error){
    return null;
  }
  
  return adventureData;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const adventureElement = document.querySelector("#data");
  adventures.forEach((adventure)=>{
    const {id,name,costPerHead,currency,image,duration,category}=adventure;
    // console.log(id,name,costPerHead,currency,image,duration,category);
    
    const divCol = document.createElement("div");
    divCol.setAttribute("class","col-6 col-sm-3 mb-3");
    const divColData = `
    <a href="detail/?adventure=${id}", id="${id}">
      <div class="activity-card">
      <div class="category-banner mx-0">${category}</div>
        <img src="${image}" >
          <div class="row p-2">
            <div class="col-md-6">${name}</div>
            <div class="col-md-6">&#8377;${costPerHead}</div>
            <div class="col-md-6">Duration</div>
            <div class="col-md-6">${duration} Hours</div>
        </div>
      </div>
    </a>   
    `
    divCol.innerHTML = divColData;
    adventureElement.appendChild(divCol);
  })
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const updatedList = list.filter((item)=>{
    return item.duration >low && item.duration <=high;
  })
  return updatedList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const updatedList = [];
  categoryList.forEach((categoryItem)=>{
    list.forEach((item)=>{
      if(categoryItem===item.category)
        updatedList.push(item);
    })
  })

  return updatedList;

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
  const {duration,category} = filters;
   
  let durationArray = duration.split("-");

  if(duration.length > 0 && category.length > 0){
    list = filterByDuration(list,durationArray[0],durationArray[1]); 
    list = filterByCategory(list,category);
  }
  else if(duration.length > 0){
    list = filterByDuration(list,durationArray[0],durationArray[1]);
  }
  else if(category.length > 0){
    list= filterByCategory(list,category);
  }
  // Place holder for functionality to work in the Stubs
  // console.log(list);
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem('filters')); 

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const pillElement = document.querySelector("#category-list");
  
  const {duration,category} = filters;
  // console.log(category);
  category.forEach((categoryItem)=>{
    const pillChild = document.createElement("div")
    pillChild.setAttribute("class","category-filter");
    const pillElementData = `
          ${categoryItem}
       `
    pillChild.innerHTML = pillElementData;
    pillElement.appendChild(pillChild);
  })
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
