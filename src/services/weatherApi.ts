import type { WeatherData } from "../types/weather";
import { getWeatherInfo } from "../utils/weatherCode";

export async function fetchWeather(cityName: string): Promise<WeatherData> {
  if (!cityName.trim()) {
    throw new Error("Digite uma cidade válida.");
  }

  const termoBusca = cityName.trim();

  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      termoBusca,
    )}&count=1&language=pt`,
  );

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("Cidade ou país não encontrado.");
  }

  const {
    latitude,
    longitude,
    name: correctName,
    country_code,
  } = geoData.results[0];

  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,is_day,rain,weather_code`,
  );

  const weatherData = await weatherResponse.json();

  const { condition, statusText } = getWeatherInfo(
    weatherData.current.weather_code,
    weatherData.current.is_day,
  );

  return {
    name: correctName,
    countryCode: country_code.toLowerCase(),
    temperature: Math.round(weatherData.current.temperature_2m),
    condition,
    statusText,
    humidity: weatherData.current.relative_humidity_2m,
    windSpeed: Math.round(weatherData.current.wind_speed_10m),
    weatherCode: weatherData.current.weather_code,
    feelsLike: Math.round(weatherData.current.apparent_temperature),
  };
}
