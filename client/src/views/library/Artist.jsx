import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import  Layout from "../../components/layouts/Layout";

// Componente para mostrar los datos de un artista
const Artist = () => {
  const { id } = useParams(); // Obtiene el ID del artista de la URL
  const [artistData, setArtistData] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const accessToken = sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (sessionStorage.getItem("USER_ACCESS_TOKEN") === null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchArtistData = async () => {
      if (!accessToken || !id) return;
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch artist data");
        }
        const data = await response.json();
        setArtistData(data);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };

    const fetchArtistAlbums = async (artistId) => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/albums?limit=10`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch artist albums");
        }
        const data = await response.json();
        return data.items;
      } catch (error) {
        console.error("Error fetching artist albums:", error);
        return [];
      }
    };

    const fetchArtistTracks = async (artistId) => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch artist top tracks");
        }
        const data = await response.json();
        return data.tracks;
      } catch (error) {
        console.error("Error fetching artist top tracks:", error);
        return [];
      }
    };

    const fetchRelatedArtists = async (artistId) => {
      try {
        const accessToken = sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN");
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch related artists");
        }
        const data = await response.json();
        setRelatedArtists(data.artists);
      } catch (error) {
        console.error("Error fetching related artists:", error);
        sessionStorage.removeItem("SPOTIFY_ACCESS_TOKEN");
        navigate("/login");
      }
    };

    fetchArtistData();
    if (id) {
      fetchArtistAlbums(id).then(setAlbums);
      fetchArtistTracks(id).then(setTracks);
      fetchRelatedArtists(id);
    } else {
      setAlbums([]);
      setTracks([]);
      setRelatedArtists([]);
    }
  }, [id, accessToken, navigate]);

  // Renderizar la información del artista
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between">
          <button onClick={() => window.history.back()} className="text-red-500 hover:text-red-700 font-bold text-lg mb-4 md:mb-0 md:mr-4">Go back</button>
        </div>
        {artistData && (
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 rounded-lg overflow-hidden mb-8 shadow-md bg-gray-300 bg-cover bg-center" style={{ backgroundImage: `url(${artistData.images[0]?.url})`}}></div>
            <h2 className="text-2xl mb-4">{artistData.name}</h2>
            <p className="text-gray-500 mb-4">{artistData.followers?.total} listeners</p>

            <h3 className="text-2xl text-red-500 mt-8 mb-4">Top Tracks</h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
              {tracks.slice(0, 5).map((track, index) => (
                <div key={index} className="group rounded-lg border border-gray-300 p-2 shadow-sm hover:border-red-500 transition-colors duration-200 ease-in-out hover:shadow-lg bg-gray-100">
                  <img src={track.album.images[0].url} alt={track.name} className="w-24 h-24 object-cover object-center rounded-lg mb-2" />
                  <div className="p-2">
                    <div className="flex flex-col">
                    <p className="text-sm text-gray-500 font-medium mb-2">{track.name}</p>
                      {track.artists.map((artist, index) => (
                        <Link to={`/artist/${artist.id}`} key={index} className="text-sm text-gray-500 font-medium hover:text-red-500 transition-colors duration-200 ease-in-out">{artist.name}</Link>
                      ))}
                      <p className="text-xs text-gray-500 mt-2">{track.popularity} popularity</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-2xl text-red-500 mt-8 mb-4">Recent Albums</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {albums.slice(0, 3).map((album, index) => (
                <div key={index} className="group rounded-lg border border-gray-300 p-4 shadow-sm hover:border-red-500 transition-colors duration-200 ease-in-out hover:shadow-lg bg-gray-300">
                    <Link to={`/album/${album.id}`} >
                  <div style={{ backgroundImage: `url(${album.images[0]?.url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', paddingBottom: '66.67%'}}></div>
                  <div className="p-4 space-y-1">
                    <p className="text-lg text-gray-900 font-medium">{album.name}</p>
                    <p className="text-sm text-gray-500">
                      {album.artists.map((artist, index) => (
                        <span key={index}>
                          {index > 0 && ', '}
                          <Link to={`/artist/${artist.id}`} className="hover:text-red-500 transition-colors duration-200 ease-in-out">{artist.name}</Link>
                        </span>
                      ))}
                    </p>
                  </div>
                </Link>
                </div>
              ))}
            </div>

            <h3 className="text-2xl mt-8 mb-4">Related Artists</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedArtists.slice(0, 3).map((relatedArtist, index) => (
                <div key={index} className="group rounded-lg border border-gray-300 p-4 shadow-sm hover:border-red-500 hover:shadow-lg bg-gray-300">
                  <Link to={`/artist/${relatedArtist.id}`} className="w-full h-64 object-cover object-center rounded-lg mb-4">
                  <img src={relatedArtist.images[0]?.url} alt={relatedArtist.name} className="w-full h-64 object-cover object-center rounded-lg mb-4" />
                  <div className="p-4 space-y-1">
                    <p className="text-lg text-gray-900 font-medium">{relatedArtist.name}</p>
                  </div>
                </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Artist;
