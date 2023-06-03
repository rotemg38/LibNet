import axios from 'axios'
import { ENDPOINT } from './repoUtils';

//axios.defaults.withCredentials = true;
const server = axios.create({
    withCredentials: false,
    baseURL: ENDPOINT + "/api/recommendations"
});

/* HELPFUL FUNCTION TO USE THE DB REGARDING RECOMMENDATIONS TABLE: */

export async function getRecommendationsByUser(idUser) {
    try {
        var response = await server.get(`/${idUser}`);
        var data = await response.data;
        return data;
    } catch (e) {
        //recommendations not found
        return null;
    }
}
