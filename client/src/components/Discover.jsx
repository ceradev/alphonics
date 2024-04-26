import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import GenresList from './GenresList';
import TracksList from './TracksList';
import Layout from '../layouts/Layout';

const Discover = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [view, setView] = useState("genres"); // "genres" or "tracks"
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchingFromTrackList, setSearchingFromTrackList] = useState(false); // Nuevo estado para controlar si se está realizando una búsqueda desde TrackList
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get('search');
    setSearchResult(searchValue || null);
    if (searchValue) {
      setView("search"); // Cambiar a vista de búsqueda
      setSelectedGenre(null); // Limpiar el género seleccionado si lo hay
    } else {
      setView("genres"); // Cambiar a vista de géneros si no hay nada en la búsqueda
    }
  }, [location.search]);

  const handleBackToGenres = () => {
    setSelectedGenre(null);
    setView("genres");
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setView("tracks"); // Cambiar a vista de pistas cuando se hace clic en un género
  };

  const handleGoBack = () => {
    // Recupera la información de búsqueda del localStorage
    const searchResult = JSON.parse(localStorage.getItem('searchResult'));

    // Si hay información de búsqueda, navega a la página anterior con la información recuperada
    if (searchResult) {
      navigate('/', { state: { searchResult } });
    } else {
      // Si no hay información de búsqueda, simplemente navega hacia atrás
      navigate(-1);
    }
  };

  return (
    <Layout>
    <Container>
      {/* Se muestra el componente SearchBar solo si no hay resultados de búsqueda */}
      {!searchResult && <SearchBar 
        onSearch={() => {
          // Actualiza el estado para indicar que se está buscando desde TrackList
          setSearchingFromTrackList(view === "tracks");
          setView("search");
        }} 
      />}
      {/* Se muestran los géneros solo si no hay resultados de búsqueda */}
      {!searchResult && view === "genres" && <GenresList setView={setView} setSelectedGenre={setSelectedGenre} handleGenreClick={handleGenreClick} />}
      {/* Condición para mostrar TrackList solo si no se está buscando desde TrackList */}
      {view === "tracks" && !searchingFromTrackList && selectedGenre && <TracksList selectedGenre={selectedGenre} setView={setView} setSelectedGenre={setSelectedGenre} />}
      {/* Se muestra el resultado de la búsqueda si existe */}
      {searchResult && <div>{searchResult}</div>}
      
      {/* Botones para las páginas de Contacto y Acerca de Nosotros */}
      <Link to="/about-us">
        <Button variant="primary" className="mr-2">Acerca de Nosotros</Button>
      </Link>
      <Link to="/contact">
        <Button variant="success">Contacto</Button>
      </Link>
      
      {/* Botón para navegar a SubscriptionPage */}
      <Link to="/subscription">
        <Button variant="info">Ir a Planes de Suscripción</Button>
      </Link>
    </Container>
    </Layout>
  );
};

export default Discover;

//Aqui esta implementado que use el componente apiAccessTokenProvider

// import React, { useState, useEffect } from "react";
// import { Container, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import SearchBar from "./SearchBar";
// import GenresList from "./GenresList";
// import TracksList from "./TracksList";
// import Layout from "../layouts/Layout";
// import ApiAccessTokenProvider from "../utils/ApiAccessTokenProvider";

// const Discover = () => {
//   const [searchResult, setSearchResult] = useState(null);
//   const [view, setView] = useState("genres"); // "genres" or "tracks"
//   const [selectedGenre, setSelectedGenre] = useState(null);
//   const [searchingFromTrackList, setSearchingFromTrackList] = useState(false); // Nuevo estado para controlar si se está realizando una búsqueda desde TrackList
//   const [accessToken, setAccessToken] = useState(null); // Estado para almacenar el token de acceso

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const searchValue = searchParams.get("search");
//     setSearchResult(searchValue || null);
//     if (searchValue) {
//       setView("search");
//       setSelectedGenre(null);
//     } else {
//       setView("genres");
//     }
//   }, []);

//   // Función para establecer el token de acceso
//   const handleSetAccessToken = (token) => {
//     setAccessToken(token);
//   };

//   const handleBackToGenres = () => {
//     setSelectedGenre(null);
//     setView("genres");
//   };

//   const handleGenreClick = (genre) => {
//     setSelectedGenre(genre);
//     setView("tracks"); // Cambiar a vista de pistas cuando se hace clic en un género
//   };

//   return (
//     <Layout>
//       <Container>
//         {/* Se muestra el componente SearchBar solo si no hay resultados de búsqueda */}
//         {!searchResult && (
//           <SearchBar
//             onSearch={() => {
//               // Actualiza el estado para indicar que se está buscando desde TrackList
//               setSearchingFromTrackList(view === "tracks");
//               setView("search");
//             }}
//             // Pasar la función para establecer el token de acceso como prop
//             setAccessToken={handleSetAccessToken}
//           />
//         )}
//         {/* Se muestran los géneros solo si no hay resultados de búsqueda */}
//         {!searchResult && view === "genres" && (
//           <GenresList
//             setView={setView}
//             setSelectedGenre={setSelectedGenre}
//             handleGenreClick={handleGenreClick}
//             // Pasar el token de acceso como prop
//             accessToken={accessToken}
//           />
//         )}
//         {/* Condición para mostrar TrackList solo si no se está buscando desde TrackList */}
//         {view === "tracks" && !searchingFromTrackList && selectedGenre && (
//           <TracksList
//             selectedGenre={selectedGenre}
//             setView={setView}
//             setSelectedGenre={setSelectedGenre}
//             // Pasar el token de acceso como prop
//             accessToken={accessToken}
//           />
//         )}
//         {/* Se muestra el resultado de la búsqueda si existe */}
//         {searchResult && <div>{searchResult}</div>}

//         {/* Botones para las páginas de Contacto y Acerca de Nosotros */}
//         <Link to="/about-us">
//           <Button variant="primary" className="mr-2">
//             Acerca de Nosotros
//           </Button>
//         </Link>
//         <Link to="/contact">
//           <Button variant="success">Contacto</Button>
//         </Link>

//         {/* Botón para navegar a SubscriptionPage */}
//         <Link to="/subscription">
//           <Button variant="info">Ir a Planes de Suscripción</Button>
//         </Link>
//       </Container>
//       <ApiAccessTokenProvider />
//     </Layout>
//   );
// };

// export default Discover;

