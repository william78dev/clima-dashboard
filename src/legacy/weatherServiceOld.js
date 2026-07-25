// CÓDIGO LEGADO (ES5) - Utilizava XMLHttpRequest em vez de Fetch/Promises
function getLegacyWeatherData(cityName, callback) {
  var xhr = new XMLHttpRequest();
  var url =
    "https://geocoding-api.open-meteo.com/v1/search?name=" +
    encodeURIComponent(cityName) +
    "&count=1";

  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.results && response.results.length > 0) {
        callback(null, response.results[0]);
      } else {
        callback("Cidade nao encontrada", null);
      }
    }
  };
  xhr.send();
}

// Exportação antiga do Node/CommonJS
module.exports = { getLegacyWeatherData: getLegacyWeatherData };
