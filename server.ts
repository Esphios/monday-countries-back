import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = Number(process.env.SERVER_PORT || 4000);
const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';

const weatherClient = axios.create({
    baseURL: WEATHER_API_URL,
    timeout: 5000,
    headers: {
        Accept: 'application/json',
    },
});

function normalizeQuery(rawValue: string): string | null {
    const decodedValue = decodeURIComponent(rawValue).trim();
    if (!decodedValue || decodedValue.length > 120) {
        return null;
    }

    return decodedValue;
}

app.use(cors());
app.use(express.json());

app.get('/weather/:country', async (req: Request, res: Response) => {
    const query = normalizeQuery(req.params.country as string);
    if (!query) {
        res.status(400).json({ error: 'Country or coordinates are required' });
        return;
    }

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        if (!apiKey) {
            console.error('WEATHER_API_KEY is not configured.');
            res.status(500).json({ error: 'Weather API key not configured' });
            return;
        }

        const response = await weatherClient.get('', {
            params: {
                key: apiKey,
                q: query,
            },
        });
        const weatherData = response.data;

        const reducedData = {
            temperature: weatherData.current.temp_c,
            condition: weatherData.current.condition.text,
            icon: `https:${weatherData.current.condition.icon}`,
            wind_speed_kph: weatherData.current.wind_kph,
            wind_direction: weatherData.current.wind_dir
        };

        res.json(reducedData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        if (axios.isAxiosError(error) && error.response?.status === 400) {
            res.status(404).json({ error: 'Location not found' });
            return;
        }

        res.status(502).json({ error: 'Could not fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
