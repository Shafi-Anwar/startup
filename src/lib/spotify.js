import { Buffer } from 'buffer';

let cachedAccessToken = null;
let tokenExpiry = null;

// Function to fetch an access token from Spotify
async function fetchAccessToken() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to get access token:', errorText);
            throw new Error('Failed to get access token');
        }

        const data = await response.json();
        cachedAccessToken = data.access_token;
        tokenExpiry = Date.now() + data.expires_in * 1000; // Set expiry time

        console.log('Access Token Retrieved:', cachedAccessToken);
        return cachedAccessToken;
    } catch (error) {
        console.error('Error getting access token:', error.message);
        throw new Error('Unable to authenticate with Spotify');
    }
}

// Function to get access token with retry logic
export async function getAccessToken() {
    if (cachedAccessToken && tokenExpiry > Date.now()) {
        return cachedAccessToken;
    }

    // Fetch a new token if the cached token is expired or not available
    return fetchAccessToken();
}

// Function to fetch song details by ID
export async function fetchSong(id, accessToken) {
    try {
        let response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.status === 401) {
            console.warn('Token expired, refreshing token...');
            const newAccessToken = await fetchAccessToken(); // Fetch a new token
            response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
                headers: {
                    'Authorization': `Bearer ${newAccessToken}`,
                },
            });
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch song with ID ${id}: ${response.status} ${response.statusText}`, errorText);
            return null;
        }

        const data = await response.json();
        console.log('Fetched Song Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching song details:', error.message);
        return null;
    }
}

// Function to fetch artist details by ID
export async function fetchArtist(id, accessToken) {
    try {
        let response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.status === 401) {
            console.warn('Token expired, refreshing token...');
            const newAccessToken = await fetchAccessToken(); // Fetch a new token
            response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
                headers: {
                    'Authorization': `Bearer ${newAccessToken}`,
                },
            });
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch artist with ID ${id}: ${response.status} ${response.statusText}`, errorText);
            return null;
        }

        const data = await response.json();
        console.log('Fetched Artist Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching artist details:', error.message);
        return null;
    }
}
