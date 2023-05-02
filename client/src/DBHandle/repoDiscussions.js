import axios from 'axios'
import { ENDPOINT } from './repoUtils';

//axios.defaults.withCredentials = true;
const server = axios.create({
    withCredentials: false,
    baseURL: ENDPOINT+"/api/discussions" 
  });

/* HELPFUL FUNCTION TO USE THE DB REGARDING DISCUSSION TABLE: */

export async function addDiscussion(data) {
    console.log(data)
    var response = await server.post("/", data);
    console.log(response.data);
    
    return response.data.idDisc;
}

export async function getDiscussionsByForumWithReplies(forumId) {
    try
    {
        var response = await server.get(`/withReplies/${forumId}`);
        var data = await response.data;
        return data;
    } catch(e){
        //forums not found
        return [];   
    }     
}

export async function getDiscussionsByFilter(filter){
    try
    {
        var response = await server.post("/filtered", filter);
        var data = await response.data;
        return data;
    } catch(e){
        //discussions not found
        return [];   
    }     
}
