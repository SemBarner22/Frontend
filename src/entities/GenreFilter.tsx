import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GENRES = {
    '0': 'Не выбран',
    comedy: 'Комедия',
    drama: 'Драма',
    action: 'Боевик',
    thriller: 'Триллер',
    horror: 'Ужасы',
    family: 'Семейный',
    cartoon: 'Анимированный',
    fantasy: 'Фэнтези',
    romance: 'Романтика',
    adventure: 'Приключения',
    musical: 'Мьюзикл',
    war: 'Военный',
};

const GenreFilter: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const genre = params.get('genre') || '0';

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        params.set('genre', e.target.value);
        navigate({ search: params.toString() });
    };

    return (
        <select value={genre} onChange={handleChange}>
            {Object.entries(GENRES).map(([key, value]) => (
                <option key={key} value={key}>
                    {value}
                </option>
            ))}
        </select>
    );
};

export default GenreFilter;
