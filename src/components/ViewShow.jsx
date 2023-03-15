import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getShowDetails } from "../request";

export default function ViewShow() {
    const navigate = useNavigate();
    const [movieInfo, setMovieInfo] = useState();
    const params = useParams()
    const { id: movieId } = params
    useEffect(() => {
        const getMovieDetails = async () => {
            const url = getShowDetails(movieId)
            const { data } = await axios.get(url)
            setMovieInfo(data)
        }
        getMovieDetails();
    }, [movieId]);

    return (
        <>
            <Container style={{ background: "gray" }}>
                <div className=" mt-4">
                    <div id="showinfo" className=" d-flex gap-5">
                        <img style={{ borderRadius: 5, boxShadow: "rgb(46 255 14 / 10%) -1px -1px 57px 1px", width: 350, height: 500, objectFit: 'cover' }} src={`https://image.tmdb.org/t/p/w500${movieInfo?.backdrop_path}`} alt='movie thumnail' />
                        <div className="mt-5">
                            <h3 style={{ fontSize: 33, color: 'black' }}>{movieInfo?.original_title || movieInfo?.title}</h3>
                            <div className="d-flex gap-2 mt-3">

                            </div>
                            <p style={{ color: "black", marginTop: 15, lineHeight: 1.8 }}>{movieInfo?.overview}</p>
                            <p style={{ color: 'black', fontWeight: "bold" }}>Release Date: {movieInfo?.release_date
                            }</p>
                        </div>
                        <div className=" gap-4" style={{ marginTop: 15 }}> <button style={{ color: "black", background: "#e94d45", borderRadius: 8.375, fontSize: 20, borderWidth: 3, borderColor: "blue", fontStyle: "italic", fontWeight: 500 }}
                            onClick={() => navigate(-1)}
                        > Back</button></div>
                    </div>
                </div>
            </Container>
        </>
    )
}
