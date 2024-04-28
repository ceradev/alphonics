import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import { Link } from "react-router-dom";

const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const accessToken = sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("USER_ACCESS_TOKEN") === null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setAlbum(data);
    };
      fetchAlbum();
    
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
    <Layout>
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-col">
          <img
            src={album?.images?.[1]?.url}
            alt="Album"
            className="w-full h-64 object-cover object-center rounded-lg shadow-md mb-4 lg:rounded-2xl lg:object-cover lg:object-center border-2 border-red-500"
          />
          <h1 className="text-2xl font-bold md:text-3xl mb-2 text-red-500">
            {album?.name}
          </h1>
          <p className="text-gray-600">
            {album?.artists?.map((artist) => artist.name).join(", ")} -{" "}
            {album?.release_date}
          </p>
          <p className="text-gray-600">{album?.total_tracks} songs</p>
          <button
            onClick={handleGoBack}
            className="bg-red-500 text-white p-2 rounded-full shadow-md mt-4 w-full hover:bg-red-700 hover:border-red-500 transition-colors duration-300"
          >
            Back
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {album?.tracks?.items?.map((track, index) => (
            <Link
              to={`/track/${track.id}`}
              key={index}
              className="group"
            >
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src={album.images[0]?.url}
                  alt={track.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-40 transition-colors duration-200 ease-in-out" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="text-sm font-semibold text-white">
                    {track.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {track.artists.map((artist) => artist.name).join(", ")}
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
    </Layout>
  );
};

export default Album;
