export const GENRES_MAP = {
    comedy: 'комедия',
    drama: 'драма',
    action: 'боевик',
    thriller: 'триллер',
    horror: 'ужасы',
    family: 'семейный',
    cartoon: 'анимированный',
    fantasy: 'фэнтези',
    romance: 'романтика',
    adventure: 'приключения',
    musical: 'мьюзикл',
    war: 'военный',
} as const;

export type GenresEnglish = keyof typeof GENRES_MAP;
export type GenresRussian = typeof GENRES_MAP[GenresEnglish];

export type Actor = {
    id: string;
    name: string;
    photo: string;
}

export type FullMovieInfo = {
    id: string;
    title: string;
    description: string;
    release_year: number;
    poster: string;
    genre: string;
    rating: number;
    total_rates_count: number;
    actors: Actor[];
}

export type ShortMovieInfo = Omit<FullMovieInfo, 'actors' | 'total_rates_count'>;

export type SearchMoviesParams = {
    title?: string;
    genre?: GenresEnglish;
    release_year?: string;
    sort_by?: 'release_year' | 'title' | 'rating';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

export type SearchMoviesResponse = {
    search_result: ShortMovieInfo[];
    total_pages: number;
}

export type RateMovieParams = {
    movieId: string;
    user_rate: number;
}

export type ApiError = {
    error: string;
}
