import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; //Link from "react-router-dom";
import PropTypes from "prop-types";
const PlaylistList = ({ selectedGenre, setView, setSelectedGenre }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN");

  PlaylistList.propTypes = {
    selectedGenre: PropTypes.object.isRequired,
    setView: PropTypes.func.isRequired,
    setSelectedGenre: PropTypes.func.isRequired,
  };

  useEffect(() => {
    // Obtener el token de acceso de la sesión actual
    window.scrollTo(0, 0);
    if (sessionStorage.getItem("USER_ACCESS_TOKEN") === null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch playlists by genre
    const fetchPlaylistsByGenre = async () => {
      console.log("Selected genre:", selectedGenre); // Logging selectedGenre
      if (!accessToken || !selectedGenre) return;
      try {
        const accessToken = sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN");
        const response = await fetch(
          `https://api.spotify.com/v1/browse/categories/${selectedGenre.id}/playlists`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }
        const data = await response.json();
        setPlaylists(data.playlists.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlaylistsByGenre();
  }, [accessToken, selectedGenre]);

  const handleBackToGenres = () => {
    setSelectedGenre(null);
    setView("genres");
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={handleBackToGenres}
        className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white font-bold py-2 px-4 rounded-md w-full mb-4"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold text-red-500 mb-4 ">
        {selectedGenre?.name}
      </h1>
      <p className="text-gray-500 mb-4">{selectedGenre?.description}</p>
      <div className="container mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <p>Loading playlists...</p>
        ) : !playlists.length ? (
          <p>No playlists found</p>
        ) : (
          playlists.map((playlist, index) => (
            <Link
              to={`/playlist/${playlist.id}`}
              key={index}
              className="relative h-48 rounded-lg overflow-hidden group"
            >
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-40 transition-colors duration-200 ease-in-out" />
              <div className="absolute inset-0 flex flex-col justify-end p-4"></div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default PlaylistList;
