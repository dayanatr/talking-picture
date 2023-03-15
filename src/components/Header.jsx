import React, { useContext,useState } from 'react'
import { Col, Container, Row, Nav, Navbar, Form, Button } from 'react-bootstrap'
import { Link, useLocation } from "react-router-dom";
import { BsHeart, BsFillClockFill, BsSearch } from "react-icons/bs";
import { PictureContext } from '../service'

import { MovieBoard } from './MovieBoard'
import { Pagination } from './Pagination'

export default function Header() {
  let getPageCount;
  const params = useLocation();
  const currentPath = params.pathname;
  const { movies, getFavoriteMovies, getSearchMoviesList, getMovieList, getWatchMovies, totalPages, favoriteTotalPages, watchTotalPages, searchTotalPages } = useContext(PictureContext)
  const [searchValue, getSearchValue] = useState("");
  const handleMovieSearch = (e) => {
    e.preventDefault()
    try {
      if (searchValue) {
        getSearchMoviesList(searchValue)
      }
      else {
        getMovieList()
      }
    } catch (error) {
      console.log(error)
    }
  }
  if (searchValue !== "") {
    getPageCount = searchTotalPages;
  } else if (currentPath === '/favorites') {
    getPageCount = favoriteTotalPages;
  } else if (currentPath === '/watch_later') {
    getPageCount = watchTotalPages;
  } else {
    getPageCount = totalPages;
  }
  return (
    <>
      <Navbar
        className="navbar"
        expand="lg"
        style={{ position: "sticky", height: "fit-content", top: 0, zIndex: 2, backgroundColor: "#161616" }}
      >
        <Container>
          <Navbar.Brand style={{ color: "white", fontWeight: "bold" }} href="/">
            TalkingPicture
          </Navbar.Brand>

          <Navbar.Toggle
            style={{ background: "white" }}
            aria-controls="navbarScroll"
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 d-flex gap-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link
                onClick={getFavoriteMovies}
                to='/favorites'
                style={{
                  color: currentPath === '/favorites' ? "white" : "#afafaf",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: currentPath === '/favorites' ? "bold" : "medium",
                  textDecoration: "none"
                }}
              >
                <BsHeart style={{
                  width: 22,
                  height: 22,
                  marginRight: 6,
                }} />
                Favorites
              </Link>
              <Link
                to='/watch_later' 
                onClick={getWatchMovies}
                style={{
                  color: currentPath === '/watch_later' ? "white" : "#afafaf",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: currentPath === '/watch_later' ? "bold" : "medium",
                  textDecoration: "none"
                }}
              >
                <BsFillClockFill style={{
                  width: 22,
                  height: 22,
                  marginRight: 6,
                }} />
                Watch Later
              </Link>
              <Form onSubmit={handleMovieSearch} data-testid="form" className=' d-flex gap-3 w-50'>
                <Form.Control className='py-2' data-testid="text" placeholder='search movies' value={searchValue} onChange={e => getSearchValue(e.target.value)} />
                <Button data-testid="button" onClick={handleMovieSearch}> <BsSearch /> </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='mt-4'>
        <Row md={3} xs={1} lg={4} className="g-4">
          {movies?.map((item) =>
            <Col key={item.id}>
              <MovieBoard movie={item} />
            </Col>
          )}
        </Row>
        <div className="mt-5 d-flex justify-content-center">
          <Pagination getPageCount={getPageCount} searchValue={searchValue} />
        </div>
      </Container>
    </>
  )
}
