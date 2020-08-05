import { Select } from "./select";
import { Weather } from "./weather";
import { UI } from "./ui";
import  "./sass/main.scss";
/* import './data/city.list.json';
import './data/CountryCodes.json';
import './data/countryemoji.json';
 */

const weather = new Weather('2172797');
const ui = new UI();
const select = new Select();

document.addEventListener('DOMContentLoaded', getWeather);
document.querySelector('.btn').addEventListener('click', changeCity);
document.querySelector('.celsius').addEventListener('click', changeUnit);
document.querySelector('.fahrenheit').addEventListener('click', changeUnit);
document.querySelector('.city-input').addEventListener('input', () => searchCities(document.querySelector('.city-input').value));

function getWeather() {
    weather.getWeather()
        .then(results => {
            console.log(results);
            ui.paint(results);

        })
        .catch(err => {
            console.log(err);
            ui.setMessage('Please enter a valid city');
        });
}


function changeCity() {

    if (document.querySelector('#city-id').value !== '') {
        const cityID = parseInt(document.querySelector('#city-id').value);
        weather.changeLocation(cityID);

        getWeather();
    } else {
        ui.setMessage('Please enter a valid city');
    }
}

function changeUnit(e) {
    if (e.target.id === 'C') {
        localStorage.setItem('units', 'C')
    } else if (e.target.id === 'F') {
        localStorage.setItem('units', 'F')
    }
    getWeather();
    ui.changeUnit(e.target);
}

const searchCities = async searchQuery => {
    const res = await fetch('../data/city.list.json');
    const cities = await res.json();

    // Filter by Country
    const country = document.querySelector('#country').value;
    const cityByCountry = cities.filter(city => city.country === country);

    // Get matches to current text input

    let matches = cityByCountry.filter(city => {
        const regex = new RegExp(`^${searchQuery}`, 'gi');
        return city.name.match(regex);
    }).slice(0, 15);

    if (searchQuery.length < 1) { matches = [] }
    ui.createAutocomplete(matches);
}


const getCountries = async () => {
    const res = await fetch('../data/CountryCodes.json');
    const cities = await res.json();
    const list = cities.map(city => {
        return {
            city: city.name,
            id: city.code
        }
    })

    ui.countriesDropdown(list);
    select.getSelect();
}


document.addEventListener('DOMContentLoaded', getCountries);

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", () => {
    select.closeAllSelect();
});