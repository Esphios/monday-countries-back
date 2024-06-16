import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 4000;

app.use(express.json());

app.get('/weather/:country', async (req: Request, res: Response) => {
    const country = req.params.country as string;

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        if (!apiKey) {
            throw new Error('Weather API key not found');
        }

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
