import { GOOGLE_MAPS_API_KEY } from '@env';

if (!GOOGLE_MAPS_API_KEY) {
    throw new Error(
        'You must provide an {GOOGLE_MAPS_API_KEY} in your environment variable config!'
    );
}

export function getMapPreview(lat: number, lng: number) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;

    console.log(imagePreviewUrl);
    return imagePreviewUrl;
}

export async function getAddress(lat: number, lng: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch address!');
    }

    const data = await response.json();

    if (data.results.length === 0) {
        throw new Error(
            'Unable to get address information for coordinates:' +
                JSON.stringify({ lat, lng }, null, 2)
        );
    }

    const address = data.results[0].formatted_address;

    return address;
}
