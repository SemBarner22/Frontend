import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieByIdQuery, useRateMovieMutation } from '../features/movies/moviesAPI';
import '../MoviePage.css';
import {Actor} from '../features/movies/moviesTypes';
import Header from '../shared/Header';

const MoviePage: React.FC = () => {
    const { id } = useParams() as { id: string };
    const { data, error, isLoading } = useGetMovieByIdQuery(id);
    const [rateMovie] = useRateMovieMutation();
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(0);

    const handleRate = (rate: number) => {
        rateMovie({ movieId: id, user_rate: rate });
        setRating(rate);
    };

    const handleMouseEnter = (rate: number) => {
        setHoverRating(rate);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка загрузки фильма</div>;

    return (
        <div>
            <Header />
            <div className="movie-page">
                <div className="movie-details">
                    <img src={data?.poster} alt={data?.title} className="movie-poster" />
                    <div className="movie-info">
                        <h2>{data?.title}</h2>
                        <p><strong>Жанр:</strong> {data?.genre}</p>
                        <p><strong>Год выпуска:</strong> {data?.release_year}</p>
                        <p><strong>Рейтинг:</strong> {data?.rating}</p>
                        <p><strong>Описание:</strong> {data?.description}</p>
                    </div>
                    <div className="movie-rating">
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => handleRate(star)}
                                    onMouseEnter={() => handleMouseEnter(star)}
                                    onMouseLeave={handleMouseLeave}
                                    className={star <= (hoverRating || rating) ? 'filled' : ''}
                                >
                                    ☆
                                </span>
                            ))}
                        </div>
                        <div className="rating-numbers">
                            {[1, 2, 3, 4, 5].map((number) => (
                                <span key={number}>{number}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <h3>Актеры</h3>
                <div className="actors-list">
                    {data?.actors.map((actor: Actor) => (
                        <div key={actor.id} className="actor-card">
                            <img src={actor.photo} alt={actor.name} className="actor-photo" />
                            <p>{actor.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MoviePage;
