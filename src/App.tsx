import { useState, useEffect } from "react";
import "./App.scss";
import { SearchBar } from "./components/SearchBar/SearchBar";
import type { WeatherData } from "./types/weather";
import { WeatherCard } from "./components/WeatherCard/WeatherCard";
import { WeatherDetails } from "./components/WeatherDetails/WeatherDetails";
import { fetchWeather } from "./services/weatherApi";
import { ForecastCard } from "./components/ForecastCard/ForecastCard";

export default function App() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao buscar dados do clima.",
      );
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultCity();
  }, []);

  const fetchDefaultCity = async () => {
    setLoading(true);

    try {
      const data = await fetchWeather("São Paulo");
      setWeather(data);
    } catch {
      setError("Erro ao carregar a cidade padrão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>🌦️ Clima em Tempo Real</h1>
      </header>

      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

      {loading && (
        <p style={{ textAlign: "center" }}>Buscando informações na nuvem...</p>
      )}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {weather && !loading && (
        <>
          <main className="weather-grid">
            <WeatherCard weather={weather} />
            <WeatherDetails weather={weather} />
          </main>

          <section className="forecast-section">
            <ForecastCard forecast={weather.forecast} />
          </section>
        </>
      )}
    </div>
  );
}
