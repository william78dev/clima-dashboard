import type { WeatherData } from "../../types/weather";

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherDetails({ weather }: WeatherCardProps) {
  return (
    <div className="weather-card">
      <h3>Detalhes</h3>

      <p>
        <strong>Umidade</strong>: {weather.humidity}%
      </p>
      <p>
        <strong>Vento</strong>: {weather.windSpeed} km/h
      </p>
      <p>
        <strong>Sensação Termica</strong>: {weather.feelsLike}°C
      </p>
    </div>
  );
}
