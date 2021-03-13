const input = document.querySelector("input");
const number = document.getElementById("number");
const city = document.getElementById("city");
const umidity = document.getElementById("umidity");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

document.querySelector("button").addEventListener("click", getWeatherData);

function getWeatherData(e) {
  const inputValue = input.value;

  getWeather(inputValue)
    .then((data) => {
      console.log(data);
      number.textContent = `${Math.round(data.main.temp - 273.15)}`;
      city.textContent = `${data.name}`;
      umidity.textContent = `Umidità: ${data.main.humidity} %`;
      description.textContent = `Descrizione: ${data.weather[0].description}`;
      sunrise.textContent = `Alba: Around ${new Date(
        data.sys.sunrise * 1000
      ).getHours()}`;
      sunset.textContent = `Tramonto: Around ${new Date(
        data.sys.sunset * 1000
      ).getHours()}`;
      input.value = " ";
    })
    .catch((error) => console.log(error));

  e.preventDefault();
}

async function getWeather(city) {
  const response = await fetch(
    `http:api.openweathermap.org/data/2.5/weather?q=${city}&APPID=fee352e9f88cddc1e352f2a95e0cc0e0`
  );
  const data = await response.json();

  return data;
}
