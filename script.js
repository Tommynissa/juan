// script.js - meteosimple
const weatherEl = document.getElementById('weatherCard');

async function fetchWeather() {
  // Remplacez VOTRE_API_METEO par votre clé OpenWeatherMap (API gratuite)
  const apiKey = AIzaSyAG55BilPn1ryw62MHUE7bv0iufjHTP9ek;
  const city = 'Juan-les-Pins,FR';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=fr`;
  try {
    const res = await fetch(url);
    if(!res.ok) throw new Error('Erreur API météo');
    const data = await res.json();
    renderWeather(data);
  } catch (err) {
    weatherEl.innerHTML = '<p class="muted">Météo indisponible — vérifiez la clé API.</p>';
    console.error(err);
  }
}

function renderWeather(data){
  const desc = data.weather && data.weather[0] ? data.weather[0].description : '—';
  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like);
  const wind = Math.round(data.wind.speed * 3.6); // m/s -> km/h
  const icon = data.weather && data.weather[0] ? data.weather[0].icon : '';
  weatherEl.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px">
      <div>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" width="64" height="64">
      </div>
      <div>
        <div style="font-weight:700; font-size:1.05rem">${desc}</div>
        <div style="font-size:1.05rem">${temp}°C (ressenti ${feels}°C)</div>
        <div class="muted">Vent : ${wind} km/h</div>
      </div>
    </div>
  `;
}

fetchWeather();
