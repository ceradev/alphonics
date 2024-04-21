import React from 'react';
import Layout from '../layouts/Layout';
import { FaUser } from 'react-icons/fa';

const Library = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4">
                {/* Sección de encabezado */}
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <FaUser className="text-gray-500 text-3xl" />
                        </div>
                        <div className="ml-4">
                            <h1 className="text-xl font-bold">Pepe the Frog</h1>
                            <p>Listas de reproducción: 5</p>
                            <p>Usuarios seguidos: 20</p>
                        </div>
                    </div>
                    <div>
                        {/* Barra de búsqueda */}
                        <input type="text" placeholder="Buscar en la biblioteca" className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400" />
                    </div>
                </div>

                {/* Sección de listas de reproducción */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Listas de reproducción</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Lista de reproducción 1 */}
                        <div className="bg-white rounded-md shadow-md overflow-hidden">
                            <img src="url_to_playlist_image" alt="Playlist" className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">Playlist 1</h3>
                                <p className="text-sm text-gray-500">Canciones: 10</p>
                            </div>
                        </div>

                        {/* Lista de reproducción 2 */}
                        <div className="bg-white rounded-md shadow-md overflow-hidden">
                            <img src="url_to_playlist_image" alt="Playlist" className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">Playlist 2</h3>
                                <p className="text-sm text-gray-500">Canciones: 15</p>
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
