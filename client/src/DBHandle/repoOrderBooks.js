import axios from 'axios'

//axios.defaults.withCredentials = true;
const server = axios.create({
    withCredentials: false,
    baseURL: "http://localhost:3000/api/orderBooks" 
  });

/* HELPFUL FUNCTION TO USE THE DB REGARDING USERS TABLE: */

export async function updateOrderBook(idBook, idUser, data) {

    let newData = JSON.parse(JSON.stringify(data));
 
    var response = await server.put(`/orderBook/${idUser}/${idBook}`, newData);
    
    console.log(response.data);            
}

export async function updateArriveBook(idBook) {
 
    var response = await server.put(`/arriveBook/${idBook}`);
    
    console.log(response.data);            
}

export async function addOrderBook(data) {
    
    var response = await server.post("/", data);
    
    console.log(response.data);            
}

export async function getAllOrderUsersByFilter(filter) {
    try
    {
        var response = await server.post("/orderUser", filter);
        var data = await response.data;
        return data;
    } catch(e){
        //users not found
        return [];   
    }     
}

export async function getAllOrderBooksByFilter(filter) {
    try
    {
        var response = await server.post("/orderBook", filter);
        var data = await response.data;
        return data;
    } catch(e){
        //books not found
        return [];   
    }     
}

