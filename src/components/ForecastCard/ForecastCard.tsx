import type { ForecastDay } from "../../types/weather";
import { getWeatherInfo } from "../../utils/weatherCode";
import { formatDay } from "../../utils/dateUtils";

interface ForecastCardProps {
  forecast: ForecastDay[];
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className="weather-card">
      <h3>📅 Próximos 7 dias</h3>

      {forecast.map((day, index) => {
        const { condition } = getWeatherInfo(day.weatherCode, true);

        return (
          <div key={day.date} className="forecast-item">
            <span>{formatDay(day.date, index)}</span>

            <span>{condition}</span>
            <strong>
              {day.maxTemp}° / {day.minTemp}°
            </strong>
          </div>
        );
      })}
    </div>
  );
}
