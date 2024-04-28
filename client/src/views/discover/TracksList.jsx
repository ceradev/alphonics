import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; //Link from "react-router-dom";
const TracksList = ({ selectedGenre, setView, setSelectedGenre }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el token de acceso de la sesión actual
    if (sessionStorage.getItem("USER_ACCESS_TOKEN") === null) {
      navigate("/login");
    } else {
      setAccessToken(sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN"));
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch playlists by genre
    const fetchPlaylistsByGenre = async () => {
      console.log("Selected genre:", selectedGenre); // Logging selectedGenre
      if (!accessToken || !selectedGenre) return;
      try {
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

  const msToMinutesAndSeconds = function (ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
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
              <div className="absolute inset-0 flex flex-col justify-end p-4">
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default TracksList;

//Este codigo de abajo esta utilizando ApiAccessTokenProvider para obtener el token de acceso

// import React, { useState, useEffect } from "react";
// import { Card, Col, Row, Button } from "react-bootstrap";
// import ApiAccessTokenProvider from '../utils/ApiAccessTokenProvider';

// const TracksList = ({ selectedGenre, setView, setSelectedGenre }) => {
//   const [tracks, setTracks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch tracks by genre
//     const fetchTracksByGenre = async (accessToken) => {
//       console.log("Selected genre:", selectedGenre); // Logging selectedGenre
//       if (!accessToken || !selectedGenre) return;
//       try {
//         const response = await fetch(`https://api.spotify.com/v1/browse/categories/${selectedGenre.id}/playlists`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch tracks");
//         }
//         const data = await response.json();
//         const playlistId = data.playlists.items[0].id;
//         const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         if (!tracksResponse.ok) {
//           throw new Error("Failed to fetch tracks");
//         }
//         const tracksData = await tracksResponse.json();
//         setTracks(tracksData.items);
//       } catch (error) {
//         console.error("Error fetching tracks:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // API Access Token
//     const fetchAccessToken = async () => {
//       try {
//         const accessToken = await ApiAccessTokenProvider.getAccessToken();
//         fetchTracksByGenre(accessToken);
//       } catch (error) {
//         console.error("Error fetching access token:", error);
//       }
//     };

//     fetchAccessToken();
//   }, [selectedGenre]);

//   const handleBackToGenres = () => {
//     setSelectedGenre(null);
//     setView("genres");
//   };

//   return (
//     <div>
//       <Button onClick={handleBackToGenres} variant="secondary">Back</Button>
//       <h2>{selectedGenre ? `Top tracks for ${selectedGenre.name}` : "Loading..."}</h2> {/* Mostrar el nombre del género */}
//       <Row xs={1} md={3} className="g-4">
//         {loading ? (
//           <p>Loading tracks...</p>
//         ) : (
//           tracks.map((track, index) => (
//             <Col key={index}>
//               <Card>
//                 <Card.Img variant="top" src={track.track.album.images[0]?.url} />
//                 <Card.Body>
//                   <Card.Title>{track.track.name}</Card.Title>
//                   <Card.Subtitle>{track.track.artists[0].name}</Card.Subtitle>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         )}
//       </Row>
//     </div>
//   );
// };

// export default TracksList;
