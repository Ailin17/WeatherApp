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
        this.cities;
    }


    getTime(time) {
        var date = new Date(time * 1000);
        var timestr = date.toLocaleTimeString();
        return timestr;
    }

    toCelsius(K) {
        return parseInt(K - 273.15);
    }
    toFahrenheit(K) {
        return parseInt((K - 273.15) * 9 / 5 + 32);
    }

    paint(weather) {

        const countries = this.getEmojis()
            .then(results => {
                console.log(results);

                results.forEach(result => {
                   if (result.code === weather.sys.country) {
                       const div = document.querySelector('.emoji');
                       div.innerHTML = result.emoji;
                       document.querySelector('.weather-wrapper').insertBefore(div, document.querySelector('h1'));
                   }
                })


            })
            .catch(err => {
                console.log(err);

            });;

        let units;
        if (localStorage.getItem('units') === null) {
            units = 'C';
        } else {
            units = localStorage.getItem('units');
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

        this.city.textContent = weather.name;
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

    changeUnit(unit) {
        const units = document.querySelectorAll('.unit')
        units.forEach(unit => unit.classList.remove('active'));
        unit.classList.add('active');
    }

    countriesDropdown(list) {
        let html = ' <option value=null>Choose a Country</option>';
        list.forEach(item => {
            html += `
            <option value=${item.id}>${item.city}</option>
            `
        });
        document.querySelector('#country').innerHTML = html;
    }

    createAutocomplete(list) {
        if (document.querySelector('#autocomplete-list')) {
            document.querySelector('#autocomplete-list').remove();
        }
        const hiddenInput = document.querySelector('#city-id')
        const input = document.querySelector('.city-input')
        const div = document.createElement('DIV');
        div.setAttribute("id", "autocomplete-list");
        div.setAttribute("class", "autocomplete-items");
        document.querySelector('.city-autocomplete').appendChild(div);



        // let html = '';
        list.forEach(item => {
            const b = document.createElement('DIV');
            b.innerHTML = item.name;
            b.innerHTML += `<input type='hidden' value='${item.id}'>`;
            b.addEventListener('click', () => {
                hiddenInput.value = item.id;
                input.value = item.name;
                div.remove();
            });
            div.appendChild(b);
        })

        console.log(div);
    }

    async getEmojis() {
        const res = await fetch('../data/countryemoji.json');
        const countries = await res.json();
        return countries;
    }
}