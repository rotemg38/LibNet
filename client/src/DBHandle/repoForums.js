import axios from 'axios'
import { ENDPOINT } from './repoUtils';

//axios.defaults.withCredentials = true;
const server = axios.create({
    withCredentials: false,
    baseURL: ENDPOINT + "/api/forums"
});

/* HELPFUL FUNCTION TO USE THE DB REGARDING FORUM TABLE: */

export async function getAllForumsWithDiscNum() {
    try {
        var response = await server.get(`/withDiscNum`);
        var data = await response.data;
        return data;
    } catch (e) {
        //forums not found
        return [];
    }
}

export async function getAllForums() {
    try {
        var response = await server.get(`/`);
        var data = await response.data;
        return data;
    } catch (e) {
        //forums not found
        return [];
    }
}



export async function getForumByFilter(filter) {
    try {
        var response = await server.post("/filtered", filter);
        var data = await response.data;
        return data;
    } catch (e) {
        //forum not found
        return null;
    }
}

export async function addForum(data) {

    var response = await server.post("/", data);

    console.log(response.data);
}
