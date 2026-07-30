interface WeatherInfo {
  condition: string;
  statusText: string;
}

export function getWeatherInfo(
  weatherCode: number,
  isDay: boolean,
): WeatherInfo {
  switch (weatherCode) {
    case 0:
      return {
        condition: isDay ? "☀️ Céu limpo" : "🌙 Céu limpo",
        statusText: "Tempo aberto",
      };

    case 1:
      return {
        condition: "🌤️ Predominantemente limpo",
        statusText: "Poucas nuvens",
      };

    case 2:
      return {
        condition: "⛅ Parcialmente nublado",
        statusText: "Algumas nuvens",
      };

    case 3:
      return {
        condition: "☁️ Nublado",
        statusText: "Céu encoberto",
      };

    case 45:
    case 48:
      return {
        condition: "🌫️ Neblina",
        statusText: "Baixa visibilidade",
      };

    case 51:
    case 53:
    case 55:
      return {
        condition: "🌦️ Garoa",
        statusText: "Chuvisco",
      };

    case 61:
    case 63:
    case 65:
      return {
        condition: "🌧️ Chuva",
        statusText: "Leve um guarda-chuva",
      };

    case 66:
    case 67:
      return {
        condition: "🌧️ Chuva congelante",
        statusText: "Muito cuidado ao dirigir",
      };

    case 71:
    case 73:
    case 75:
      return {
        condition: "❄️ Neve",
        statusText: "Temperaturas muito baixas",
      };

    case 77:
      return {
        condition: "🌨️ Flocos de neve",
        statusText: "Neve leve",
      };

    case 80:
    case 81:
    case 82:
      return {
        condition: "🌦️ Pancadas de chuva",
        statusText: "Chuva passageira",
      };

    case 85:
    case 86:
      return {
        condition: "🌨️ Pancadas de neve",
        statusText: "Neve passageira",
      };

    case 95:
      return {
        condition: "⛈️ Tempestade",
        statusText: "Raios e trovões",
      };

    case 96:
    case 99:
      return {
        condition: "⛈️ Tempestade severa",
        statusText: "Granizo e raios",
      };

    default:
      return {
        condition: "🌍 Clima",
        statusText: "Condição não identificada",
      };
  }
}
