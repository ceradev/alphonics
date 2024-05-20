import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import GenresList from "./GenresList";
import PlaylistList from "./PlaylistList";
import Layout from "../../components/layouts/Layout";

const Discover = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [view, setView] = useState("genres"); // "genres" or "playlists"
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchingFromPlaylistList, setSearchingFromPlaylistList] = useState(false); // Nuevo estado para controlar si se está realizando una búsqueda desde la lista de listas de reproducción
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (sessionStorage.getItem("USER_ACCESS_TOKEN") === null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("search");
    setSearchResult(searchValue || null);
    if (searchValue) {
      setView("search"); // Cambiar a vista de búsqueda
      setSelectedGenre(null); // Limpiar el género seleccionado si lo hay
    } else {
      setView("genres"); // Cambiar a vista de géneros si no hay nada en la búsqueda
    }
  }, [location.search]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setView("playlists"); // Cambiar a vista de listas cuando se hace clic en un género
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Se muestra el componente SearchBar solo si no hay resultados de búsqueda */}
        {!searchResult && (
          <SearchBar
            onSearch={() => {
              // Actualiza el estado para indicar que se está buscando desde la lista de listas de reproducción
              setSearchingFromPlaylistList(view === "playlists");
              setView("search");
            }}
          />
        )}
        {/* Se muestran los géneros solo si no hay resultados de búsqueda */}
        {!searchResult && view === "genres" && (
          <GenresList
            setView={setView}
            setSelectedGenre={setSelectedGenre}
            handleGenreClick={handleGenreClick}
          />
        )}
        {/* Condición para mostrar TrackList solo si no se está buscando desde TrackList */}
        {view === "playlists" && !searchingFromPlaylistList && selectedGenre && (
          <PlaylistList
            selectedGenre={selectedGenre}
            setView={setView}
            setSelectedGenre={setSelectedGenre}
          />
        )}
        {/* Se muestra el resultado de la búsqueda si existe */}
        {searchResult && <div>{searchResult}</div>}
      </div>
    </Layout>
  );
};

export default Discover;
