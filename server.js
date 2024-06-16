const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

const PORT = process.env.SERVER_PORT || 4000;

app.use(express.json());

app.get('/weather/:country', async (req, res) => {
    const country = req.params.country;

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        console.log(apiKey)
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country}`;

        const response = await axios.get(apiUrl);
        const weatherData = response.data;

        const reducedData = {
            temperature: weatherData.current.temp_c,
            condition: weatherData.current.condition.text,
            icon: 'https:' + weatherData.current.condition.icon,
            wind_speed_kph: weatherData.current.wind_kph,
            wind_direction: weatherData.current.wind_dir
        };

        res.json(reducedData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Could not fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
