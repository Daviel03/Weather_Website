//Weather Website


const apiKey = "Key";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";


    }else{
        
    }

    const data = await response.json();
    
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelector(".feelsLike span").innerHTML = Math.round(data.main.feels_like) + "°";
    document.querySelector(".highLow span:first-child").innerHTML = Math.round(data.main.temp_max) + "°";
    document.querySelector(".highLow span:last-child").innerHTML = Math.round(data.main.temp_min) + "°";
    document.querySelector(".weatherDes").innerHTML = data.weather[0].description;


    const weatherId = data.weather[0].id;
    getWeatherPng(weatherId, weatherIcon);

    
    
    const windDirection = getWindDirection(data.wind.deg);
    document.querySelector(".windSpeed").innerHTML =  data.wind.speed;
    document.querySelector(".windDirection").innerHTML = windDirection; 
    document.querySelector(".pressureValue").innerHTML = (data.main.pressure * 0.02953).toFixed(2);
    document.querySelector(".humidityValue").innerHTML= data.main.humidity + "%";
    document.querySelector(".visibilityValue").innerHTML = (data.visibility/ 1609.34).toFixed(2) + "miles";
    
    document.querySelector(".weatherElements").style.display = "flex";

    
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    checkWeather(city);
})

function getWeatherPng(weatherId, weatherIcon){
    
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            weatherIcon.src = "images/thunder.png"
            break;
        case(weatherId >= 300 && weatherId < 400):
            weatherIcon.src = "images/drizzle.png"
            break;
        case(weatherId >= 500 && weatherId < 600):
            weatherIcon.src = "images/rain.png"
            break;
        case(weatherId >= 600 && weatherId < 700):
            weatherIcon.src = "images/snow.png"
            break;
        case(weatherId >= 700 && weatherId < 800):
            weatherIcon.src = "images/mist.png"
            break;
        case(weatherId === 800):
            weatherIcon.src = "images/clear.png"
            break;
        case(weatherId >= 801 && weatherId < 810):
            weatherIcon.src = "images/clouds.png"
            break;
        default:
            weatherIcon.src = "images/clear.png"
            break;      
    }  
    document.querySelector(".weather").style.display = "block";

}

function getWindDirection(deg){
    const directions = ["N","NE","E","SE","S","SW","W","NW",];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
}


