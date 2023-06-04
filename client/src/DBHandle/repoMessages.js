import axios from 'axios'
import { ENDPOINT } from './repoUtils';

//axios.defaults.withCredentials = true;
const server = axios.create({
    withCredentials: false,
    baseURL: ENDPOINT + "/api/messages"
});

/* HELPFUL FUNCTION TO USE THE DB REGARDING MESSAGES TABLE: */


export async function getForumActivity() {
    try {
        var response = await server.get("/forumActivity");
        var data = await response.data;

        return data;

    } catch (e) {
        //activity not found
        return [];
    }
}

export async function addMessage(data) {
    console.log(data)
    var response = await server.post("/", data);

    console.log(response.data);
    return response.data.idMsg;
}


export async function getMessagesByFilter(filter) {
    try {
        var response = await server.post("/filtered", filter);
        var data = await response.data;
        return data;
    } catch (e) {
        //messages not found
        return [];
    }
}


