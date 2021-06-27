const zipCodeInput = document.getElementById("zip-code-input");
document.getElementById("search").addEventListener("click", (event) => {
  event.preventDefault();
  fetchStateByZipcode(zipCodeInput.value);
});

const fetchStateByZipcode = (zipCode) => {
  console.log("entramos", zipCode);
  if (zipCode) {
    fetch(`http://api.zippopotam.us/us/${zipCode}`)
      .then((data) => data.json())
      .then((state) => {
        console.log(state);
        const stateProps = {
          state: state.places[0].state,
          stateAbbreviation: state.places[0]["state abbreviation"],
          placeName: state.places[0]["place name"],
          longitude: state.places[0].longitude,
          latitude: state.places[0].latitude,
        };

        document.getElementById("state-information").innerHTML = stateComponent(stateProps);
      })
      .catch((error) => {
        console.error("There was an error fetching your state:", error);
        document.getElementById("state-information").innerHTML = notFoundComponent();
      });
  }
};

const stateComponent = ({ state, stateAbbreviation, placeName, longitude, latitude }) => {
  return `
  <div class="state-name-image">
    <h2>${state}</h2>
    <img src="./states/${stateAbbreviation}.svg" alt="Image of ${state}">
  </div>
  <div class="state-card-content">
    <div class="zipcode-information-item"><strong>Place Name: </strong> <p>${placeName}</p></div>
    <div class="zipcode-information-item"><strong>State: </strong><p>${state}</p></div>
    <div class="zipcode-information-item"><strong>longitude: </strong><p>${longitude}</p></div>
    <div class="zipcode-information-item"><strong>latitude: </strong><p>${latitude}</p></div>
  </div>
  
  `;
};

const notFoundComponent = () => {
  return `
  <div class="state-name-image">
    <h2>We could not find your Zip Code</h2><br>
    <h2>:(</h2>
  </div>`;
};
