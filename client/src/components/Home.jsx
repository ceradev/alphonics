import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../layouts/Layout';

const Home = () => {
    const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null); // Nuevo estado para almacenar la playlist seleccionada
    const location = useLocation(); // Utilizamos useLocation para obtener la ubicación actual

    const CLIENT_ID = "e269b673d31546e6a6b44f63f4aeadc0";
    const CLIENT_SECRET = "1f1ca0920b104536bb29efd3d84c784a";
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const response = await fetch("https://accounts.spotify.com/api/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch access token");
                }
                const data = await response.json();
                setAccessToken(data.access_token);
            } catch (error) {
                console.error("Error fetching access token:", error);
            }
        };

        fetchAccessToken();
    }, []);

    useEffect(() => {
        const fetchFeaturedPlaylists = async () => {
            try {
                const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch featured playlists");
                }
                const data = await response.json();
                setFeaturedPlaylists(data.playlists.items);
            } catch (error) {
                console.error("Error fetching featured playlists:", error);
            }
        };

        if (accessToken) {
            fetchFeaturedPlaylists();
        }
    }, [accessToken]);

    useEffect(() => {
        const fetchUserPlaylists = async () => {
            try {
                const response = await fetch("https://api.spotify.com/v1/me/playlists", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user playlists");
                }
                const data = await response.json();
                setUserPlaylists(data.items);
            } catch (error) {
                console.error("Error fetching user playlists:", error);
            }
        };

        if (accessToken) {
            fetchUserPlaylists();
        }
    }, [accessToken]);

    useEffect(() => {
        const fetchNewReleases = async () => {
            try {
                const response = await fetch("https://api.spotify.com/v1/browse/new-releases", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch new releases");
                }
                const data = await response.json();
                setNewReleases(data.albums.items);
            } catch (error) {
                console.error("Error fetching new releases:", error);
            }
        };

        if (accessToken) {
            fetchNewReleases();
        }
    }, [accessToken]);

    // Saludo dependiendo de la hora del día
    const getGreeting = () => {
        const currentTime = new Date().getHours();
        if (currentTime < 12) {
            return "mañana";
        } else if (currentTime < 18) {
            return "tarde";
        } else {
            return "noche";
        }
    };

    // Mensaje de bienvenida personalizado
    const welcomeMessage = () => {
        const userName = "nombre de usuario"; // Reemplazar con el nombre de usuario real
        return `Hola ${userName}, buenas ${getGreeting()}. ¿Qué te apetece escuchar hoy?`;
    };

    // Función para manejar la selección de una playlist
    const handlePlaylistSelect = (playlist) => {
        setSelectedPlaylist(playlist); // Almacena la playlist seleccionada en el estado
    };

    return (
        <Layout>
            <div className="flex flex-wrap gap-4 p-4">
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4">{welcomeMessage()}</h1>
                    <h2 className="text-xl font-bold mb-4">Featured Playlists</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {featuredPlaylists.map((playlist, index) => (
                            <Link
                            key={index}
                            to={`/inside-playlists/${playlist.id}`} // Ajusta la ruta para que coincida con el formato definido en App.js
                            className="playlist-link"
                            onClick={() => handlePlaylistSelect(playlist)}
                        >
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img src={playlist.images[0]?.url} alt={playlist.name} className="h-48 w-full object-cover cursor-pointer" onClick={() => handlePlaylistSelect(playlist)} />
                                    <div className="p-4 cursor-pointer" onClick={() => handlePlaylistSelect(playlist)}>
                                        <h2 className="text-xl font-bold">{playlist.name}</h2>
                                        <p className="text-gray-600 text-sm">Total tracks: {playlist.tracks.total}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4">Your Playlists</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {userPlaylists.map((playlist, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden" onClick={() => handlePlaylistSelect(playlist)}>
                                <img src={playlist.images[0]?.url} alt={playlist.name} className="h-48 w-full object-cover cursor-pointer" onClick={() => handlePlaylistSelect(playlist)} />
                                <div className="p-4 cursor-pointer" onClick={() => handlePlaylistSelect(playlist)}>
                                    <h2 className="text-xl font-bold">{playlist.name}</h2>
                                    <p className="text-gray-600 text-sm">Total tracks: {playlist.tracks.total}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4">New Releases</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {newReleases.map((album, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img src={album.images[0]?.url} alt={album.name} className="h-48 w-full object-cover" />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold">{album.name}</h2>
                                    <p className="text-gray-600 text-sm">{album.artists[0].name}</p>
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
