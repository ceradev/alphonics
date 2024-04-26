import React, { useState, useEffect } from 'react';

const ApiAccessTokenProvider = () => {
  const [accessToken, setAccessToken] = useState(null);
  const CLIENT_ID = "e269b673d31546e6a6b44f63f4aeadc0";
  const CLIENT_SECRET = "1f1ca0920b104536bb29efd3d84c784a";

  useEffect(() => {
    // API Access Token
    const fetchAccessToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch access token");
        }
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  return null;
};

export default ApiAccessTokenProvider;
