window.addEventListener("load", () => {
    let long;
    let lat;

    // Divs from HTML
    let city_name = document.querySelector('.city-title'); // Nazwa miasta
    let cur_date = document.querySelector('.current-date'); // Dzisiejsza data
    let sunrise_sunset = document.querySelector('.sun-rise-set'); // Wschód Zachód godzina
    let cur_pressure = document.querySelector('.pressure'); // Ciśnienie
    let html_icon = document.getElementById('icon'); // Ikona dzisiaj
    let cur_temperature = document.querySelector('.main-info-temperature'); // Temperatura teraz
    let wind_speed = document.querySelector('.wind-speed'); // Prędkość wiatru
    let cur_humidity = document.querySelector('.humidity'); // Wilgotność powietrza

    let html_tomorrow_temperature = document.querySelector('.tomorrow-temperature'); // Temperatura jutro
    let html_tomorrow_icon = document.getElementById('tomorrow-icon'); // Ikona jutro

    let html_after_tomorrow_temperature = document.querySelector('.after-tomorrow-temperature'); // Temperatura pojutrze
    let html_after_tomorrow_icon = document.getElementById('after-tomorrow-icon'); // Ikona pojutrze

    let ul_cities_list = document.querySelectorAll('.cities-list li'); // Lista miast

    let air_pm10 = document.querySelector('#air-pollution-pm10'); // Zanieczyszczenie pm10
    let air_pm25 = document.querySelector('#air-pollution-pm25'); // Zanieczyszczenie pm25
    let air_station = document.querySelector('.air-pollution-station'); // Zanieczyszczenie stacja

    
    // Show Weather Function
    function showWeather(long, lat) {
        const proxy = `https://cors-anywhere.herokuapp.com/`; // Bez proxy Darksky blokuje połączenie
        const api = `${proxy}https://api.darksky.net/forecast/1103c310eb977ef805f5fffd2a88cfe5/${lat},${long}?units=si`;
        const air = `${proxy}https://api.openaq.org/v1/latest?coordinates=${lat},${long}`;

        fetch(air)
            .then(airData => {
                return airData.json();
            })

            .then(airData =>{
                 console.log(airData);
                 let pm10 = 'brak danych';
                 let pm25 = 'brak danych';
                 const airPollution = airData.results[0]
                 const station = airPollution.location;
                 
                 for (x in airPollution.measurements){
                    const item = airPollution.measurements[x];
                    const item_value = airPollution.measurements[x].value
                    if (item.parameter == 'pm10'){pm10 = Math.round(item_value)}
                    if (item.parameter == 'pm25'){pm25 = Math.round(item_value)}
                 }
                 
                 air_station.textContent = station;
                 air_pm10.innerHTML = '<span class="p-air">Pył pm10:</span> ' + pm10;
                 air_pm25.innerHTML = '<span class="p-air">Pył pm2,5:</span> ' + pm25;
                 
                if (pm10 < 21){air_pm10.className='';air_pm10.classList.toggle('very-good');}
                else if (pm10 < 51){air_pm10.className='';air_pm10.classList.toggle('good');}
                else if (pm10 < 81){air_pm10.className='';air_pm10.classList.toggle('moderate');}
                else if (pm10 < 111){air_pm10.className='';air_pm10.classList.toggle('sufficient');}
                else if (pm10 < 151){air_pm10.className='';air_pm10.classList.toggle('bad');}
                else if (pm10 > 150){air_pm10.className='';air_pm10.classList.toggle('very-bad');}

                if (pm25 < 14){air_pm25.className='';air_pm25.classList.toggle('very-good');}
                else if (pm25 < 36){air_pm25.className='';air_pm25.classList.toggle('good');}
                else if (pm25 < 56){air_pm25.className='';air_pm25.classList.toggle('moderate');}
                else if (pm25 < 76){air_pm25.className='';air_pm25.classList.toggle('sufficient');}
                else if (pm25 < 111){air_pm25.className='';air_pm25.classList.toggle('bad');}
                else if (pm25 > 110){air_pm25.className='';air_pm25.classList.toggle('very-bad');}
                    
                
            })
        
        fetch(api)
            .then(data => {
                return data.json();
            })

            .then(data => {
                console.log(data);
                const daily_array = data.daily.data;

                // Today info
                const {
                    icon,
                    time,
                    temperature,
                    windSpeed,
                    humidity,
                    pressure,
                } = data.currently;

                //Current Day
                var currentDate = new Date(time * 1000);

                var currentDay = currentDate.getDate();
                if (currentDay < 10) {
                    currentDay = "0" + currentDay;
                }
                var currentMonth = currentDate.getMonth();

                //Sunrise & Sunset Time
                const todaySunriseTime = daily_array[0].sunriseTime;
                const todaySunsetTime = daily_array[0].sunsetTime;

                var sunriseDate = new Date(todaySunriseTime * 1000);
                var sunriseHour = sunriseDate.getHours();
                var sunriseMinutes = sunriseDate.getMinutes();
                if (sunriseMinutes < 10) {
                    sunriseMinutes = "0" + sunriseMinutes;
                }

                var sunsetDate = new Date(todaySunsetTime * 1000);
                var sunsetHour = sunsetDate.getHours();
                var sunsetMinutes = sunsetDate.getMinutes();
                if (sunsetMinutes < 10) {
                    sunsetMinutes = "0" + sunsetMinutes;
                }

                // Daily info
                const tomorrow_temperature = daily_array[2].temperatureLow;
                const after_tomorrow_temperature = daily_array[3].temperatureLow;

                const tomorrowIcon = daily_array[2].icon;
                const afterTomorrowIcon = daily_array[3].icon;

                //**** Set DOM elements from API ****
                // Today (first column)
                seticons(tomorrowIcon, html_tomorrow_icon);
                seticons(afterTomorrowIcon, html_after_tomorrow_icon);
                seticons(icon, html_icon);
                cur_temperature.textContent = Math.round(temperature);
                wind_speed.textContent = windSpeed;
                cur_humidity.textContent = humidity;
                cur_pressure.textContent = Math.round(pressure) + " hPa";
                sunrise_sunset.textContent = sunriseHour + ":" + sunriseMinutes + " - " + sunsetHour + ":" + sunsetMinutes;
                cur_date.textContent = currentDay + "." + currentMonth;

                // Tomorrow (second column)
                html_tomorrow_temperature.innerHTML = Math.round(tomorrow_temperature) + `<span class="h6 ml-1">°C</span>`;

                // After tomorrow (third column)
                html_after_tomorrow_temperature.innerHTML = Math.round(after_tomorrow_temperature) + `<span class="h6 ml-1">°C</span>`;

            })
    }

    function seticons(icon, iconID) {
        const skycons = new Skycons({
            color: "#ffffff"
        })
        const currentIcon = icon.replace(/-/g, "_").toUpperCase()
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }



    // When page load, coordinates for Kraków
    long = 19.944544;
    lat = 50.049683;

    showWeather(long, lat);

    // cityName : [latitude, longitutde]
    var coordinatesForCities = {
        Warszawa: [52.237049, 21.017532],
        Łódź: [51.759445, 19.457216],
        Kraków: [50.049683, 19.944544],
        Poznań: [52.409538, 16.931992],
        Wrocław: [51.107883, 17.038538],
        Szczecin: [53.428543, 14.552812],
        Gdańsk: [54.372158, 18.638306],
        Bydgoszcz: [53.123482, 18.008438],
        Lublin: [51.246452, 22.568445],
        Rzeszów: [50.041187, 21.999121],
    }

    // Cities List 'li' onclick
    last_target = 'Kraków';
    last_li_element = document.getElementById('default-element');
    last_li_element.classList.add('checked-li') 

    ul_cities_list.forEach((item, index) => {
    item.addEventListener('click', (event) => {

        li_element = event.currentTarget;
        new_target = li_element.innerHTML;

        if (last_li_element != li_element){
            
            city_name.textContent = new_target; // change city name
            li_element.classList.add('checked-li') 
            last_li_element.classList.remove('checked-li') 
            last_li_element = li_element;

            x = coordinatesForCities[new_target][1];
            y = coordinatesForCities[new_target][0];
            showWeather(x, y);
        };
     });
});

})
