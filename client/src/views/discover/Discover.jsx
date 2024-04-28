import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../search/SearchBar';
import GenresList from './GenresList';
import TracksList from './TracksList';
import Layout from '../../components/layouts/Layout';

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
    </div>
    </Layout>
  );
};

export default Discover;