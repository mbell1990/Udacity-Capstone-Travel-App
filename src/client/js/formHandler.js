//import fetch from "node-fetch";

// function to perform action and chain all callback functions
// get date and number of days
// get city
// geonames lat and lng
// then weatherbit using lat and lng
// then pixaby
// then update UI

// Usernamea and API Keys

const geoUsername = "matt.bell123";
const weatherAPI_Key = "ab81d9346d8945a9a203eda14cacbaa4";
const pixabyAPI_Key = "31135970-406b562ad428e5ae275d760d0";

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const city = document.getElementById("city").value;
  let today = new Date();
  let departureDate = new Date(document.getElementById("departureDate").value);
  console.log(departureDate);

  let day = 1000 * 60 * 60 * 24;
  let difference_days = departureDate.getTime() - today.getTime();

  let daysleft = Math.abs(Math.ceil(difference_days / day));
  console.log(daysleft);

  document.getElementById(
    "trip-days"
  ).innerHTML = `😃 Your trip is in ${daysleft} days`;

  geonamesAPI(city)
    .then((data) => {
      return postData("http://localhost:8081/geonames", {
        latitude: data.geonames[0].lat,
        longitude: data.geonames[0].lng,
        city: data.geonames[0].name,
      });
    })
    .then((res) => {
      const lat = res[res.length - 1].latitude;
      const lng = res[res.length - 1].longitude;
      const name = res[res.length - 1].name;
      return { lat, lng, name };
    })
    .then(({ lat, lng }) => {
      return weatherBitAPI(lat, lng);
    })
    .then((weatherData) => {
      return postData("http://localhost:8081/weatherbit", {
        high: weatherData.data[0].high_temp,
        low: weatherData.data[0].low_temp,
        icon: weatherData.data[0].weather.icon,
        description: weatherData.data[0].weather.description,
      });
    })
    .then(() => {
      return pixabyAPI(city);
    })
    .then((data) => {
      return postData("http://localhost:8081/pixabay", {
        image: data.hits[0].webformatURL,
      }).then(updateUI());
    });

  document.getElementById("focus").focus();
}

// Callback functions to process data from API's

// Geonames

const geonamesAPI = async (city) => {
  const geoURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoUsername}`;
  const res = await fetch(geoURL);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Weatherbit API

const weatherBitAPI = async (lat, lon) => {
  const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherAPI_Key}`;
  const res = await fetch(weatherURL);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    alert("error!", error);
  }
};

// Pixaby API

const pixabyAPI = async (city) => {
  const pixabyURL = `https://pixabay.com/api/?key=${pixabyAPI_Key}&q=${city}&image_type=photo`;
  const res = await fetch(pixabyURL);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    alert("Pixabay error!", error);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// update UI

const updateUI = async () => {
  const request = await fetch("http://localhost:8081/all");

  try {
    const allData = await request.json();
    console.log(allData);

    document.getElementById("image").src = allData[allData.length - 1].image;
    document.getElementById("city-name").innerHTML = `📌 City:
    ${allData[allData.length - 3].city}`;
    document.getElementById("high-temp").innerHTML = `🌞 High:
      ${allData[allData.length - 2].high}°C`;
    document.getElementById("low-temp").innerHTML = `💧 Low:
      ${allData[allData.length - 2].low}°C`;
    document.getElementById("description").innerHTML = `Description: 
      ${allData[allData.length - 2].description}`;

    document.getElementById("weather-icon").src = `../media/weatherbit_icons/${
      allData[allData.length - 2].icon
    }.png`;
  } catch (error) {
    console.log("error", error);
  }
};

export { performAction };
