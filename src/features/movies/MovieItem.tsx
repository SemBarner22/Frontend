import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ShortMovieInfo } from './moviesTypes';
import { Link } from 'react-router-dom';
import '../../MovieItem.css';

const MovieItem: React.FC<{ movie: ShortMovieInfo }> = ({ movie }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(movie.rating || 0); // Предполагается, что у фильма есть поле rating

    const handleRatingClick = (newRating: number) => {
        if (token) {
            setRating(newRating);
            // Логика для отправки рейтинга на сервер
            console.log(`Поставлен рейтинг ${newRating} для фильма ${movie.title}`);
        } else {
            console.log('Необходимо залогиниться для выставления рейтинга');
        }
    };

    const handleMouseEnter = (newRating: number) => {
        setHoverRating(newRating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="movie-card">
            <img src={movie.poster} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
                <Link to={`/movie/${movie.id}`}>
                    <h2>{movie.title}</h2>
                </Link>
                <p><strong>Жанр:</strong> {movie.genre}</p>
                <p><strong>Год выпуска:</strong> {movie.release_year}</p>
                <p><strong>Описание:</strong> {movie.description}</p>
            </div>
            <div className="movie-rating">
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleRatingClick(star)}
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
    );
};

export default MovieItem;
