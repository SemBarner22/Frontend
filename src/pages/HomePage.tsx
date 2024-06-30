import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../store';
import SearchBar from '../entities/SearchBar';
import GenreFilter from '../entities/GenreFilter';
import YearFilter from '../entities/YearFilter';
import MovieList from '../features/movies/MovieList';
import Modal from '../entities/Modal';
import Auth from '../entities/Auth';
import '../styles.css';

const HomePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);

    const handleLoginClick = () => {
        setIsModalOpen(true);
    };

    const handleLogoutClick = () => {
        dispatch(logout());
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <header>
                <h1>Фильмопоиск</h1>
                {token ? (
                    <button onClick={handleLogoutClick}>Выйти</button>
                ) : (
                    <button onClick={handleLoginClick}>Войти</button>
                )}
            </header>
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
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <Auth onClose={handleCloseModal} />
            </Modal>
        </div>
    );
};

export default HomePage;
