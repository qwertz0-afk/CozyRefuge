const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());          
app.use(express.text());  

port = process.env.PORT || 3000;
let weather = "off";

app.post('/', (request, response) => {
    const receivedData = request.body;
    let decision = "no";
    if (receivedData == "amine") {
        decision = "yes";
    }
    response.send(decision);
});
app.get('/weather', (request, response) => {
    let res;
    if (weather == "off") {
        res = "off";
    }
    else {
        res = "on";
    }
    response.send(res);
});
app.post('/weather_shown', (request, response) => {
    weather = "on";
    response.sendStatus(204);
});
app.post('/weather_hidden', (request, response) => {
    weather = "off";
    response.sendStatus(204);
});
app.get('/getweather', async (request, response) => {
    try {
        const apiResponse = await fetch("https://wttr.in/?format=j1");
        if (!apiResponse.ok) {
            throw new Error("error");
        }
        const data = await apiResponse.json();
        const country = data.nearest_area[0].country[0].value;
        const city = data.nearest_area[0].areaName[0].value;
        const temp = data.current_condition[0].temp_C;
        const description = data.current_condition[0].weatherDesc[0].value;

        const countryNcitystring = `${country}, ${city}`;
        const tempstring= `${temp} °C`;
        const descriptionstring = `${description}`;

        const weatherJson = {
            countrycity: countryNcitystring,
            temp: tempstring,
            description: descriptionstring
        };
        response.json(weatherJson);
    } catch(error) {
       console.error("Weather update failed :", error.message);
    }
    
});

app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));