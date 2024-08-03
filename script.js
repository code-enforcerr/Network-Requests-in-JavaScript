const apiKey = 'd642489b275a95dffe81fcfd7030577d'; // Your OpenWeatherMap API key
const fetchWeatherButton = document.getElementById('fetch-weather');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');

async function fetchWeather(city) {
    try {
        // Ensure the URL string is properly formatted
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
    `;
}

fetchWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        weatherResult.innerHTML = '<p>Please enter a city name.</p>';
    }
});
