import React, { useContext } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import { PictureContext } from '../service'

export function MovieBoard({ movie }) {
  const { saveFavoriteMovie, saveWatchMovie } = useContext(PictureContext)
  const navigate = useNavigate();
  const saveFavoriteMoviePost = async (id, favoriteParam) => {
    saveFavoriteMovie(id, favoriteParam)
  }
  const saveWatchMoviePost = async (id, watchParam) => {
    saveWatchMovie(id, watchParam)
  }

  const tooltip_content_watch = (movie.watchlist === true) ? "Remove from your watchlist" : "Add to your watchlist"
  const tooltip_content_favorite = (movie.favorite === true) ? "Remove from favorite" : "Add as favorite"

  return (
    <div>
      <Card
        style={{
          width: "100%",
          background: "#161616",
          color: "white",
          borderRadius: 6,
          position: "relative",
        }}
        className=" movie-card"
      >
        <Card.Body>
          <Container>
            <Row>
              <Col></Col>
              <Col data-tooltip-id="my-tooltip"
                data-tooltip-content={tooltip_content_favorite}
                data-tooltip-place="bottom" md="auto" style={{
                  marginBottom: 10,
                  alignItems: "center"
                }}
                onClick={() => {
                  (movie.favorite === true) ? saveFavoriteMoviePost(movie.id, 'removefav') : saveFavoriteMoviePost(movie.id, 'addfav')
                }}
              >
                {movie.icon}
              </Col >
              <Tooltip id="my-tooltip" ></Tooltip>
              <Col data-tooltip-id="watch-tooltip"
                data-tooltip-content={tooltip_content_watch}
                data-tooltip-place="bottom" xs lg="2" style={{
                  marginBottom: 10,
                  alignItems: "center"
                }}
                onClick={() => {
                  (movie.watchlist === true) ? saveWatchMoviePost(movie.id, 'removewatch') : saveWatchMoviePost(movie.id, 'addwatch')
                }}
              >
                {movie.watchicon}
              </Col >
              <Tooltip id="watch-tooltip" ></Tooltip>
            </Row>
          </Container>
          <LazyLoadImage
            src={!movie.poster_path || !movie.backdrop_path ? `https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg` : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            width={"100%"}
            height={350}
            alt="movie"
            effect="blur"
            style={{ objectFit: "cover" }}
          />
          <Card.Title
            onClick={() => navigate(`/${movie.id}`)}
            className="text-center mt-3"
            style={{ cursor: "pointer" }}
          >
            {movie.original_title || movie.title}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};
