import weatherkey from "./apikey.js";
export default class Weather {
    constructor(city) {
        this.city = city;
        this.cityID = 0;
    }


    postweather = (weather) => {
        console.log(weather);
    }

    //builds request URL for 1day weather forcast
    buildRequestUrl = (city) => {
        return "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherkey;
    }

    

    // fetches the jSON and assigns to attributes
    weatherinfo = async (url) => {
        //get data from api
        try {
        var response = await fetch(url);
        var jsonweatherdata = await response.json();
        var response2 = await fetch("https://api.openweathermap.org/data/2.5/forecast?id=" + jsonweatherdata.id + "&units=imperial&appid=" + weatherkey)
        var jsonweatherdata2 = await response2.json();

        //get date information for current forcast
        let dateObj = new Date(jsonweatherdata2.list[0].dt * 1000);
        //units display for temperature
        var degrees = "° F";

        //set mainpage weather information with api data
        //create selectors for main weather forcast
        const maintemp = document.getElementById("maintemp");
        const mainicon = document.getElementById("mainicon");
        const cityName = document.getElementById("cityName");
        const mainhiandlow = document.getElementById("mainhiandlow");
        const maindescr = document.getElementById("maindescr");

        //assign main weather data
        cityName.innerHTML = jsonweatherdata2.city.name + ", " + jsonweatherdata2.city.country + " on " + dateObj.toDateString();
        maintemp.innerHTML = "Feels like: " + jsonweatherdata2.list[0].main.feels_like + degrees;
        mainicon.src = 'https://openweathermap.org/img/wn/' + jsonweatherdata2.list[0].weather[0].icon + '@2x.png';
        mainhiandlow.innerHTML = "Hi = " + jsonweatherdata2.list[0].main.temp_max + degrees + " / Low = " + jsonweatherdata2.list[0].main.temp_min + degrees;
        maindescr.innerHTML = jsonweatherdata2.list[0].weather[0].description;

        //set 5 day forcast from api data

        //image selectors
        const img2 = document.getElementById("img2");
        const img3 = document.getElementById("img3");
        const img4 = document.getElementById("img4");
        const img5 = document.getElementById("img5");
        const img6 = document.getElementById("img6");

        //assign images using api data
        img2.src = 'https://openweathermap.org/img/wn/' + jsonweatherdata2.list[1].weather[0].icon + '@2x.png';
        img3.src = 'https://openweathermap.org/img/wn/' + jsonweatherdata2.list[2].weather[0].icon + '@2x.png';
        img4.src = 'https://openweathermap.org/img/wn/' + jsonweatherdata2.list[3].weather[0].icon + '@2x.png';
        img5.src = 'https://openweathermap.org/img/wn/' + jsonweatherdata2.list[4].weather[0].icon + '@2x.png';
        img6.src = 'https://openweathermap.org/img/wn/' + jsonweatherdata2.list[5].weather[0].icon + '@2x.png';
        
        //temperature selectors
        const temp2 = document.getElementById("temp2");
        const temp3 = document.getElementById("temp3");
        const temp4 = document.getElementById("temp4");
        const temp5 = document.getElementById("temp5");
        const temp6 = document.getElementById("temp6");
        
        //assign temperature selectors using api data
        temp2.innerHTML = jsonweatherdata2.list[1].main.temp + degrees;
        temp3.innerHTML = jsonweatherdata2.list[2].main.temp + degrees;
        temp4.innerHTML = jsonweatherdata2.list[3].main.temp + degrees;
        temp5.innerHTML = jsonweatherdata2.list[4].main.temp + degrees;
        temp6.innerHTML = jsonweatherdata2.list[5].main.temp + degrees;
        
        //descrtiption selectors
        const descr1 = document.getElementById("descr1");
        const descr2 = document.getElementById("descr2");
        const descr3 = document.getElementById("descr3");
        const descr4 = document.getElementById("descr4");
        const descr5 = document.getElementById("descr5");

        //assign description selectors from api data
        descr1.innerHTML = jsonweatherdata2.list[1].weather[0].description;
        descr2.innerHTML = jsonweatherdata2.list[2].weather[0].description;
        descr3.innerHTML = jsonweatherdata2.list[3].weather[0].description;
        descr4.innerHTML = jsonweatherdata2.list[4].weather[0].description;
        descr5.innerHTML = jsonweatherdata2.list[5].weather[0].description;

        return jsonweatherdata2;
        }

        //if city is not found by api, retunn to default city and rerun
        catch(err) {
            this.city = "hays"
            this.getForcast();
        }
    }


    //runs forcast assignment for a given city
    getForcast = async () => {
        var requestUrl = this.buildRequestUrl(this.city);
        await this.weatherinfo(requestUrl);1
    }

}