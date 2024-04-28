import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Importamos el icono de búsqueda de React Icons
import { Link, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ onSearch, onGenresVisibilityChange }) => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem("USER_ACCESS_TOKEN") !== null) {
      setAccessToken(sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN"));
    } else {
      setAccessToken(null);
    }
  }, []);
  const search = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist,album,track,playlist&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setSearchResults(data);
      onSearch();
      if (typeof onGenresVisibilityChange === "function") {
        onGenresVisibilityChange(false);
      }
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  function msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          search();
        }}
        className="flex items-center mb-8"
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by artist, album or track..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="py-2 px-4 border-transparent rounded-full shadow-md focus:outline-none focus:ring focus:ring-red-500 mr-2 w-full transition duration-200 ease-in-out"
          />
          <div className="absolute top-1/2 transform -translate-y-1/2 right-6">
            <FaSearch
              onClick={search}
              className="text-gray-400 hover:text-gray-500 cursor-pointer"
            />
          </div>
        </div>
      </form>
      {loading && <p className="text-center mt-4 text-gray-500">Loading...</p>}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {searchResults && (
          <>
            {searchResults.artists &&
              searchResults.artists.items.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold text-gray-800 uppercase mb-4">
                    Artists
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {searchResults.artists.items.map((artist, index) => (
                      <Link
                        to={`/artist/${artist.id}`}
                        key={index}
                        className="group"
                      >
                        <div className="w-full h-48 bg-gray-200 rounded-lg relative overflow-hidden">
                          <img
                            src={artist.images[1]?.url}
                            alt={artist.name}
                            className="absolute inset-0 w-full h-full object-cover object-center bg-gray-100"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40" />
                          <div className="absolute inset-0 flex flex-col justify-end p-4">
                            <h3 className="text-sm font-semibold text-white">
                              {artist.name}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            {searchResults.albums && searchResults.albums.items.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-800 uppercase mb-4">
                  Albums
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {searchResults.albums.items.map((album, index) => (
                    <Link
                      to={{
                        pathname: `/album/${album.id}`,
                        state: { previousPath: location.pathname },
                      }}
                      key={index}
                      className="group"
                    >
                      <div className="relative h-48">
                        <img
                          src={album.images[0]?.url}
                          alt={album.name}
                          className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-40 transition-colors duration-200 ease-in-out" />
                        <div className="absolute inset-0 flex flex-col justify-end p-4">
                          <h3 className="text-sm font-semibold text-white">
                            {album.name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {album.artists.map((artist, index) => (
                              <>
                                {index !== 0 ? ', ' : ''}
                                <Link
                                  className="hover:text-red-500 transition-colors duration-200 ease-in-out"
                                  to={{
                                    pathname: `/artist/${artist.id}`,
                                    state: { previousPath: location.pathname },
                                  }}
                                  key={index}
                                >
                                  {artist.name}
                                </Link>
                              </>
                            ))}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {searchResults &&
          searchResults.tracks &&
          searchResults.tracks.items.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-800 uppercase mb-4">
                Tracks
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {searchResults.tracks.items.map((track, index) => (
                  <Link to={`/track/${track.id}`} key={index} className="group">
                    <div className="relative h-48">
                      <img
                        src={track.album.images[0]?.url}
                        alt={track.album.name}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-40 transition-colors duration-200 ease-in-out" />
                      <div className="absolute inset-0 flex flex-col justify-end p-4">
                        <h3 className="text-sm font-semibold text-white">
                          {track.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {track.artists.map((artist, index) => (
                            <Link
                              className="inline-block last:mr-0 text-gray-400 hover:text-red-500 transition-colors duration-300"
                              to={`/artist/${artist.id}`}
                              key={index}
                            >
                              {index > 0 ? ", " : ""}
                              {artist.name}
                            </Link>
                          ))}
                        </p>
                        <p className="text-xs text-gray-400">
                          {msToMinutesAndSeconds(track.duration_ms)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchBar;
