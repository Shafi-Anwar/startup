"use client";
import React, { useEffect } from 'react';

const SongPlayer = ({ song = {} }) => {
    const { uri = '', name = '' } = song;
    const trackId = uri ? uri.split(':').pop() : '';

    useEffect(() => {
        const initializePlayer = () => {
            if (window.Spotify) {
                window.onSpotifyWebPlaybackSDKReady = () => {
                    const token = 'YOUR_ACCESS_TOKEN'; // Replace with your actual access token

                    const player = new window.Spotify.Player({
                        name: 'Web Playback SDK Quick Start Player',
                        getOAuthToken: cb => { cb(token); }
                    });

                    player.addListener('initialization_error', ({ message }) => console.error(message));
                    player.addListener('authentication_error', ({ message }) => console.error(message));
                    player.addListener('account_error', ({ message }) => console.error(message));
                    player.addListener('playback_error', ({ message }) => console.error(message));

                    player.addListener('player_state_changed', state => console.log(state));

                    player.addListener('ready', ({ device_id }) => {
                        console.log('Ready to play');

                        // Play a track
                        player.play({
                            uris: [`spotify:track:${trackId}`]
                        }).then(() => {
                            console.log('Playback started');
                        }).catch(err => {
                            console.error('Error starting playback:', err);
                        });
                    });

                    player.addListener('not_ready', ({ device_id }) => console.log('Device is not ready'));

                    player.connect();
                };
            } else {
                console.error('Spotify Web Playback SDK not loaded');
            }
        };

        initializePlayer();
    }, [trackId]);

    return (
        <div className="mt-6">
            {trackId ? (
                <div className="text-center">
                    <p className="text-white">Now playing: {name}</p>
                    {/* The Spotify player UI will be handled by the SDK */}
                </div>
            ) : (
                <p className="text-center text-gray-700">No song available to play</p>
            )}
        </div>
    );
};

export default SongPlayer;
