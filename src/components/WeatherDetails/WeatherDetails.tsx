import type { WeatherData } from "../../types/weather";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { LuThermometer } from "react-icons/lu";

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherDetails({ weather }: WeatherCardProps) {
  return (
    <div className="weather-card">
      <h3>Detalhes</h3>

      <p>
        <WiHumidity size={24} color="#38bdf8" /> Umidade:{" "}
        <strong>{weather.humidity}%</strong>
      </p>

      <p>
        <FaWind size={18} color="#38bdf8" /> Vento:{" "}
        <strong>{weather.windSpeed} km/h</strong>
      </p>

      <p>
        <LuThermometer size={20} color="#38bdf8" /> Sensação térmica:{" "}
        <strong>{weather.feelsLike}°C</strong>
      </p>
    </div>
  );
}
