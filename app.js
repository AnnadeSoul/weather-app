window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDiscription = document.querySelector ('.temperature-discription');
  let temperatureDegree = document.querySelector ('.temperature-degree');
  let locationTimezone = document.querySelector ('.location-timezone');
  let temperatureSection = document.querySelector ('.temperature');
  let temperatureSpan = document.querySelector ('.temperature span')


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/b31fe1e76e2c267cb1ae59f9dc426f71/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })  
        .then(data => {
          const { temperature, summary, icon }= data.currently;
          //Set DOM Elements from API//
          temperatureDegree.textContent = temperature;
          temperatureDiscription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //FORMULA FOR CELSIUS//
          let celsius = (temperature - 32) * (5/9);
          //Set Icon//
          setIcons(icon, document.querySelector('.icon'));
          //Change temperature to Celsius/Farenheit//
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons ({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});