import { useEffect, useState } from "react";
import Movies from "../movies/Movies";
import useAxiosPrivate from "../../hook/useAxiosPrivate";

const Recommended = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(()=>{
        const fetchRecommendedMovies = async() => {
            setLoading(true);
            setMessage("");

            try{
                const response = await axiosPrivate.get('/recommendedmovies');
                setMovies(response.data);
            } catch(err) {
                console.error("Error in fetching recommended movies:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchRecommendedMovies();
    }, [])

    return (
        <>
        {loading ? (
            <h2>loading.... </h2>
        ) : (
            <Movies movies={movies} message={message} />
        )}
        </>
    )
}

export default Recommended;