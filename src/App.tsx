import { useState, useEffect } from "react";
import "./App.scss";

export interface WeatherData {
  name: string;
  countryCode: string;
  temperature: number;
  condition: string;
  statusText: string;
  humidity: number;
  windSpeed: number;
}

export default function App() {
  const [city, setCity] = useState<string>("São Paulo");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);
    try {
      // 🌍 Deixamos o termo livre para buscar qualquer lugar do mundo (Brasil ou Internacional)
      const termoBusca = cityName.trim();

      // Enviando o termo codificado corretamente para aceitar acentos e espaços
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(termoBusca)}&count=1&language=pt`,
      );
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(
          "Cidade ou país não encontrado. Verifique a ortografia.",
        );
      }

      const {
        latitude,
        longitude,
        name: correctName,
        country_code,
      } = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,is_day,rain`,
      );
      const weatherData = await weatherResponse.json();

      // Mapeamento inteligente para o clima e a frase suave
      let condicao = "☀️ Sol";
      let fraseSuave = "Céu limpo e ensolarado";
      const isDay = weatherData.current.is_day;
      const rain = weatherData.current.rain;

      if (rain > 0) {
        condicao = "🌧️ Chuva";
        fraseSuave = "Tempo chuvoso, leve um guarda-chuva";
      } else if (!isDay) {
        condicao = "🌙 Noite";
        fraseSuave = "Noite estrelada e céu aberto";
      } else if (weatherData.current.relative_humidity_2m > 80) {
        condicao = "☁️ Nublado";
        fraseSuave = "Céu coberto de nuvens";
      }

      setWeather({
        name: correctName,
        countryCode: country_code.toLowerCase(),
        temperature: Math.round(weatherData.current.temperature_2m),
        condition: condicao,
        statusText: fraseSuave,
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
          placeholder="Digite a cidade ou país..."
        />
        <button onClick={() => fetchWeather(city)}>Buscar</button>
      </section>

      {loading && (
        <p style={{ textAlign: "center" }}>Buscando informações na nuvem...</p>
      )}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {weather && !loading && (
        <main className="weather-grid">
          <div className="weather-card main-card">
            <div className="title-wrapper">
              <h2>{weather.name}</h2>
              <img
                src={`https://countryflagsapi.netlify.app/flag/${weather.countryCode}.svg`}
                alt="Bandeira do país"
                className="country-flag"
              />
            </div>
            <p className="temp">{weather.temperature}°C</p>

            <div className="status-badge">
              <span className="condition-tag">{weather.condition}</span>
              <p className="status-text">{weather.statusText}</p>
            </div>
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
