import Layout from "../../components/layouts/Layout";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN");

  useEffect(() => {
    if (sessionStorage.getItem("USER_ACCESS_TOKEN") !== null) {
      setIsAuthenticated(true);

      const decodedToken = jwtDecode(
        sessionStorage.getItem("USER_ACCESS_TOKEN")
      );
      if (decodedToken.exp < Date.now() / 1000) {
        sessionStorage.removeItem("USER_ACCESS_TOKEN");
        setIsAuthenticated(false);
      }

      const userId = decodedToken.id;

      const fetchUserName = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/v1/users/${userId}`,
            {
              headers: {
                Authorization: sessionStorage.getItem("USER_ACCESS_TOKEN"),
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user name");
          }
          const data = await response.json();

          setUserName(data.user.username);
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      };
      fetchUserName();
    } else {
      setIsAuthenticated(false);
    }
  }, [accessToken, navigate]);

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

    fetchFeaturedPlaylists();
  }, [accessToken, navigate]);

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

    fetchNewReleases();
  }, [accessToken]);

  // Saludo dependiendo de la hora del día
  const getGreeting = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12 && currentTime >= 6) {
      return "morning";
    } else if (currentTime < 18 && currentTime >= 12) {
      return "afternoon";
    } else if (currentTime < 24 && currentTime >= 18) {
      return "evening";
    } else {
      return "night";
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
              <h1 className="text-2xl font-bold mb-4 text-center text-red-500 tracking-tight animate-pulse">
                Hello {userName}, Good {getGreeting()}, What would you like to
                listen to?
              </h1>
              <h2 className="text-xl font-bold mt-8 mb-4">
                Featured Playlists
              </h2>
              <Slider {...settings}>
                {featuredPlaylists.map((playlist, index) => (
                  <Link
                    key={index}
                    onClick={() => handlePlaylistSelect(playlist)}
                  >
                    <div className="bg-gradient-to-br mr-2 ml-2 from-gray-100 to-gray-200 rounded-lg shadow-md overflow-hidden aspect-w-1 aspect-h-1 md:aspect-none transform transition-all duration-300 scale-100 hover:shadow-xl hover:scale-105 hover:text-red-500">
                      <img
                        src={playlist.images[0]?.url}
                        alt={playlist.name}
                        loading="lazy"
                        className="h-48 w-full object-cover cursor-pointer"
                        onClick={() => handlePlaylistSelect(playlist)}
                      />
                      <div
                        className="p-4 cursor-pointer hover:text-red-500 transform transition-all duration-300 scale-100 hover:scale-105"
                        onClick={() => handlePlaylistSelect(playlist)}
                      >
                        <Link
                          to={`/playlist/${playlist.id}`}
                          className="text-xl font-bold mb-2 cursor-pointer"
                        >
                          {playlist.name}
                        </Link>
                        <p className="text-gray-600 text-sm">
                          Total tracks: {playlist.tracks.total}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
            <div className="w-full">
              <h2 className="text-xl font-bold mt-8 mb-4">New Releases</h2>
              <Slider {...settings}>
                {newReleases.map((album, index) => (
                  <div key={index} className="w-full">
                    <div className="bg-gradient-to-br mr-2 ml-2 from-gray-100 to-gray-200 rounded-lg shadow-md overflow-hidden aspect-w-1 aspect-h-1 md:aspect-none transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                      <img
                        src={album.images[0]?.url}
                        alt={album.name}
                        loading="lazy"
                        className="h-48 w-full object-cover cursor-pointer"
                      />
                      <div className="p-4">
                        <Link
                          to={`/album/${album.id}`}
                          className="text-xl font-bold hover:text-red-500 cursor-pointer transition-colors duration-300"
                        >
                          {album.name}
                        </Link>
                        <ul className="mt-2">
                          {album.artists.map((artist, index) => (
                            <li key={index} className="inline-block mr-2 mb-2">
                              <Link
                                to={`/artist/${artist.id}`}
                                className="text-gray-600 text-sm hover:text-red-500 cursor-pointer transition-colors duration-300"
                              >
                                {artist.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold text-center tracking-tight animate-pulse animate-fade-in-down text-red-500">
              Welcome to Alphonics!
            </h1>
            <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-center">
              To enjoy listening to, searching for or discovering new music, log
              in or register if you are a new user.
            </p>
            <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-center">
              ¡We welcome you!
            </p>
            <div className="mt-8">
              <a
                href="/subscriptions"
                className="bg-gradient-to-r from-red-700 via-red-500 to-gray-300 text-white font-medium text-lg hover:bg-gradient-to-br focus:outline-none focus:ring-offset focus:ring-4 focus:ring-red-30 py-3 px-6 rounded-lg"
              >
                See subscriptions here
              </a>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
