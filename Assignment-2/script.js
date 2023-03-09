var _pushState = history.pushState;
history.pushState = function (state, title, url) {
    _pushState.call(this, state, title, url);
    window.dispatchEvent(
        new CustomEvent('state-changed', { detail: url })
    );
};
var _pushState = history.pushState;
history.pushState = function (state, title, url) {
    _pushState.call(this, state, title, url);
    window.dispatchEvent(
        new CustomEvent('state-changed', { detail: url })
    );
};

var _pushState = history.pushState;
history.pushState = function (state, title, url) {
    _pushState.call(this, state, title, url);
    window.dispatchEvent(
        new CustomEvent('state-changed', { detail: url })
    );
};


const API_URL = 'https://restcountries.com/v2/all';
let countries = [];
let isSearching = false;

async function getCountries() {
    const response = await fetch(API_URL);
    const countries = await response.json();

    
    return countries.map(country => ({
        ...country,
        region: country.region.toLowerCase()
    }));
}

function displayCountries(countries) {
    const container = document.getElementById('countries-container');
    container.innerHTML = '';

    countries.forEach(country => {
        const card = document.createElement('div');
        card.classList.add('country-card');
        card.innerHTML = `
      <img src="${country.flag}" alt="${country.name} flag">
      <h2>${country.name}</h2>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Population:</strong> ${country.population}</p>
      <p><strong>Region:</strong> ${country.region}</p>
    `;

        card.addEventListener('click', () => {
            displayCountryInfo(country);
        });

        container.appendChild(card);
    });
}

function displayCountryInfo(country) {
    const container = document.getElementById('countries-container');
    container.innerHTML = '';

    const card = document.createElement('div');
    card.classList.add('country-card');
    card.innerHTML = `
      <img src="${country.flag}" alt="${country.name} flag">
      <h2>${country.name}</h2>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Population:</strong> ${country.population}</p>
      <p><strong>Region:</strong> ${country.region}</p>
    `;

    
    const previousBackButton = document.getElementById('back-button');
    if (previousBackButton) {
        previousBackButton.remove();
    }

    const wrapper = document.createElement('div');
    wrapper.classList.add('country-info-wrapper');
    wrapper.appendChild(card);

    container.appendChild(wrapper);
}

async function init() {
    const allCountries = await getCountries();
    const randomCountries = [];

    for (let i = 0; i < 21; i++) {
        const randomIndex = Math.floor(Math.random() * allCountries.length);
        randomCountries.push(allCountries[randomIndex]);
        allCountries.splice(randomIndex, 1);
    }

    displayCountries(randomCountries);
}

init();


const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keyup', async e => {
    const searchValue = e.target.value.toLowerCase();
    const allCountries = await getCountries();

    const filteredCountries = allCountries.filter(country =>
        country.name.toLowerCase().includes(searchValue) ||
        country.region.includes(searchValue)
    );

    isSearching = true;
    displayCountries(filteredCountries);
    document.getElementById('home-button-container').style.display = 'block';

    if (searchValue === '') {
        isSearching = false;
        init();
        document.getElementById('home-button-container').style.display = 'none';
    }
});



const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', e => {
    e.preventDefault();
    init();
    searchBar.value = '';
    document.getElementById('home-button-container').style.display = 'none';
});
