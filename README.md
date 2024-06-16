# Weather API Service

This project is a simple Express.js server that provides weather information for a specified country. The weather data is fetched from the WeatherAPI service.

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository or download the source code.

2. Navigate to the project directory:

```bash
cd weather-api-service
```

3. Install the necessary dependencies:

```bash
npm install
```

4. Create a .env file in the root directory of the project and add your WeatherAPI key and server port:

```env
WEATHER_API_KEY=your_weather_api_key
SERVER_PORT=4000
```
Replace your_weather_api_key with your actual WeatherAPI key.

## Usage
1. Start the server:

```bash
npm start
```

2. The server will run on the port specified in the .env file. By default, it runs on port 4000.

3. Make a GET request to /weather/:country to fetch the weather information for a specific country. Replace :country with the name of the country you want to fetch the weather for.

Example:

```bash
curl http://localhost:4000/weather/USA
```
This will return a JSON response with the current weather information for the specified country.

## Endpoints

### GET /weather/:country

Fetch the current weather information for the specified country.

- **Params:**
  - `country` (string): The name of the country to fetch weather data for.

- **Response:**
  - `temperature` (number): The current temperature in Celsius.
  - `condition` (string): The current weather condition.
  - `icon` (string): The URL of the weather condition icon.
  - `wind_speed_kph` (number): The current wind speed in kilometers per hour.
  - `wind_direction` (string): The current wind direction.

## Error Handling

If there is an error fetching the weather data, the server will respond with a 500 status code and a JSON error message:

```json
{
  "error": "Could not fetch weather data"
}
```
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## Contact

For any questions or suggestions, please contact [limaeduardo.er@gmail.com](mailto:limaeduardo.er@gmail.com).
