class UI {
    constructor() {
        this.city = document.querySelector('.location-title');
        this.temp = document.querySelector('.temp-degrees');
        this.temp_desc = document.querySelector('.temp-desc');
        this.icon = document.querySelector('.temp-pic');
        this.sunrise = document.querySelector('.sunrise');
        this.sunset = document.querySelector('.sunset');
        this.feelsLike = document.querySelector('.feels-like');
        this.humidity = document.querySelector('.humidity');
        this.high = document.querySelector('.temp-hi');
        this.lo = document.querySelector('.temp-lo');
    }

    getTime(time) {
        var date = new Date(time * 1000);
        var timestr = date.toLocaleTimeString();
        return timestr;
    }

    toCelsius(K) {
        return (K - 273.15).toFixed(1);
    }
    toFahrenheit(K) {
        return ((K - 273.15) * 9 / 5 + 32).toFixed(1);
    }

    paint(weather) {
        let units;
        if (localStorage.getItem('units') === null) {
            units = 'C';
        } else {
            units = localStorage.getItem('units');
        }

        let city;
        if (typeof (weather.weather) != "undefined") {
            if (localStorage.getItem('city') === null) {
                city = 'Sydney';
            } else {
                city = localStorage.getItem('city');
            }
        }
        switch (units) {
            case 'F':
                this.temp.textContent = `${this.toFahrenheit(weather.main.temp)}\xB0 F`;
                this.high.textContent = `Hi: ${this.toFahrenheit(weather.main.temp_max)} \xB0 F`;
                this.lo.textContent = `Lo: ${this.toFahrenheit(weather.main.temp_min)} \xB0 F`;
                this.feelsLike.textContent = `Feels Like: ${this.toFahrenheit(weather.main.feels_like)}\xB0 F`;
                break;
            case 'C':
                this.temp.textContent = `${this.toCelsius(weather.main.temp)}\xB0 C`;
                this.high.textContent = `Hi: ${this.toCelsius(weather.main.temp_max)} \xB0 C`;
                this.lo.textContent = `Lo: ${this.toCelsius(weather.main.temp_min)} \xB0 C`;
                this.feelsLike.textContent = `Feels Like: ${this.toCelsius(weather.main.feels_like)}\xB0 C`;
                break;
        }

        this.city.textContent = city;
        this.temp_desc.textContent = `Currently: ${weather.weather[0].main}`;
        this.sunrise.textContent = `Sunrise: ${this.getTime(weather.sys.sunrise)}`;
        this.sunset.textContent = `Sunset: ${this.getTime(weather.sys.sunset)}`;
        this.humidity.textContent = `Humidity: ${weather.main.humidity}%`
        this.icon.setAttribute('src', `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);

        this.clearField();


    }

    setMessage(msg) {
        // document.querySelector('.alert-message').remove();
        const div = document.createElement('div');
        div.className = 'alert-message';
        div.innerText = msg;
        document.querySelector('ul').insertBefore(div, document.querySelector('.btn'));
        setTimeout(function () {
            div.classList.add('fadeOut')
            setTimeout(function () {
                div.remove();
            }, 600)
        }, 3000)
    }

    clearField() {
        document.querySelector('.city-input').value = '';
    }

    changeUnit(unit){
        const units = document.querySelectorAll('.unit')
        units.forEach(unit => unit.classList.remove('active'));
        unit.classList.add('active');
    }
}