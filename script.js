
      const latitude = -7.973;
      const longitude = 112.6087;

      function formatDate(dateString) {
        const days = [
          "Minggu",
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
        ];
        const months = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];

        const date = new Date(dateString);
        const dayName = days[date.getDay()];
        const dateNum = date.getDate();
        const monthName = months[date.getMonth()];

        return `${dayName}, ${dateNum} ${monthName}`;
      }

      function getWeatherIcon(precipitation) {
        if (precipitation > 5) return "🌧️";
        if (precipitation > 0.5) return "🌦️";
        return "🌞";
      }

      async function fetchWeather() {
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=-7.973&longitude=112.6087&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FBangkok&forecast_days=3`
          );

          const data = await response.json();
          displayForecast(data);
        } catch (error) {
          console.error("Error fetching weather:", error);
          document.getElementById("forecast-container").innerHTML =
            '<div class="day-card"><div class="day-name">Error loading data</div></div>';
        }
      }

      function displayForecast(data) {
        const container = document.getElementById("forecast-container");
        container.innerHTML = "";

        data.daily.time.forEach((date, index) => {
          const dayCard = document.createElement("div");
          dayCard.className = "day-card";

          const maxTemp = Math.round(data.daily.temperature_2m_max[index]);
          const minTemp = Math.round(data.daily.temperature_2m_min[index]);
          const precipitation = data.daily.precipitation_sum[index];

          dayCard.innerHTML = `
                    <div class="day-name">${formatDate(date)}</div>
                    <div class="weather-icon">${getWeatherIcon(
                      precipitation
                    )}</div>
                    <div class="temp-container">
                        <div class="temp">
                            <span class="temp-label">Max</span>
                            <span class="temp-value max-temp">${maxTemp}°C</span>
                        </div>
                        <div class="temp">
                            <span class="temp-label">Min</span>
                            <span class="temp-value min-temp">${minTemp}°C</span>
                        </div>
                    </div>
                    <div class="precipitation">Hujan: ${precipitation} mm</div>
                `;

          container.appendChild(dayCard);
        });
      }

      fetchWeather();
