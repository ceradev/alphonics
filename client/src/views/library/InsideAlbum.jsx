import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CLIENT_ID = "e269b673d31546e6a6b44f63f4aeadc0";
const CLIENT_SECRET = "1f1ca0920b104536bb29efd3d84c784a";

function InsideAlbum() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    if(sessionStorage.getItem("USER_ACCESS_TOKEN") === null){
      navigate("/login");
    } else {
      setAccessToken(sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN"));
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAlbum = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://api.spotify.com/v1/albums/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setAlbum(data);
      setIsLoading(false);
    };
    if (accessToken) {
      fetchAlbum();
    }
  }, [accessToken, id]);

  function msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full bg-gradient-to-b from-red-500 to-white p-4">
      <h1 className="text-2xl font-bold mb-4">Album</h1>
      <button
        onClick={handleGoBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {album &&
          album.tracks.items.map((track, index) => (
            <div key={index}className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={album.images[0]?.url}
                alt="Album"
                className="track-thumbnail mr-3 rounded-circle"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{track.name}</h2>
                <p className="text-gray-600 text-sm">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
                <p className="text-gray-600 text-sm">
                  {msToMinutesAndSeconds(track.duration_ms)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default InsideAlbum;
