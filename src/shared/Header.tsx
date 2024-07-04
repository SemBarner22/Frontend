import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../user.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../features/auth/authSlice';
import '../Header.css';
import Modal from '../entities/Modal';
import Auth from '../entities/Auth';

const Header: React.FC = () => {
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
        <header className="header">
            <Link to="/" className="logo">Фильмопоиск</Link>
            {token ? (
                <div className="user_icon_div">
                    <img className="user_icon" src={userIcon} alt="user icon"/>
                    <button onClick={handleLogoutClick} className="logout-button">Выйти</button>
                </div>
            ) : (
                <button onClick={handleLoginClick} className="login-button">Войти</button>
            )}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <Auth onClose={handleCloseModal}/>
            </Modal>
        </header>
    );
};

export default Header;
