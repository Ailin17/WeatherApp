 export class Weather {
    constructor(city) {
        this.apiKey = '8cadf050bf11bbf0ca677c271206367e';
        this.city = city;
    }

    async getWeather() {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${this.city}&appid=${this.apiKey}`);

        const responseData = await response.json();

        return {
            weather: responseData.weather,
            main: responseData.main,
            sys: responseData.sys,
            name: responseData.name
        };
    }

    changeLocation(city) {
        this.city = city;
    }

}