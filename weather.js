const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2a55b4c398msh9fc1ac9d73a1fb9p19246djsn95594bbe9c52',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};
const getWeather = () => {
    cityName.innerHTML = city.value;
    if (city.value === "") {
        Swal.fire({
            icon: "error",
            title: "Oh! Please enter the Name.",
        });
        return;
    }
    const celcius = "°C";
    const celciusMax = "°C";
    const celciusMin = "°C";
    const windSpeed = "m/s";
    const humidityPercent = "%";
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city.value, options)
        .then((response) => response.json())
        .then((response) => {
            // console.log(response);
            //For Sunrise;
            const apiToHumanSunrise = new Date(response.sunrise * 1000).toLocaleString();
            const cpSunrise = apiToHumanSunrise.slice(12);
            //For Sunset;
            const apiToHumanSunset = new Date(response.sunset * 1000).toLocaleString();
            const cpSunset = apiToHumanSunset.slice(12);
            //Inserting Values;
            sunrise.innerHTML = response.sunrise = cpSunrise;
            sunset.innerHTML = response.sunset = cpSunset;
            max_temp.innerHTML = response.max_temp + celciusMax;
            min_temp.innerHTML = response.min_temp + celciusMin;
            humidity.innerHTML = response.humidity + humidityPercent;
            wind_speed.innerHTML = response.wind_speed + windSpeed;
        })
        .catch((err) => console.log(err));
};
search.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(city.value)
});

//Registered Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
    navigator.serviceWorker.ready.then((swReg) => {
        var options = {
            message: "This is message body.",
            icon: "/images/icons/icon-512x512.png",
        }
        swReg.showNotification("This is message title.", options);
    })
}