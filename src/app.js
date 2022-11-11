// https://github.com/jelmer-agricola/frontend-homework-week-9-javascript-country-information-prt1/pull/1
import axios from 'axios';

const sortedCountries = document.getElementById('sort-button');
sortedCountries.addEventListener('click', searchCountry);

function sortCountries() {
    countries.sort((a, b) => a.population - b.population);


}



async function fetchCountriesData() {
    try {
        const result = await axios.get('https://restcountries.com/v2/all');
        const countries = result.data;
        console.log(result);
        // console.log(result.data);

//4.  los een land loggen Nederland in dit geval
        console.log(result.data[157].population);
// sort functie maken voor landen op populatie van laag naar hoog



        generateCountriesList(countries);

// array loggen met landnamen of iets anders.
        // const newArray = [];
        //
        //  // for (let i = 0; i < result.data.length; i++) {
        //  //     newArray.push(result.data[0].name);
        //  // }
        //  // console.log(newArray);

        // console.log(countryName);
    } catch (e) {
        console.error(e);
    }
}


fetchCountriesData();

function generateCountriesList(countryArray) {
    const countryList = document.getElementById('country-list');
    countryList.innerHTML = countryArray.map((country) => {
        return `
        <li>
            <img class="flags" src="${country.flag}" alt="flag of the country"/>
            <span class="${getRegionClass(country.region)}">${country.name}</span>    
            <p>Has a population of ${country.population} people</p>
        </li>
        `;
    }).join('');
}

// generateCountriesList();

function getRegionClass(region) {
    switch (region) {
        /*# Africa: blauw*/
        case 'Africa':
            return 'blue';
        /*# Americas: groen*/
        case 'Americas':
            return 'green';
        /*# Asia: rood*/
        case 'Asia':
            return 'red';
        /*# Europe: geel*/
        case 'Europe':
            return 'yellow';
        /*# Oceania: paars*/
        case 'Oceania':
            return 'purple';
        default:
            return 'default';

    }
}


// #De naam van het land
// name: Afghanistan
// #De vlag van dat land
// Zit onder flag
// #De zin: Has a population of [amount] people
// zit onder population
