const axios = require('axios');
const { Buffer } = require('buffer');

const CLIENT_ID = process.env.SPOTIFY_CLIENT; // Ensure this is set in your environment
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
let REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
let accessToken = null;
let tokenExpiration = null;

async function getAccessToken() {
    if (accessToken && tokenExpiration > Date.now()) {
        return accessToken;
    }
    return await refreshAccessToken();
}

async function refreshAccessToken() {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: REFRESH_TOKEN,
        }), {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        accessToken = response.data.access_token;
        tokenExpiration = Date.now() + (response.data.expires_in * 1000);
        return accessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
        throw new Error('Could not refresh access token');
    }
}

async function searchSongs(query) {
    try {
        const token = await getAccessToken();
        const response = await axios.get('https://api.spotify.com/v1/search', {
            params: {
                q: query,
                type: 'track',
            },
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching songs:', error.response ? error.response.data : error.message);
        return null;
    }
}

export { searchSongs };
