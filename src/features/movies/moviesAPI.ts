import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FullMovieInfo, GenresEnglish, ShortMovieInfo } from './moviesTypes';
import { RootState } from '../../store';

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1' }),
    endpoints: (builder) => ({
        getMovies: builder.query<{
            search_result: ShortMovieInfo[];
            total_pages: number;
        }, {
            title?: string;
            genre?: GenresEnglish;
            release_year?: string;
            sort_by?: 'release_year' | 'title' | 'rating';
            order?: 'asc' | 'desc';
            page?: number;
            limit?: number;
        }>({
            query: ({ title, genre, release_year, sort_by = 'rating', order = 'desc', page = 1, limit = 5 }) => ({
                url: 'search',
                params: { title, genre, release_year, sort_by, order, page, limit },
            }),
        }),
        getMovieById: builder.query<FullMovieInfo, string>({
            query: (id) => `movie/${id}`,
        }),
        rateMovie: builder.mutation<void, { movieId: string; user_rate: number }>({
            query: ({ movieId, user_rate }) => ({
                url: 'rateMovie',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: { movieId, user_rate },
            }),
        }),
    }),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery, useRateMovieMutation } = moviesApi;

export const selectMoviesResult = (queryArgs: { title?: string, genre?: GenresEnglish, release_year?: string }) =>
    moviesApi.endpoints.getMovies.select(queryArgs);

export const selectMoviesData = (queryArgs: { title?: string, genre?: GenresEnglish, release_year?: string }) => (state: RootState) =>
    selectMoviesResult(queryArgs)(state)?.data;

export const selectMoviesError = (queryArgs: { title?: string, genre?: GenresEnglish, release_year?: string }) => (state: RootState) =>
    selectMoviesResult(queryArgs)(state)?.error;

export const selectMoviesLoading = (queryArgs: { title?: string, genre?: GenresEnglish, release_year?: string }) => (state: RootState) =>
    selectMoviesResult(queryArgs)(state)?.isLoading;
