import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const YEARS = {
    '0': 'Не выбран',
    '2009': '2009',
    '2008': '2008',
    '2007': '2007',
    '2006': '2006',
    '1990-2005': '1990-2005',
    '1950-1989': '1950-1989',
};

const YearFilter: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const year = params.get('release_year') || '0';

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        params.set('release_year', e.target.value);
        navigate({ search: params.toString() });
    };

    return (
        <select value={year} onChange={handleChange}>
            {Object.entries(YEARS).map(([key, value]) => (
                <option key={key} value={key}>
                    {value}
                </option>
            ))}
        </select>
    );
};

export default YearFilter;
