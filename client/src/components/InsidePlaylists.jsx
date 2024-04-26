import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CLIENT_ID = "e269b673d31546e6a6b44f63f4aeadc0";
const CLIENT_SECRET = "1f1ca0920b104536bb29efd3d84c784a";

function InsidePlaylists() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchPlaylistInfo(id);
    }
  }, [id]);

  async function fetchPlaylistInfo(playlistId) {
    try {
      const accessToken = await getAccessToken();
      const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      if (!playlistResponse.ok) {
        throw new Error('Failed to fetch playlist details');
      }
      const playlistData = await playlistResponse.json();
      setPlaylist(playlistData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching playlist details:", error);
      setIsLoading(false);
    }
  }

  async function getAccessToken() {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch access token');
      }
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  }

  function msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full bg-gradient-to-b from-red-500 to-white p-4">
      <h1 className="text-2xl font-bold mb-4">Playlist</h1>
      <button onClick={handleGoBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Back</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlist && playlist.tracks.items.map((track, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={track.track.album.images[0]?.url} alt={track.track.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{track.track.name}</h2>
              <p className="text-gray-600 text-sm">{track.track.artists.map(artist => artist.name).join(", ")}</p>
              <p className="text-gray-600 text-sm">{msToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InsidePlaylists;
