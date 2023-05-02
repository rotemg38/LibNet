import axios from 'axios'
import { ENDPOINT } from './repoUtils';

//axios.defaults.withCredentials = true;
const server = axios.create({
    withCredentials: false,
    baseURL: ENDPOINT+"/api/ratings" 
  });

/* HELPFUL FUNCTION TO USE THE DB REGARDING RATING TABLE: */

export async function getAvgRateByBook(idBook) {
    try
    {
        var response = await server.get(`/avg/${idBook}`);
        var data = await response.data;
        return data;
    } catch(e){
        //not found- thus return null
        return null;   
    }     
}


export async function getTopRatedBooks() {
    try
    {
        var response = await server.get(`/topRated`);
        var data = await response.data;
        return data;
    } catch(e){
        //not found- thus return null
        return [];   
    }     
}



export async function updateRating(idUser, idBook, rate) {
    var response = await server.put(`/ratings/${idUser}/${idBook}`, rate);
    console.log(response.data); 
}

export async function addRating(data) {
    
    var response = await server.post("/", data);
    
    console.log(response.data);            
}

export async function getRatingByFilter(filter){
    try
    {
        var response = await server.post("/filtered", filter);
        var data = await response.data;
        return data;
    } catch(e){
        //rating not found
        return null;   
    }     
}

export async function getAllRatingUsersByFilter(filter){
    try
    {
        var response = await server.post("/ratingsUser", filter);
        var data = await response.data;
        
        return data;
        
    } catch(e){
        //users not found
        return [];   
    }     
}
export async function getAllRatingBooksByFilter(filter) {
    try
    {
        var response = await server.post("/ratingsBook", filter);
        var data = await response.data;
        
        return data;
        
    } catch(e){
        //books not found
        return [];   
    }     
}

