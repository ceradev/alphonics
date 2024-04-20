import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button, Container, Row, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'; 
import './SearchBar.css';

const CLIENT_ID = "e269b673d31546e6a6b44f63f4aeadc0";
const CLIENT_SECRET = "1f1ca0920b104536bb29efd3d84c784a";

const SearchBar = ({ onSearch, onGenresVisibilityChange }) => {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchAccessToken();
  }, []);

  const fetchAccessToken = async () => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
        },
        body: "grant_type=client_credentials"
      });
      if (!response.ok) {
        throw new Error('Failed to fetch access token');
      }
      const data = await response.json();
      setAccessToken(data.access_token);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

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
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch artist top tracks');
      }
      const data = await response.json();
      return data.tracks;
    } catch (error) {
      console.error("Error fetching artist top tracks:", error);
      return [];
    }
  };

  return (
    <Container>
      <InputGroup className="mb-3" size="lg">
        <FormControl
          placeholder="Search for an artist, song, or album..."
          type="input"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              search(); 
            }
          }}
        />
        <Button variant="primary" onClick={search}>Search</Button>
      </InputGroup>
      {loading && <p>Loading...</p>}
      {artist && (
        <Row>
          <Card>
            <Card.Body>
              {artist.images && (
                <img
                  src={artist.images[0]?.url}
                  alt="Artist"
                  className="artist-image"
                />
              )}
              {artist.name && <h2>{artist.name}</h2>}
            </Card.Body>
          </Card>
        </Row>
      )}
      {albums.length > 0 && (
        <Row>
          <Card>
            <Card.Body>
              <h3>Albums</h3>
              <Row className="row-cols-4">
                {albums.map((album, i) => (
                  <Link to={{ pathname: `/album/${album.id}`, state: { previousPath: location.pathname } }} key={i} className="album-link">
                    <Card key={i} className="album-card">
                      <Card.Img src={album.images?.[0]?.url || ""} />
                      <Card.Body>
                        <Card.Title>{album.name}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Row>
      )}
      {tracks.length > 0 && (
        <Row>
          <Card>
            <Card.Body>
              <h3>Tracks</h3>
              <Row className="row-cols-4">
                {tracks.map((track, i) => (
                  <Card key={i} className="track-card">
                    <Card.Img src={track.album.images?.[0]?.url || ""} />
                    <Card.Body>
                      <Card.Title>{track.name}</Card.Title>
                    </Card.Body>
                  </Card>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Row>
      )}

    </Container>
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
