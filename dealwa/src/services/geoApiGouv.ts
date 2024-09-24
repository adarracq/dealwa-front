import { fetchWrapper } from '../utils/FetchWrapper';

const baseUrl = 'https://geo.api.gouv.fr';

export const geoApiGouvService = {
    getByCoords,
};


function getByCoords(lat: number, lon: number) {
    return fetchWrapper.get(`${baseUrl}/communes?lat=${lat}&lon=${lon}&fields=code,nom,population,contour,'`);
}

