import http from '../httpService';

export const getSoftwareList = () => {
    return http.get('/api/environment/list');
}; 