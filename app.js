const weather = new Weather('Sydney');
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);
document.querySelector('.btn').addEventListener('click', changeCity);
document.querySelector('.celsius').addEventListener('click', changeUnit);
document.querySelector('.fahrenheit').addEventListener('click', changeUnit);

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
    if (document.querySelector('.city-input').value !== '') {
        weather.changeLocation(document.querySelector('.city-input').value);
        let city = document.querySelector('.city-input').value.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });;
        localStorage.setItem('city', city);
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