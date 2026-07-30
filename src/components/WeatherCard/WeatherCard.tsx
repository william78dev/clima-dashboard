import type { WeatherData } from "../../types/weather";

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="weather-card main-card">
      <div className="title-wrapper">
        <h2>{weather.name}</h2>
        <img
          src={`https://flagcdn.com/w40/${weather.countryCode}.png`}
          alt={`Bandeira do país ${weather.countryCode.toUpperCase()}`}
          className="country-flag"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <p className="temp">{Math.round(weather.temperature)}°C</p>

      <div className="status-badge">
        <span className="condition-tag">{weather.condition}</span>
        <p className="status-text">{weather.statusText}</p>
      </div>
    </div>
  );
}
