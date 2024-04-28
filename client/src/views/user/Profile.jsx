import Layout from "../../components/layouts/Layout";
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
      return (
        <img
          src={userData.profilePic}
          alt="Profile"
          className="profile-pic w-32 h-32 bg-white rounded-full flex items-center justify-center m-auto"
        />
      );
    } else {
      return (
        <div className="text-4xl text-black">
          <FaUser className="profile-icon" />
        </div>
      );
    }
  };

  const renderFavoriteArtists = () => {
    const favoriteArtists = [
      { id: 1, name: "Artist 1", image: "url_to_artist_1_image" },
      { id: 2, name: "Artist 2", image: "url_to_artist_2_image" },
      { id: 3, name: "Artist 3", image: "url_to_artist_3_image" },
    ];

    return (
      <div className="w-full flex flex-col items-center mt-8">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Most listened artists</h1>
        <div className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-[300px]">
          {favoriteArtists.map((artist, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:scale-105"
            >
              <img src={artist.image} alt={artist.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-black">{artist.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFavoriteSongs = () => {
    const favoriteSongs = [
      { id: 1, name: "Song", artists: ["Artist"], duration: "3:42" },
      { id: 2, name: "Song", artists: ["Artist"], duration: "4:15" },
      { id: 3, name: "Song", artists: ["Artist"], duration: "2:58" },
    ];

    return (
      <div className="w-full flex flex-col items-center mt-8 mb-8">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Your most played songs this month</h2>
        <div className="w-full max-w-screen-lg">
          <div className="table-wrapper">
            <table className="favorite-songs-table w-full bg-white border border-collapse border-gray-300 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Número</th>
                  <th className="px-4 py-2 border border-gray-300">Canciones</th>
                </tr>
              </thead>
              <tbody>
                {favoriteSongs.map((song, index) => (
                  <tr key={song.id} className="border border-gray-300">
                    <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                    <td className="song-details px-4 py-2 border border-gray-300">
                      <div className="flex items-center">
                        <div className="flex-grow truncate">{song.name} by {song.artists.join(", ")}</div>
                        <div className="text-xs">{song.duration}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="profile-header flex items-center justify-center space-x-4 p-4">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
          {renderProfilePicture()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-red-500">{userData.name}</h1>
          <p className="text-sm text-gray-600">{userData.followedArtists} followed Artists - {userData.followedUsers} followed Users </p>
        </div>
      </div>

      {renderFavoriteArtists()}

      {renderFavoriteSongs()}
    </Layout>
  );
};

export default Profile;
