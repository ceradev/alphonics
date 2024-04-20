import React from 'react';
import Layout from '../layouts/Layout';
import SpotifyWebApi from 'spotify-web-api-js';
import { useState, useEffect } from 'react';

const spotifyApi = new SpotifyWebApi();

const Home = () => {
    const [topTracks, setTopTracks] = useState([]);
    const [newReleases, setNewReleases] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await spotifyApi.setAccessToken("1f1ca0920b104536bb29efd3d84c784a");

                const topTracksResponse = await spotifyApi.getMyTopTracks();
                setTopTracks(topTracksResponse.body.items);

                const newReleasesResponse = await spotifyApi.getNewReleases({
                    limit: 12
                });
                setNewReleases(newReleasesResponse.body.albums.items);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <div className="flex flex-wrap gap-4 p-4">
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4">Top Tracks</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {topTracks.map((track, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <img
                                    src={track.album.images[1].url}
                                    alt={track.album.name}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold">
                                        {track.name}
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        {track.artists[0].name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4">New Releases</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {newReleases.map((album, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <img
                                    src={album.images[0].url}
                                    alt={album.name}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold">
                                        {album.name}
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        {album.artists[0].name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;