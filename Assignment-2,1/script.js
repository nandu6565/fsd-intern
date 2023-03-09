
var _pushState = history.pushState;
history.pushState = function (state, title, url) {
    _pushState.call(this, state, title, url);
    window.dispatchEvent(
        new CustomEvent('state-changed', { detail: url })
    );
};



const form = document.querySelector("form");
const countryInput = document.querySelector("#country");
const resultDiv = document.querySelector("#result");
const flagImg = document.querySelector(".flag-img");

let allCountriesData = [];

async function fetchAllCountriesData() {
    const apiUrl = "https://restcountries.com/v3.1/all";
    try {
        const response = await fetch(apiUrl);
        allCountriesData = await response.json();
        displayAllCountriesData(); // call this function to display all countries initially
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        flagImg.src = "";
        flagImg.alt = "";
    }
}

function displayAllCountriesData() {
    resultDiv.innerHTML = "";
    allCountriesData.forEach((countryData) => {
        const currencyName = countryData.currencies
            ? Object.values(countryData.currencies)[0].name
            : "Unknown";
        const languageNames = countryData.languages
            ? Object.values(countryData.languages).join(", ")
            : "Unknown";
        const countryInfo = `
      <div class="country-info">
        <h2>${countryData.name.common}</h2>
        <p><b>Capital:</b> ${countryData.capital}</p>
        <p><b>Region:</b> ${countryData.region}</p>
        <p><b>Population:</b> ${countryData.population}</p>
        <p><b>Currency:</b> ${currencyName}</p>
        <p><b>Languages:</b> ${languageNames}</p>
        <img src="${countryData.flags.png}" alt="Flag of ${countryData.name.common}" class="flag-img">
      </div>
    `;
        resultDiv.innerHTML += countryInfo;
    });
}


function filterCountriesData(query) {
    const countryData = allCountriesData.find((countryData) => {
        const countryName = countryData.name.common.toLowerCase();
        return countryName === query.toLowerCase();
    });
    if (countryData) {
        resultDiv.innerHTML = `
      <div class="country-info">
        <h2>${countryData.name.common}</h2>
        <p><b>Capital:</b> ${countryData.capital}</p>
        <p><b>Region:</b> ${countryData.region}</p>
        <p><b>Population:</b> ${countryData.population}</p>
        <p><b>Currency:</b> ${Object.values(countryData.currencies)[0].name}</p>
        <p><b>Languages:</b> ${Object.values(countryData.languages).join(
            ", "
        )}</p>
        <img src="${countryData.flags.png}" alt="Flag of ${countryData.name.common
            }" class="flag-img">
      </div>
    `;
    } else {
        resultDiv.innerHTML = "<p>Country not found.</p>";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const countryName = countryInput.value;
    filterCountriesData(countryName);
});

fetchAllCountriesData();
