import React, { useState } from 'react';
import { login } from '../features/auth/authSlice';
import {useAppDispatch} from '../store';
import '../Auth.css';

const Auth: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const dispatch = useAppDispatch();

    const validate = () => {
        const newErrors: { username?: string; password?: string } = {};
        if (!username) newErrors.username = 'Логин обязателен';
        if (!password) newErrors.password = 'Пароль обязателен';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            dispatch(login({ username, password })).then(() => onClose());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Авторизация</h2>
            <label>
                <div className="label-text">
                    Логин:
                    <span>*</span>
                </div>
                <input
                    type="text"
                    placeholder="Введите логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={errors.username ? 'error' : ''}
                />
            </label>
            {errors.username && <span className="error-text">{errors.username}</span>}
            <label>
                <div className="label-text">
                    Пароль:
                    <span>*</span>
                </div>
                <input
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? 'error' : ''}
                />
            </label>
            {errors.password && <span className="error-text">{errors.password}</span>}
            <div className="auth-buttons">
                <button type="submit">Войти</button>
                <button type="button" onClick={onClose}>Отменить</button>
            </div>
        </form>
    );
};

export default Auth;