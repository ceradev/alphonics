import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";

const GenresList = ({ setView, setSelectedGenre }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");

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

  useEffect(() => {
    // Fetch genres
    const fetchGenres = async () => {
      if (!accessToken) return;
      try {
        const response = await fetch("https://api.spotify.com/v1/browse/categories", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await response.json();
        setGenres(data.categories.items);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [accessToken]);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre); // Pasar el objeto de género
    setView("tracks");
  };

  return (
    <div>
      <h2>Genres</h2>
      <Row xs={1} md={4} className="g-4">
        {loading ? (
          <p>Loading genres...</p>
        ) : (
          genres.map((genre, index) => (
            <Col key={index}>
              <Card style={{ cursor: "pointer" }} onClick={() => handleGenreSelect({ id: genre.id, name: genre.name })}> {/* Pasar el objeto de género */}
                <Card.Img variant="top" src={genre.icons[0]?.url} />
                <Card.Body>
                  <Card.Title>{genre.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default GenresList;