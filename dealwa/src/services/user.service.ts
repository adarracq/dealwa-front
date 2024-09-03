import { fetchWrapper } from '../utils/FetchWrapper';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/api/user';

export const userService = {
    getUserByEmail,
    getUserById,
    signup,
    login,
    update,
    uploadPicture,
    addZone,
    delete: _delete
};

function getUserByEmail(email: string) {
    return fetchWrapper.get(`${baseUrl}/${email}`);
}

function getUserById(id: string) {
    return fetchWrapper.get(`${baseUrl}/id/${id}`);
}

function signup(params: any) {
    return fetchWrapper.post(baseUrl + '/signup', params);
}

function login(params: any) {
    return fetchWrapper.post(baseUrl + '/login', params);
}

function update(email: string, params: any) {
    return fetchWrapper.put(`${baseUrl}/${email}`, params);
}

function uploadPicture(email: string, formData: any) {
    console.log('uploading picture');
    return fetchWrapper.putImage(`${baseUrl}/picture/${email}`, formData);
}

function addZone(email: string, params: any) {
    return fetchWrapper.post(`${baseUrl}/zone/${email}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(email: string) {
    return fetchWrapper.delete(`${baseUrl}/${email}`);
}
