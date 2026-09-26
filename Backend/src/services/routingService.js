const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";

const getRoute = async (startingLocation, destinationLocation) => {
    if (!startingLocation || !destinationLocation) {
        throw new Error("Starting and destination coordinates are required.");
    }

    const {
        latitude: startLat,
        longitude: startLon
    } = startingLocation;

    const {
        latitude: destLat,
        longitude: destLon
    } = destinationLocation;

    // OSRM expects coordinates as longitude,latitude
    const coordinates = `${startLon},${startLat};${destLon},${destLat}`;

    const url = `${OSRM_URL}/${coordinates}`;

    const response = await fetch(
        `${url}?overview=full&geometries=geojson&steps=false`
    );

    if (!response.ok) {
        throw new Error(`OSRM request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
        throw new Error(
            `OSRM could not find a route. Response: ${data.code || "Unknown error"}`
        );
    }

    const route = data.routes[0];

    return {
        distanceKm: Number((route.distance / 1000).toFixed(2)),
        durationMinutes: Math.round(route.duration / 60),
        geometry: route.geometry
    };
};

module.exports = {
    getRoute
};