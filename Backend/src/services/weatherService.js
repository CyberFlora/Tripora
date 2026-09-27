const dns = require("node:dns");

dns.setDefaultResultOrder("ipv4first");

const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

const getWeather = async (destinationLocation, startDate, endDate) => {
    if (!destinationLocation) {
        throw new Error("Destination location is required for weather.");
    }

    if (!startDate || !endDate) {
        throw new Error("Start date and end date are required for weather.");
    }

    const url = new URL(OPEN_METEO_URL);

    url.searchParams.set("latitude", destinationLocation.latitude);
    url.searchParams.set("longitude", destinationLocation.longitude);

    url.searchParams.set(
        "daily",
        [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_sum",
            "precipitation_probability_max"
        ].join(",")
    );

    // Open-Meteo provides forecasts up to 16 days ahead.
    const today = new Date();
    const maxForecastDate = new Date(today);
    maxForecastDate.setDate(today.getDate() + 15);

    const maxForecastDateString = maxForecastDate
        .toISOString()
        .split("T")[0];

    const safeEndDate =
        endDate > maxForecastDateString
            ? maxForecastDateString
            : endDate;

    // If the trip starts beyond the live forecast window,
    // return an empty weather array instead of failing the whole trip.
    if (startDate > maxForecastDateString) {
        return [];
    }

    url.searchParams.set("start_date", startDate);
    url.searchParams.set("end_date", safeEndDate);
    url.searchParams.set("timezone", "auto");

    const response = await fetch(url);

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            `Open-Meteo request failed: ${response.status} - ${errorText}`
        );
    }

    const data = await response.json();

    if (!data.daily || !data.daily.time) {
        throw new Error("Weather data was not returned.");
    }

    const weather = data.daily.time.map((date, index) => ({
        date,
        weatherCode: data.daily.weather_code[index],
        temperatureMax: data.daily.temperature_2m_max[index],
        temperatureMin: data.daily.temperature_2m_min[index],
        precipitationMm: data.daily.precipitation_sum[index],
        precipitationProbability:
            data.daily.precipitation_probability_max[index]
    }));

    return weather;
};

module.exports = {
    getWeather
};