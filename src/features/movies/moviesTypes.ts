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
    name: string;
    photo: string; // base64 img
}

export type FullMovieInfo = {
    id: string;
    title: string;
    description: string;
    release_year: number;
    poster: string; // base64 img
    genre: string;
    rating: number; // float
    total_rates_count: number; // int
    actors: Actor[];
}

// Сокращенная информация о фильме
export type ShortMovieInfo = Omit<FullMovieInfo, 'actors' | 'total_rates_count'>;

// Параметры поиска
export type SearchMoviesParams = {
    title?: string;
    genre?: GenresEnglish;
    release_year?: string;
    sort_by?: 'release_year' | 'title' | 'rating';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

// Ответ от API на запрос списка фильмов
export type SearchMoviesResponse = {
    search_result: ShortMovieInfo[];
    total_pages: number;
}

// Параметры для рейтинга фильма
export type RateMovieParams = {
    movieId: string;
    user_rate: number; // значение от 1 до 5
}

export type ApiError = {
    error: string;
}
