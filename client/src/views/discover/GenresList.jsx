import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const GenresList = ({ setView, setSelectedGenre }) => {
  GenresList.propTypes = {
    setView: PropTypes.func.isRequired,
    setSelectedGenre: PropTypes.func.isRequired,
  };

  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("USER_ACCESS_TOKEN") === null) {
      navigate("/login");
    } else {
      setAccessToken(sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN"));
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch genres
    const fetchGenres = async () => {
      if (!accessToken) return;
      try {
        let allGenres = [];
        let offset = 0;
        let limit = 50; // Increase or decrease as needed
        let totalGenres = limit; // Just to start the loop

        while (offset < totalGenres) {
          const response = await fetch(
            `https://api.spotify.com/v1/browse/categories?offset=${offset}&limit=${limit}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch genres");
          }
          const data = await response.json();
          allGenres = allGenres.concat(data.categories.items);
          totalGenres = data.categories.total;
          offset += limit;
        }

        setGenres(allGenres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [accessToken]);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre); // Pasar el objeto de género
    setView("tracks");
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-3xl font-bold text-red-500">Genres</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {genres.map((genre, index) => (
          <Link
            key={index}
            onClick={() =>
              handleGenreSelect({ id: genre.id, name: genre.name })
            }
            className="group"
          >
            <div className="relative h-48">
              <img
                src={genre.icons[0]?.url}
                alt={genre.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-40 transition-colors duration-200 ease-in-out" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-sm font-semibold text-white">
                  {genre.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenresList;
