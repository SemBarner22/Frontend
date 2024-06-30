import React from 'react';
import SearchBar from '../entities/SearchBar';
import GenreFilter from '../entities/GenreFilter';
import YearFilter from '../entities/YearFilter';
import MovieList from '../features/movies/MovieList';
import '../styles.css';
import Header from '../shared/Header';

const HomePage: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <aside className="sidebar">
                    <h2>Фильтр</h2>
                    <div>
                        <label>Жанр:</label>
                        <GenreFilter/>
                    </div>
                    <div>
                        <label>Год выпуска:</label>
                        <YearFilter/>
                    </div>
                </aside>
                <div className="content">
                    <SearchBar/>
                    <MovieList />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
