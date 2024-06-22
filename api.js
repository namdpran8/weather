

// API call
var button1 = document.querySelector("#but");
let city = document.querySelector("#cy");
let tempval = document.querySelector(".temp");
let currentdate = document.querySelector("#date");
let cityname = document.querySelector("#cityname");
let precipate = document.querySelectorAll(".today-info>div .value")[0];
let humidity = document.querySelectorAll(".today-info>div .value ")[1];
let windsped = document.querySelectorAll(".today-info>div .value ")[2];

button1.addEventListener("click", () => {
    console.log(city.value);
    let key = `bd4ea33ecf905116d12af172e008dbae`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${key}`;

    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);

        // Update DOM elements with fetched data
        cityname.innerText = data.name;
        tempval.innerHTML = `${Math.round(data.main.temp - 273.15)}<span>°C</span>`;        // converting Kelvin to Celsius
        currentdate.innerText = new Date().toLocaleDateString();                             // or use data.dt for the exact date of the weather data
        //precipate.innerText = data.weather[0].description;
        precipate.innerText =   `${data.visibility} m`; 
        humidity.innerText = `${data.main.humidity} %`;
        windsped.innerText = `${data.wind.speed} km/h`;

        let weatherType = data.weather[0].main.toLowerCase();       // Trigger weather animations based on weather type          
        switch (weatherType) {
            case 'snow':        // Trigger snow animation
                $('#button-snow').click();
                break;
            case 'wind':    // Trigger wind animation
                $('#button-wind').click();
                break;
            case 'rain':                // Trigger rain animation
                $('#button-rain').click();
                break;
            case 'thunderstorm':                // Trigger thunder animation
                $('#button-thunder').click();
                break;
            case 'clear':                // Trigger sun animation
                $('#button-sun').click();
                break;
            default:                // Default animation if weather type is not matched
                $('#button-sun').click();
        }
    }).catch(error => {
        console.error("Error fetching weather data:", error);
        alert("unable to fetch weather")
    });
});
