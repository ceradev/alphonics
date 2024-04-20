import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";

const TracksList = ({ selectedGenre, setView, setSelectedGenre }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");

  const CLIENT_ID = "e269b673d31546e6a6b44f63f4aeadc0";
  const CLIENT_SECRET = "1f1ca0920b104536bb29efd3d84c784a";

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
    <div>
      <Button onClick={handleBackToGenres} variant="secondary">Back</Button>
      <h2>{selectedGenre ? `Top tracks for ${selectedGenre.name}` : "Loading..."}</h2> {/* Mostrar el nombre del género */}
      <Row xs={1} md={3} className="g-4">
        {loading ? (
          <p>Loading tracks...</p>
        ) : (
          tracks.map((track, index) => (
            <Col key={index}>
              <Card>
                <Card.Img variant="top" src={track.track.album.images[0]?.url} />
                <Card.Body>
                  <Card.Title>{track.track.name}</Card.Title>
                  <Card.Subtitle>{track.track.artists[0].name}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
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
