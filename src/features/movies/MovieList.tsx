import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import MovieItem from './MovieItem';
import { GENRES_MAP, GenresEnglish } from './moviesTypes';
import {
    selectMoviesData,
    selectMoviesError,
    selectMoviesLoading,
    useGetMoviesQuery,
} from './moviesAPI';
import '../../MovieItem.css';

const toGenresEnglish = (genre: string | undefined): GenresEnglish | undefined => {
    if (genre && Object.keys(GENRES_MAP).includes(genre)) {
        return genre as GenresEnglish;
    }
    return undefined;
};

const toReleaseYears = (year: string | undefined): string | undefined => {
    if (year === '0') {
        return undefined;
    }
    return year;
};

const MovieList: React.FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const title = params.get('title') || undefined;
    const genre = params.get('genre') || undefined;
    const transformedGenre = toGenresEnglish(genre);
    const releaseYear = params.get('release_year') || undefined;
    const transformedReleaseYear = toReleaseYears(releaseYear);

    const queryArgs = { title, genre: transformedGenre, release_year: transformedReleaseYear };

    useGetMoviesQuery(queryArgs);

    const data = useSelector(selectMoviesData(queryArgs));
    const error = useSelector(selectMoviesError(queryArgs));
    const isLoading = useSelector(selectMoviesLoading(queryArgs));

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка загрузки фильмов</div>;

    return (
        <div>
            {data?.search_result.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
