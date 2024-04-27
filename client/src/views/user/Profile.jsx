import Layout from "../layouts/Layout";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    profilePic: "",
    followedArtists: 0,
    followedUsers: 0,
  });

  useEffect(() => {
    // Simulation of user data retrieved from API
    const mockUserData = {
      name: "Pepe",
      username: "pepeTheFrog",
      profilePic: "", // Replace with actual profile picture URL
      followedArtists: 42,
      followedUsers: 123,
    };
    setUserData(mockUserData);
  }, []);

  const renderProfilePicture = () => {
    if (userData.profilePic) {
      return <img src={userData.profilePic} alt="Profile" className="profile-pic" />;
    } else {
      return <FaUser className="profile-icon" />;
    }
  };

  const renderFavoriteArtists = () => {
    // Replace with actual data of most listened artists from API
    const favoriteArtists = [
      { id: 1, name: "Artist 1", image: "url_to_artist_1_image" },
      { id: 2, name: "Artist 2", image: "url_to_artist_2_image" },
      { id: 3, name: "Artist 3", image: "url_to_artist_3_image" },
    ];

    return (
      <div className="w-full flex flex-col items-center mt-8"> {/* Centrar todo */}
        <h1 className="text-2xl font-bold mb-4">Artistas más escuchados</h1>
        <div className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-[300px]"> {/* Aplicar margen solo a los cards */}
          {favoriteArtists.map((artist, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={artist.image} alt={artist.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{artist.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };    

  const renderFavoriteSongs = () => {
    // Replace with actual data of most listened songs from API
    const favoriteSongs = [
      { id: 1, name: "Song", artists: ["Artist"], duration: "3:42" },
      { id: 2, name: "Song", artists: ["Artist"], duration: "4:15" },
      { id: 3, name: "Song", artists: ["Artist"], duration: "2:58" },
    ];

    return (
      <div className="w-full flex flex-col items-center mt-8">
        <h2 className="text-2xl font-bold mb-4">Tus canciones más escuchadas de este mes</h2>
        <div className="w-full max-w-screen-lg">
          <table className="favorite-songs-table w-full bg-white text-black border border-collapse border-black rounded-lg">
            <thead>
              <tr>
              <th className="border border-black" colSpan="2">Canción</th>
              </tr>
            </thead>
            <tbody>
              {favoriteSongs.map((song, index) => (
                <tr key={song.id} className="border border-black">
                  <td className="border border-black text-center">{index + 1}</td>
                  <td className="song-details border border-black p-2 text-center">
                    {song.name} by {song.artists.join(", ")} - {song.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );     
  };    

  return (
    <Layout>
      <div className="profile-header flex items-center justify-center space-x-4"> {/* Añadir espacio entre elementos */}
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
          <div className="text-4xl">
            {renderProfilePicture()}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <p className="text-lg font-bold">{userData.followedArtists} Artistas seguidos {userData.followedUsers} Usuarios seguidos</p>
        </div>
      </div>

      {renderFavoriteArtists()}

      {renderFavoriteSongs()}
    </Layout>
  );
};

export default Profile;