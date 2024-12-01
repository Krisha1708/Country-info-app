// Select element
const sorting = document.getElementById("sortBtn");
const countriesList = document.getElementById("countries-List");

// fetch Data from API
async function countryData() {
    {
        try {
            const response = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries`);
            const data = await response.json();

            return data;
        } catch (error) {
            console.log("Error fetching Country data:", error);
        };
    }
};

// Display data
const renderCountries = function (countries) {
   console.log('countries', countries)
    countriesList.innerHTML = "";
    countries.forEach(country => {
        const countryCard = document.createElement("div")
        countryCard.classList.add('card');

        let countryName = document.createElement("h3");
        countryName.textContent = country.country;

        let countryRank = document.createElement("p");
        countryRank.textContent = `Rank: ${country.Rank}`;

        let countryPopulation = document.createElement("p");
        countryPopulation.textContent = `Population; ${country.population}`;

        countryCard.append(countryName, countryRank, countryPopulation);
        countriesList.append(countryCard);
    });
};

//Sort country by population
const sortCountriesByPopulation = (countries) => {
    const sortedCountries = countries.sort((a, b) => b.population - a.population);
    console.log('sortedCountries');
    console.log(sortedCountries)
    renderCountries(sortedCountries);
};

// Initial Data and fetch data
const loadCountries = async () => {
    const countries = await countryData();
    renderCountries(countries.data);
};

// Event listners for sorting
sorting.addEventListener('click', async () => {
    const countries = await countryData();
    sortCountriesByPopulation(countries.data);
});

// load contries on page
loadCountries();