import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import { Link } from "react-router-dom";

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN");

  useEffect(() => {
    const fetchPlaylistInfo = async (playlistId) => {
      try {
        const playlistResponse = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        if (!playlistResponse.ok) {
          throw new Error("Failed to fetch playlist details");
        }
        const playlistData = await playlistResponse.json();
        setPlaylist(playlistData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching playlist details:", error);
        setIsLoading(false);
      }
    };

    if (sessionStorage.getItem("USER_ACCESS_TOKEN") === null) {
      navigate("/login");
    } else {
      setIsLoading(true);
      if (id) {
        fetchPlaylistInfo(id);
      }
    }
  }, [accessToken, id, navigate]);

  function msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-8 p-4">
        {isLoading ? (
          <div className="flex justify-center">Loading...</div>
        ) : playlist ? (
          <>
            <div className="space-y-2">
              <img
                src={playlist.images?.[0]?.url}
                alt={playlist.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <h1 className="text-2xl font-bold md:text-3xl mt-4 mb-2 text-red-500 animate-pulse">
                {playlist.name}
              </h1>
              <p className="text-gray-600">{playlist.description}</p>
              <p className="text-gray-600">
                Tracks: {playlist.tracks.total}
              </p>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded "
                onClick={handleGoBack}
              >
                Back
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {playlist.tracks?.items?.map((track, index) => (
                <Link
                  to={`/track/${track.track.id}`}
                  key={index}
                  className="relative h-48 rounded-lg overflow-hidden group"
                >
                  <img
                    src={track.track.album.images[0]?.url}
                    alt={track.track.name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-40 transition-colors duration-200 ease-in-out" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h3 className="text-sm font-semibold text-white">{track.track.name}</h3>
                    <div className="flex flex-col mt-2">
                      {track.track.artists.map((artist, index) => (
                        <Link to={`/artist/${artist.id}`} key={index} className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-300">
                          {index !== 0 ? ", " : ""}
                          {artist.name}
                        </Link>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">{msToMinutesAndSeconds(track.track.duration_ms)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div>No playlist found</div>
        )}
      </div>
    </Layout>
  );
};

export default Playlist;
