import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import '../SearchBar.css';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(
        debounce((query) => {
            const params = new URLSearchParams(location.search);
            params.set('title', query);
            navigate(`/?${params.toString()}`);
        }, 300),
        [location.search, navigate]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        handleSearch(value);
    };

    return (
        <input
            type="text"
            placeholder="Поиск фильмов..."
            value={searchTerm}
            onChange={handleChange}
            className="search-bar"
        />
    );
};

export default SearchBar;
