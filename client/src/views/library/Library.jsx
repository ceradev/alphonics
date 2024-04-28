import Layout from "../../components/layouts/Layout";
import { FaUser } from "react-icons/fa";

const Library = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        {/* Sección de encabezado */}
        <div className="flex items-center justify-between py-4 animate-fade-in-down">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-3xl" />
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-gray-900">Pepe the Frog</h1>
              <p className="text-sm text-gray-600">Listas de reproducción: 5</p>
              <p className="text-sm text-gray-600">Usuarios seguidos: 20</p>
            </div>
          </div>
          <div>
            {/* Barra de búsqueda */}
            <input
              type="text"
              placeholder="Buscar en la biblioteca"
              className="border-2 border-transparent rounded-md px-4 py-2 w-full focus:outline-none focus:border-red-500 transition-colors ease-in-out delay-100 duration-300 focus:shadow-sm shadow-md"
            />
          </div>
        </div>

        {/* Sección de listas de reproducción */}
        <div className="mt-8 animate-fade-in-down">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Listas de reproducción
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Lista de reproducción 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-slide-up">
              <img
                src="url_to_playlist_image"
                alt="Playlist"
                className="h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Playlist 1
                </h3>
                <p className="text-sm text-gray-600">Canciones: 10</p>
              </div>
            </div>

            {/* Lista de reproducción 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-slide-up">
              <img
                src="url_to_playlist_image"
                alt="Playlist"
                className="h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Playlist 2
                </h3>
                <p className="text-sm text-gray-600">Canciones: 15</p>
              </div>
            </div>

            {/* Otras listas de reproducción... */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Library;
