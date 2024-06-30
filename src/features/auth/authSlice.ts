import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3030',
});

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string; password: string }) => {
        const response = await axiosInstance.post('/api/v1/login', credentials);
        return response.data.token;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: localStorage.getItem('token') || null },
    reducers: {
        logout(state) {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
