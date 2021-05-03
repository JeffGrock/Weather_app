import weather from "./Weather.js";
import weatherkey from "./apikey.js";


document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === 'complete') {
        console.log("readyState: complete");
        initApp();
    }
});


const initApp = () => {

    let current = "Hays";

    try {
    //get user input for weather retreiveal create instance of weather class
    current = localStorage.getItem("city");

    if(current === '') {
        current = "hays";
    }


    let currentWeather = new weather(current);
    currentWeather.getForcast();
    }
    catch(err){
        current = 'hays'
        let currentWeather = new weather(current);
        currentWeather.getForcast();
    }

    // weather class to get and display weather
}
