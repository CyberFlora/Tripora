const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

const geocodeLocation = async (location) => {
    if (!location || !location.trim()) {
        throw new Error("Location is required for geocoding.");
    }

    const url = new URL(NOMINATIM_URL);

    url.searchParams.set("q", location);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "1");
    url.searchParams.set("countrycodes", "in");

    const response = await fetch(url, {
        headers: {
            "User-Agent": "Tripora/1.0 (travel-planning-hackathon-project)"
        }
    });

    if (!response.ok) {
        throw new Error(`Nominatim request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
        throw new Error(`Location not found: ${location}`);
    }

    return {
        latitude: Number(data[0].lat),
        longitude: Number(data[0].lon),
        displayName: data[0].display_name
    };
};

const geocodeTripLocations = async (startingAddress, destinationCity) => {
    const startingLocation = await geocodeLocation(startingAddress);

    // Small delay so we don't send requests too quickly.
    await new Promise(resolve => setTimeout(resolve, 1100));

    const destinationLocation = await geocodeLocation(destinationCity);

    return {
        startingLocation,
        destinationLocation
    };
};

module.exports = {
    geocodeLocation,
    geocodeTripLocations
};