import Layout from "../../components/layouts/Layout";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // Nuevo estado para almacenar la playlist seleccionada
  const location = useLocation(); // Utilizamos useLocation para obtener la ubicación actual

  useEffect(() => {
    if (sessionStorage.getItem("USER_ACCESS_TOKEN") !== null) {
      setIsAuthenticated(true);
      setAccessToken(sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN"));
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const fetchFeaturedPlaylists = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/featured-playlists",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
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
    const fetchNewReleases = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/new-releases",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
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
      return "morning";
    } else if (currentTime < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  // Mensaje de bienvenida personalizado
  const welcomeMessage = () => {
    const userName = "Anonymous"; // Reemplazar con el nombre de usuario real
    return `Hello ${userName}, good ${getGreeting()}. ¿Do you want to listen to some music?`;
  };

  // Función para manejar la selección de una playlist
  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist); // Almacena la playlist seleccionada en el estado
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isAuthenticated ? (
          <div className="flex flex-wrap gap-4 p-4 md:p-8">
            <div className="w-full">
              <h1 className="text-2xl font-bold mb-4 text-center text-red-500 capitalize tracking-tight animate-pulse">{welcomeMessage()}</h1>
              <h2 className="text-xl font-bold mb-4">Featured Playlists</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {featuredPlaylists.map((playlist, index) => (
                  <Link
                    key={index}
                    to={`/inside-playlists/${playlist.id}`} // Ajusta la ruta para que coincida con el formato definido en App.js
                    className="playlist-link"
                    onClick={() => handlePlaylistSelect(playlist)}
                  >
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-md overflow-hidden aspect-w-1 aspect-h-1 md:aspect-none transform transition-all duration-300 scale-100 hover:shadow-xl hover:scale-105">
                      <img
                        src={playlist.images[0]?.url}
                        alt={playlist.name}
                        className="h-48 w-full object-cover cursor-pointer"
                        onClick={() => handlePlaylistSelect(playlist)}
                      />
                      <div
                        className="p-4 cursor-pointer hover:text-red-500 transform transition-all duration-300 scale-100 hover:scale-105"
                        onClick={() => handlePlaylistSelect(playlist)}
                      >
                        <h2 className="text-xl font-bold">{playlist.name}</h2>
                        <p className="text-gray-600 text-sm">
                          Total tracks: {playlist.tracks.total}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-full">
              <h1 className="text-xl font-bold mb-4">New Releases</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {newReleases.map((album, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-md overflow-hidden aspect-w-1 aspect-h-1 md:aspect-none transform transition-all duration-300 scale-100 hover:shadow-xl hover:scale-105"
                  >
                    <img
                      src={album.images[0]?.url}
                      alt={album.name}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-bold">{album.name}</h2>
                      <p className="text-gray-600 text-sm">
                        {album.artists[0].name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold text-center tracking-tight animate-pulse animate-fade-in-down text-red-500">
              ¡Bienvenido a Alphonics!
            </h1>
            <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-center">
              Para poder disfrutar de escuchar, buscar o descubrir nueva música,
              inicia sesión o registrate si eres un nuevo usuario.
            </p>
            <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-center">
              ¡Te damos la bienvenida!
            </p>
            <div className="mt-8">
              <a
                href="/subscriptions"
                className="bg-gradient-to-r from-red-700 via-red-500 to-gray-300 text-white font-medium text-lg hover:bg-gradient-to-br focus:outline-none focus:ring-offset focus:ring-4 focus:ring-red-30 py-3 px-6 rounded-lg"
              >
                Ver planes de suscripción
              </a>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
