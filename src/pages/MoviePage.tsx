import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieByIdQuery, useRateMovieMutation } from '../features/movies/moviesAPI';

const MoviePage: React.FC = () => {
    const { id } = useParams() as { id: string };
    const { data, error, isLoading } = useGetMovieByIdQuery(id);
    const [rateMovie] = useRateMovieMutation();

    const handleRate = (rate: number) => {
        rateMovie({ movieId: id, user_rate: rate });
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка загрузки фильма</div>;

    return (
        <div>
            <img src={`${data?.poster}`} alt={data?.title} />
            <h1>{data?.title}</h1>
            <p>{data?.description}</p>
            <p>Год выпуска: {data?.release_year}</p>
            <p>Жанр: {data?.genre}</p>
            <p>Рейтинг: {data?.rating}</p>
            <p>Количество оценок: {data?.total_rates_count}</p>
            <h3>Актеры:</h3>
            <ul>
                {data?.actors.map((actor) => (
                    <li key={actor.name}>
                        <img src={`${actor.photo}`} alt={actor.name} />
                        <p>{actor.name}</p>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => handleRate(1)}>1</button>
                <button onClick={() => handleRate(2)}>2</button>
                <button onClick={() => handleRate(3)}>3</button>
                <button onClick={() => handleRate(4)}>4</button>
                <button onClick={() => handleRate(5)}>5</button>
            </div>
        </div>
    );
};

export default MoviePage;