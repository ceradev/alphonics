import Layout from "../../components/layouts/Layout";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [topArtistsData, setTopArtistsData] = useState({});
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("SPOTIFY_ACCESS_TOKEN");

  useEffect(() => {
    const fetchUserData = async () => {
      if (sessionStorage.getItem("USER_ACCESS_TOKEN") === null) {
        navigate("/login");
        return;
      }

      const decodedToken = jwtDecode(sessionStorage.getItem("USER_ACCESS_TOKEN"));
      if (decodedToken.exp * 1000 < Date.now()) {
        navigate("/login");
        return;
      }

      const token = sessionStorage.getItem("USER_ACCESS_TOKEN");
      const userId = decodedToken.id;

      try {
        const response = await fetch(`http://localhost:3000/api/v1/users/` + userId, {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        console.log(data);
        setUserData(data.user);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, [accessToken, navigate]);

  const fetchTopArtists = async () => {
    const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch top artists");
    }

    const data = await response.json();
    setTopArtistsData(data.items);
    console.log(data.items);
  };


  useEffect(() => {
    if (accessToken) {
      fetchTopArtists();
    }
  }, [accessToken, fetchTopArtists]);

  const handleGoBack = () => {
    navigate(-1);
  };
 
  const renderProfilePicture = () => {
    if (userData.profilePic) {
      return (
        <img
          src={userData.profilePic}
          alt="Profile"
          className="profile-pic w-32 h-32 bg-white rounded-full flex items-center justify-center m-auto sm:w-48 sm:h-48 md:w-64 md:h-64"
        />
      );
    } else {
      return (
        <div className="text-4xl text-black sm:text-6xl md:text-8xl">
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
      <div className="w-full flex flex-col items-center mt-8 space-y-4 sm:space-y-8">
        <h1 className="text-2xl font-bold text-red-500 mb-4 sm:text-3xl md:text-4xl">
          Most listened artists
        </h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
          {favoriteArtists.map((artist, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col items-center"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-32 h-32 object-cover sm:w-48 sm:h-48 md:w-64 md:h-64"
              />
              <h3 className="text-lg font-bold text-center text-black sm:text-xl md:text-2xl">{artist.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="profile-header flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center sm:w-48 sm:h-48 md:w-64 md:h-64">
          {renderProfilePicture()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-red-500 sm:text-3xl md:text-4xl">{userData.name}</h1>
          <h1 className="text-2xl font-bold text-red-500 sm:text-3xl md:text-4xl mb-2">{userData.surname}</h1>
          <p className="text-sm text-gray-600 sm:text-base md:text-lg mb-2">{userData.username}</p>
          <p className="text-sm text-gray-600 sm:text-base md:text-lg mb-2">{userData.email}</p>
          <p className="text-sm text-gray-600 sm:text-base md:text-lg mb-2">
            {userData.followedArtists} followed Artists -{" "}
            {userData.followedUsers} followed Users{" "}
          </p>
        </div>
      </div>

      {renderFavoriteArtists()}

    </Layout>
  );
};

export default Profile;
