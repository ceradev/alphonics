import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CLIENT_ID = "e269b673d31546e6a6b44f63f4aeadc0";
const CLIENT_SECRET = "1f1ca0920b104536bb29efd3d84c784a";

function InsideAlbum() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchAlbumInfo(id);
    }
  }, [id]);

  async function fetchAlbumInfo(albumId) {
    try {
      const accessToken = await getAccessToken();
      const albumResponse = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      if (!albumResponse.ok) {
        throw new Error("Failed to fetch album details");
      }
      const albumData = await albumResponse.json();
      setAlbum(albumData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching album details:", error);
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
        throw new Error("Failed to fetch access token");
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

//En este codigo utiliza ApiAccessTokenProvider para obtener el token de acceso

// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import { Container, Card } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';
// import ApiAccessTokenProvider from '../utils/ApiAccessTokenProvider';

// function InsideAlbum() {
//   const { id } = useParams();
//   const [album, setAlbum] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (id) {
//       setIsLoading(true);
//       fetchAlbumInfo(id);
//     }
//   }, [id]);

//   async function fetchAlbumInfo(albumId) {
//     try {
//       const accessToken = await ApiAccessTokenProvider.getAccessToken();
//       const albumResponse = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + accessToken,
//         },
//       });
//       if (!albumResponse.ok) {
//         throw new Error('Failed to fetch album details');
//       }
//       const albumData = await albumResponse.json();
//       setAlbum(albumData);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching album details:", error);
//       setIsLoading(false);
//     }
//   }

//   function msToMinutesAndSeconds(ms) {
//     const minutes = Math.floor(ms / 60000);
//     const seconds = ((ms % 60000) / 1000).toFixed(0);
//     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
//   }

//   const handleGoBack = () => {
//     // Recupera la información de búsqueda del localStorage
//     const searchResult = JSON.parse(localStorage.getItem('searchResult'));

//     // Si hay información de búsqueda, navega a la página anterior con la información recuperada
//     if (searchResult) {
//       navigate('/', { state: { searchResult } });
//     } else {
//       // Si no hay información de búsqueda, simplemente navega hacia atrás
//       navigate(-1);
//     }
//   };

//   return (
//     <div className="InsideAlbum">
//       <Container>
//         {album && (
//           <div>
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <button onClick={handleGoBack} className="btn btn-primary">Volver</button>
//               <h2 className="text-center mb-0">{album.name}</h2>
//               <div></div>
//             </div>
//             <div className="album-info d-flex justify-content-center align-items-center mb-4">
//               {album.images && (
//                 <img src={album.images[0]?.url} alt="Album" className="album-image-thumbnail mr-3" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
//               )}
//               <div className="artist-info">
//                 <h3 className="mb-0">Artista: {album.artists.map(artist => artist.name).join(", ")}</h3>
//                 <h4 className="mb-0">Album: {album.name}</h4>
//               </div>
//             </div>
//             <div>
//               {album.tracks.items.map((track, index) => (
//                 <Card key={index} className="mb-3">
//                   <Card.Body className="d-flex justify-content-between align-items-center">
//                     <div className="d-flex align-items-center">
//                       {album.images && (
//                         <img src={album.images[0]?.url} alt="Album" className="track-thumbnail mr-3 rounded-circle" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
//                       )}
//                       <div>
//                         <h5 className="mb-1">{track.name}</h5>
//                         <p className="mb-0">Artista: {track.artists.map(artist => artist.name).join(", ")}</p>
//                       </div>
//                     </div>
//                     <p className="mb-0">{msToMinutesAndSeconds(track.duration_ms)}</p>
//                   </Card.Body>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}
//       </Container>
//     </div>
//   );
// }

// export default InsideAlbum;
