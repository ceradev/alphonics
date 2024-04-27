import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importamos el icono de búsqueda de React Icons
import { Link, useLocation } from 'react-router-dom';

const SearchBar = ({ onSearch, onGenresVisibilityChange }) => {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(sessionStorage.getItem("USER_ACCESS_TOKEN") !== null) {
      setAccessToken(sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN"));
    } else {
      setAccessToken(null);
    }
  }, []);
  const search = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist,album,track`,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      const { artists, albums, tracks } = data;

      if (artists && artists.items.length > 0) {
        const artist = artists.items[0];
        setArtist(artist);
        const artistId = artist.id;
        const artistAlbums = await fetchArtistAlbums(artistId);
        const artistTracks = await fetchArtistTracks(artistId);
        setAlbums(artistAlbums);
        setTracks(artistTracks);
      } else {
        setArtist(null);
        setAlbums([]);
        setTracks([]);
      }

      onSearch();
      if (artist) {
        if (typeof onGenresVisibilityChange === 'function') {
          onGenresVisibilityChange(false);
        }
      }

      const searchResult = { artist, albums, tracks };
      localStorage.setItem('searchResult', JSON.stringify(searchResult));
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtistAlbums = async (artistId) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/albums?limit=10`,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch artist albums');
      }
      const data = await response.json();
      return data.items.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar por nombre del álbum
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
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch artist top tracks');
      }
      const data = await response.json();
      return data.tracks.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar por nombre de la canción
    } catch (error) {
      console.error("Error fetching artist top tracks:", error);
      return [];
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-red-500 to-white p-4 shadow-lg rounded-lg">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          search(); 
        }}
        className="flex items-center"
      >
        <input
          type="text"
          placeholder="Search for an artist, song, or album..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400 mr-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400"
        >
          <FaSearch />
        </button>
      </form>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {artist && (
        <div className="mt-8 bg-gradient-to-b from-red-500 to-white p-4 shadow-lg rounded-lg">
          {artist.images && (
            <div className="text-center mb-4">
              <img
                src={artist.images[0]?.url}
                alt="Artist"
                className="mx-auto mb-4 rounded-full shadow-lg"
                style={{ width: "250px" }}
              />
              <h2 className="text-2xl font-bold mb-4">{artist.name}</h2>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">Albums</h2>
              <div className="grid grid-cols-2 gap-4">
                {albums.map((album, index) => (
                  <Link
                    to={{ pathname: `/album/${album.id}`, state: { previousPath: location.pathname } }}
                    key={index}
                    className="album-link"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img
                        src={album.images[0]?.url}
                        alt={album.name}
                        className="h-48 w-full object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-bold">{album.name}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">Top Tracks</h2>
              <div className="grid grid-cols-2 gap-4">
                {tracks.map((track, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={track.album.images[0]?.url}
                      alt={track.name}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold">{track.name}</h3>
                      <p>{track.artists[0].name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;



//Este codigo de abajo esta utilizando ApiAccessTokenProvider para obtener el token de acceso

// import React, { useState, useEffect } from 'react';
// import { InputGroup, FormControl, Button, Container, Row, Card } from 'react-bootstrap';
// import { Link, useLocation } from 'react-router-dom';
// import './SearchBar.css';
// import ApiAccessTokenProvider from '../utils/ApiAccessTokenProvider';

// const SearchBar = ({ onSearch, onGenresVisibilityChange }) => {
//   const [searchInput, setSearchInput] = useState('');
//   const [artist, setArtist] = useState(null);
//   const [albums, setAlbums] = useState([]);
//   const [tracks, setTracks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     fetchAccessToken();
//   }, []);

//   const fetchAccessToken = async () => {
//     try {
//       const accessToken = await ApiAccessTokenProvider.getAccessToken();
//       search(accessToken);
//     } catch (error) {
//       console.error("Error fetching access token:", error);
//     }
//   };

//   const search = async (accessToken) => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://api.spotify.com/v1/search?q=${searchInput}&type=artist,album,track`,
//         {
//           headers: {
//             "Authorization": `Bearer ${accessToken}`
//           }
//         }
//       );
//       if (!response.ok) {
//         throw new Error('Failed to fetch search results');
//       }
//       const data = await response.json();
//       const { artists, albums, tracks } = data;

//       if (artists && artists.items.length > 0) {
//         const artist = artists.items[0];
//         setArtist(artist);
//         const artistId = artist.id;
//         const artistAlbums = await fetchArtistAlbums(artistId, accessToken);
//         const artistTracks = await fetchArtistTracks(artistId, accessToken);
//         setAlbums(artistAlbums);
//         setTracks(artistTracks);
//       } else {
//         setArtist(null);
//         setAlbums([]);
//         setTracks([]);
//       }

//       onSearch();
//       if (artist) {
//         if (typeof onGenresVisibilityChange === 'function') {
//           onGenresVisibilityChange(false);
//         }
//       }

//       const searchResult = { artist, albums, tracks };
//       localStorage.setItem('searchResult', JSON.stringify(searchResult));
//     } catch (error) {
//       console.error("Error searching:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchArtistAlbums = async (artistId, accessToken) => {
//     try {
//       const response = await fetch(
//         `https://api.spotify.com/v1/artists/${artistId}/albums?limit=10`,
//         {
//           headers: {
//             "Authorization": `Bearer ${accessToken}`
//           }
//         }
//       );
//       if (!response.ok) {
//         throw new Error('Failed to fetch artist albums');
//       }
//       const data = await response.json();
//       return data.items;
//     } catch (error) {
//       console.error("Error fetching artist albums:", error);
//       return [];
//     }
//   };

//   const fetchArtistTracks = async (artistId, accessToken) => {
//     try {
//       const response = await fetch(
//         `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
//         {
//           headers: {
//             "Authorization": `Bearer ${accessToken}`
//           }
//         }
//       );
//       if (!response.ok) {
//         throw new Error('Failed to fetch artist top tracks');
//       }
//       const data = await response.json();
//       return data.tracks;
//     } catch (error) {
//       console.error("Error fetching artist top tracks:", error);
//       return [];
//     }
//   };

//   return (
//     <Container>
//       <InputGroup className="mb-3" size="lg">
//         <FormControl
//           placeholder="Search for an artist, song, or album..."
//           type="input"
//           value={searchInput}
//           onChange={(event) => setSearchInput(event.target.value)}
//           onKeyDown={(event) => {
//             if (event.key === "Enter") {
//               fetchAccessToken(); 
//             }
//           }}
//         />
//         <Button variant="primary" onClick={fetchAccessToken}>Search</Button>
//       </InputGroup>
//       {loading && <p>Loading...</p>}
//       {artist && (
//         <Row>
//           <Card>
//             <Card.Body>
//               {artist.images && (
//                 <img
//                   src={artist.images[0]?.url}
//                   alt="Artist"
//                   className="artist-image"
//                 />
//               )}
//               {artist.name && <h2>{artist.name}</h2>}
//             </Card.Body>
//           </Card>
//         </Row>
//       )}
//       {albums.length > 0 && (
//         <Row>
//           <Card>
//             <Card.Body>
//               <h3>Albums</h3>
//               <Row className="row-cols-4">
//                 {albums.map((album, i) => (
//                   <Link to={{ pathname: `/album/${album.id}`, state: { previousPath: location.pathname } }} key={i} className="album-link">
//                     <Card key={i} className="album-card">
//                       <Card.Img src={album.images?.[0]?.url || ""} />
//                       <Card.Body>
//                         <Card.Title>{album.name}</Card.Title>
//                       </Card.Body>
//                     </Card>
//                   </Link>
//                 ))}
//               </Row>
//             </Card.Body>
//           </Card>
//         </Row>
//       )}
//       {tracks.length > 0 && (
//         <Row>
//           <Card>
//             <Card.Body>
//               <h3>Tracks</h3>
//               <Row className="row-cols-4">
//                 {tracks.map((track, i) => (
//                   <Card key={i} className="track-card">
//                     <Card.Img src={track.album.images?.[0]?.url || ""} />
//                     <Card.Body>
//                       <Card.Title>{track.name}</Card.Title>
//                     </Card.Body>
//                   </Card>
//                 ))}
//               </Row>
//             </Card.Body>
//           </Card>
//         </Row>
//       )}

//     </Container>
//   );
// };

// export default SearchBar;
