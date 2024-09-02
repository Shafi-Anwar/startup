"use client";
import React, { useEffect, useState } from 'react';

const SongPlayer = ({ song = {} }) => {
    const { uri = '', name = '' } = song;
    const trackId = uri ? uri.split(':').pop() : '';
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const initializePlayer = () => {
            if (window.Spotify) {
                window.onSpotifyWebPlaybackSDKReady = () => {
                    const token = process.env.NEXT_PUBLIC_SPOTIFY_TOKEN;

                    const newPlayer = new window.Spotify.Player({
                        name: 'Web Playback SDK Player',
                        getOAuthToken: cb => { cb(token); },
                        volume: 0.5
                    });

                    // Error handling
                    newPlayer.addListener('initialization_error', ({ message }) => console.error('Initialization Error:', message));
                    newPlayer.addListener('authentication_error', ({ message }) => console.error('Authentication Error:', message));
                    newPlayer.addListener('account_error', ({ message }) => console.error('Account Error:', message));
                    newPlayer.addListener('playback_error', ({ message }) => console.error('Playback Error:', message));

                    // Playback state changes
                    newPlayer.addListener('player_state_changed', state => {
                        if (state) {
                            setIsPlaying(!state.paused);
                        }
                    });

                    // Player ready
                    newPlayer.addListener('ready', ({ device_id }) => {
                        console.log('Player is ready');
                        setPlayer(newPlayer);
                        if (trackId) {
                            newPlayer.play({
                                uris: [`spotify:track:${trackId}`]
                            }).then(() => {
                                console.log('Playback started');
                            }).catch(err => {
                                console.error('Error starting playback:', err);
                            });
                        }
                    });

                    // Player not ready
                    newPlayer.addListener('not_ready', ({ device_id }) => console.log('Device is not ready'));

                    newPlayer.connect();
                };
            } else {
                console.error('Spotify Web Playback SDK not loaded');
            }
        };

        initializePlayer();

        return () => {
            if (player) {
                player.disconnect();
            }
        };
    }, [trackId]);

    const handlePlayPause = () => {
        if (player) {
            player.togglePlay().then(() => {
                console.log(isPlaying ? 'Paused playback' : 'Resumed playback');
                setIsPlaying(!isPlaying);
            }).catch(err => {
                console.error('Error toggling playback:', err);
            });
        }
    };

    return (
        <div className="mt-6">
            {trackId ? (
                <div className="text-center">
                    <p className="text-white">Now playing: {name}</p>
                    <div className="mt-4">
                        <button onClick={handlePlayPause} className={`bg-${isPlaying ? 'red' : 'green'}-500 text-white px-4 py-2 rounded`}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-700">No song available to play</p>
            )}
        </div>
    );
};

export default SongPlayer;
