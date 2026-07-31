export interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

export interface WeatherData {
  name: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  statusText: string; // Adicionado para sumir o erro da linha 23
  countryCode: string; // Adicionado para usar na URL da bandeira
  weatherCode: number;
  feelsLike: number;
  forecast: ForecastDay[]; // Adicionado para armazenar a previsão do tempo
}
