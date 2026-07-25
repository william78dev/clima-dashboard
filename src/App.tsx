import { useState, useEffect } from "react";
import "./App.scss";

export interface WeatherData {
  name: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export default function App() {
  const [city, setCity] = useState<string>("São Paulo");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função assíncrona real para consumir a API RESTful
  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);
    try {
      // 1. Buscar as coordenadas da cidade (Latitude e Longitude)
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=pt`,
      );
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Cidade não encontrada. Verifique a ortografia.");
      }

      const { latitude, longitude, name: correctName } = geoData.results[0];

      // 2. Buscar os dados climáticos reais usando as coordenadas
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,is_day,rain`,
      );
      const weatherData = await weatherResponse.json();

      // 3. Mapear os códigos da API para uma condição em texto simples
      let climaCondicao = "Ensolarado";
      if (weatherData.current.rain > 0) {
        climaCondicao = "Chuvoso";
      } else if (!weatherData.current.is_day) {
        climaCondicao = "Noite Limpa";
      }

      // 4. Atualizar o estado com os dados vindos da internet
      setWeather({
        name: correctName,
        temperature: Math.round(weatherData.current.temperature_2m),
        condition: climaCondicao,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: Math.round(weatherData.current.wind_speed_10m),
      });
    } catch (err: any) {
      setError(
        err.message || "Erro ao buscar dados do clima. Tente novamente.",
      );
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Busca inicial automática ao carregar a página
  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="dashboard-container">
      <header>
        <h1>🌤️ Weather Radar</h1>
      </header>

      <section className="search-section">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite a cidade..."
        />
        <button onClick={() => fetchWeather(city)}>Buscar</button>
      </section>

      {loading && (
        <p style={{ textAlign: "center" }}>Buscando informações na nuvem...</p>
      )}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {weather && !loading && (
        <main className="weather-grid">
          <div className="weather-card">
            <h2>{weather.name}</h2>
            <p className="temp">{weather.temperature}°C</p>
            <p>Condição: {weather.condition}</p>
          </div>
          <div className="weather-card">
            <h3>Detalhes</h3>
            <p>Umidade: {weather.humidity}%</p>
            <p>Vento: {weather.windSpeed} km/h</p>
          </div>
        </main>
      )}
    </div>
  );
}
