const zipCodeInput = document.getElementById("zip-code-input");
document.getElementById("search").addEventListener("click", () => fetchStateByZipcode(zipCodeInput.value));

function fetchStateByZipcode(zipCode) {
  console.log("entramos", zipCode);
  fetch(`http://api.zippopotam.us/us/${zipCode}`)
    .then((data) => data.json())
    .then((state) => {
      console.log(state);
      document.getElementById("state").innerHTML = `<h2>My state: ${state.places[0].state}</h2>
			<img src="./states/${state.places[0]["state abbreviation"]}.svg" alt="state image">`;
    })
    .catch((error) => console.error("There was an error fetching your state:", error));
}
