import axios from 'axios'
import { ENDPOINT } from './repoUtils';

//axios.defaults.withCredentials = true;
const server = axios.create({
    withCredentials: false,
    baseURL: ENDPOINT+"/api/requests" 
  });

/* HELPFUL FUNCTION TO USE THE DB REGARDING REQUEST TABLE: */

export async function getAllRequests() {
    try
    {
        var response = await server.get(`/`);
        var data = await response.data;
        return data;
    } catch(e){
        //requests not found
        return [];   
    }     
}

export async function addRequest(data) {
    
    var response = await server.post("/", data);
    
    console.log(response.data);            
}

export async function updateRequest(idReq, request){
    var response = await server.put(`/request/${idReq}`, request);
    console.log(response.data); 
}

export async function getRequestByFilter(filter){
    try
    {
        var response = await server.post("/filtered", filter);
        var data = await response.data;
        return data;
    } catch(e){
        //requests not found
        return {};   
    }     
}


