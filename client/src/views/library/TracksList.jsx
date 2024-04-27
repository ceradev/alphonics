import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = "e269b673d31546e6a6b44f63f4aeadc0";
const CLIENT_SECRET = "1f1ca0920b104536bb29efd3d84c784a";

const TracksList = ({ selectedGenre, setView, setSelectedGenre }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // API Access Token
    const fetchAccessToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch access token");
        }
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    // Fetch tracks by genre
    const fetchTracksByGenre = async () => {
      console.log("Selected genre:", selectedGenre); // Logging selectedGenre
      if (!accessToken || !selectedGenre) return;
      try {
        const response = await fetch(`https://api.spotify.com/v1/browse/categories/${selectedGenre.id}/playlists`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tracks");
        }
        const data = await response.json();
        const playlistId = data.playlists.items[0].id;
        const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!tracksResponse.ok) {
          throw new Error("Failed to fetch tracks");
        }
        const tracksData = await tracksResponse.json();
        setTracks(tracksData.items);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracksByGenre();
  }, [accessToken, selectedGenre]);

  const handleBackToGenres = () => {
    setSelectedGenre(null);
    setView("genres");
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #FF0000, #FFFFFF)', padding: '1rem' }}>
      <button onClick={handleBackToGenres} style={{ background: '#0000FF', color: '#FFFFFF', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.25rem', marginBottom: '1rem', border: 'none', cursor: 'pointer' }}>Back</button>
      <h2 style={{ color: '#FFFFFF' }}>{selectedGenre ? `Top tracks for ${selectedGenre.name}` : "Loading..."}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {loading ? (
          <p>Loading tracks...</p>
        ) : (
          tracks.map((track, index) => (
            <div key={index} style={{ background: '#FFFFFF', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
              <img src={track.track.album.images[0]?.url} alt={track.track.name} style={{ width: '100%', objectFit: 'cover', height: '200px' }} />
              <div style={{ padding: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{track.track.name}</h2>
                <p style={{ fontSize: '0.875rem', color: '#666' }}>{track.track.artists[0].name}</p>
              </div>
            </div>
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
