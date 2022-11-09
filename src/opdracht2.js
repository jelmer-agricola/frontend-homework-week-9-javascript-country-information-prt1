import axios from 'axios';


// sla de referentie naar het formulier op en plaats er een submit-event listener op
// const searchForm = document.getElementById('search-form');
// searchForm.addEventListener('submit, searchCountry');

// 2. Schrijf een asynchrone functie die, met behulp van Axios, een GET-request maakt naar het juiste endpoint
// voor `nederland`. Log de response in de console en bestudeer de data goed: hoe is het opgebouwd?
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', searchCountry);

const countryInfoBox = document.getElementById('search-result');
const errorMessageBox = document.getElementById('error-message');

function searchCountry(e) {
    e.preventDefault();
    const queryfield = document.getElementById('query-field')

    fetchCountryData(queryfield.value);
    queryfield.value = '';
}

async function fetchCountryData(name) {

    const previousSearchResult = document.getElementById('search-result-identifier');
    const previousErrorMessage = document.getElementById('error-message-identifier');

    if (previousErrorMessage) {
        errorMessageBox.removeChild(previousErrorMessage);
    }

    if (previousSearchResult) {
        countryInfoBox.removeChild(previousSearchResult);
    }


    try {
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const country = result.data[0];
        console.log(country);
        //     3. Probeer eens om de _naam_ en _populatie_ van het land te loggen in de console. Welk pad moet je hiervoor volgen?
              // const response = await axios.get(`https://restcountries.com/v2/name/nederland`);


        const countryContainer = document.createElement('article');
        countryContainer.setAttribute('class', 'search-result-box');
        countryContainer.setAttribute('id', 'search-result-identifier');


        // maak de <span> tag om de titel en vlag in te stoppen
        const flagTitleContainer = document.createElement('span');
        flagTitleContainer.setAttribute('class', 'flag-title-container');

        // maak de <img> tag om de vlag in weer te geven
        const flag = document.createElement('img');
        // stop de image url in het src attribuut van img
        flag.setAttribute('src', country.flag);
        flag.setAttribute('class', 'flag');
        flagTitleContainer.appendChild(flag);


        const countryName = document.createElement('h2');
        countryName.textContent = country.name;
        flagTitleContainer.appendChild(countryName);


        countryContainer.appendChild(flagTitleContainer);

        //  informatie
        const population = document.createElement('p');
        population.textContent = `${country.name} is situated in ${country.subregion}. It has a population of ${country.population} people.`;
        countryContainer.appendChild(population);

        // // informatie volgende regel
        const capital = document.createElement('p');
        capital.textContent = `The capital is ${country.capital} and you can pay with ${createCurrencyDescription(country.currencies)}`;
        countryContainer.appendChild(capital);

        // voeg de country <div> toe aan de countryContainer
        countryInfoBox.appendChild(countryContainer);


    } catch (e) {
        console.error(e);
        const errorMessage = document.createElement('p');
        // Check welke error message van toepassing is
        errorMessage.setAttribute('class', 'error-message');
        errorMessage.setAttribute('id', 'error-message-identifier');
        errorMessage.textContent = `${name} bestaat niet. Probeer het nogmaals.`;

        errorMessageBox.appendChild(errorMessage)
    }
}


function createCurrencyDescription(currencies) {
    let output = 'and you can pay with ';

    if (currencies.length === 2) {
        return output + `${currencies[0].name} and ${currencies[1].name}'s`;
    }

    return output + `${currencies[0].name}'s`;
}


// 5. Zorg ervoor dat de _naam_ van het land weergegeven wordt in bovenstaande tag;
// 6. Zorg er nu voor dat de zin `[country-naam] is situated in [subarea-name]. It has a population of [amount] people.`
// daaronder wordt weergegeven;
// 7. Zorg ervoor dat er een afbeelding van een vlag naast de naam van het land komt te staan;
// 8. Schrijf een functie die, ongeacht of er één of twee valuta's gebruikt worden, eenn string teruggeeft. _Tip_: dit kun
// je checken door bijvoorbeeld de informatie over `panama` op te halen.
// - **1 valuta**: `and you can pay with [currency]'s`
// - **2 valuta's**: `and you can pay with [currency]'s and [currency]'s`
// 9. Gebruik deze functie de correcte zin, `The capital is [city] and you can pay with [currency] and [currency]'s` weer
// te geven.
// 10. Maak een inputveld met zoek-knop op de pagina. In plaats van dat de data wordt opgehaald wanneer de pagina laadt,
//     zorg je er nu voor dat de data over Nederland pas wordt opgehaald wanneer de gebruiker op ENTER of 'Zoek' drukt;
// 11. Zorg ervoor dat de waarde uit het inputveld wordt gebruikt als dynamische waarde in jouw GET-request;
// 12. Zorg ervoor dat de waarde van het input veld wordt leeggemaakt na elke zoekopdracht en dat er altijd maar één
// zoekresultaat op de pagina staat;
// 13. Zorg ervoor dat als er naar een land wordt gezocht dat niet bestaat, er een foutmelding wordt getoond. _Tip_: als er
// een ongeldige API call wordt gemaakt, zal de response in het catch blok terecht komen.
// 14. Zorg er ook voor dat wanneer er daarna een geldig verzoek wordt gedaan, de foutmelding weer verdwenen is.