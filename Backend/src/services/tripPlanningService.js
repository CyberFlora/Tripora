const {
    geocodeTripLocations
} = require("./geocodingService");

const {
    getRoute
} = require("./routingService");

const {
    getWeather
} = require("./weatherService");


const buildTripData = async ({
    startingAddress,
    destinationCity,
    startDate,
    endDate
}) => {

    // 1. Get coordinates for starting point and destination
    const locations = await geocodeTripLocations(
        startingAddress,
        destinationCity
    );

    // 2. Get road distance, travel time and route geometry
    const route = await getRoute(
        locations.startingLocation,
        locations.destinationLocation
    );

    // 3. Get weather for the destination
    const weather = await getWeather(
        locations.destinationLocation,
        startDate,
        endDate
    );

    return {
        locations,
        route,
        weather
    };
};


module.exports = {
    buildTripData
};