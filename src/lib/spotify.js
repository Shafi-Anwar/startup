import axios from 'axios';

// Replace these with your actual credentials
const CLIENT_ID = 'b56b761c06c840a89acb1cc2a7fea400';
const CLIENT_SECRET = '432897501dc1457c87eff36971a91b08';
// This token should be updated when it becomes invalid
let REFRESH_TOKEN = 'BQAiGCA9N7wYFBuQl9SXqZRwyoQQ8YRqFzVUKegtRowtv8rC7TDU6v1p3MpeJnyIir2-nMX1G-iYfY8y7U9JjPRvP5-bJVOa_HhciYrkzTT3Za9olKI",'
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
    // Log detailed error information
    console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
    throw new Error('Could not refresh access token');
  }
}

export async function searchSongs(query) {
  try {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Log error details for debugging
      const errorText = await response.text();
      console.error(`Failed to search songs with query "${query}": ${response.status} ${response.statusText}`, errorText);
      return null;
    }

    // Return the search results
    return await response.json();
  } catch (error) {
    // Log and rethrow the error for handling in the calling code
    console.error('Error searching songs:', error.message);
    return null;
  }
}
