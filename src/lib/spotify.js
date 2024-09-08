import axios from 'axios';
import { Buffer } from 'buffer';

const CLIENT_ID = 'b56b761c06c840a89acb1cc2a7fea400';
const CLIENT_SECRET = '432897501dc1457c87eff36971a91b08';
let REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN; // Store and retrieve securely from environment or session
let accessToken = null;
let tokenExpiration = null;

async function getAccessToken() {
  // Check if the token is still valid
  if (accessToken && tokenExpiration > Date.now()) {
    return accessToken;
  }

  // Token is expired or not set, refresh it
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

    // Update the global access token and expiration time
    accessToken = response.data.access_token;
    tokenExpiration = Date.now() + (response.data.expires_in * 1000);

    // Return the new access token
    return accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
    if (error.response && error.response.data && error.response.data.error === 'invalid_grant') {
      // Handle invalid refresh token scenario
      throw new Error('Invalid refresh token. User needs to re-authenticate.');
    }
    throw new Error('Could not refresh access token');
  }
}

export async function searchSongs(query) {
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

    // Return the search results
    return response.data;
  } catch (error) {
    console.error('Error searching songs:', error.response ? error.response.data : error.message);
    return null;
  }
}

/**
 * Fetches details of a specific song by its ID.
 * @param {string} songId - The ID of the song to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the song details.
 */
export async function fetchSong(songId) {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${songId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Return the song details
    return response.data;
  } catch (error) {
    console.error(`Error fetching song with ID "${songId}":`, error.response ? error.response.data : error.message);
    return null;
  }
}
