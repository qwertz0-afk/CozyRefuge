const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());          
app.use(express.text());  

port = process.env.PORT || 3000;

app.post('/pass', (request, response) => {
    const receivedData = request.body;
    let decision = "no";
    if (receivedData == "amine") {
        decision = "yes";
    }
    response.send(decision);
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
app.get('/', (request, response) => {
    response.sendStatus(200);
});
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));