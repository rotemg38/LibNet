import axios from 'axios'
import { ENDPOINT } from './repoUtils';

//axios.defaults.withCredentials = true;
const server = axios.create({
    withCredentials: false,
    baseURL: ENDPOINT+"/api/books" 
  });

/* HELPFUL FUNCTION TO USE THE DB REGARDING BOOKS TABLE: */

export async function getAdvancedSearchInfo(){
    var data = {}
    try
    {
        
        var respons = await server.get("/language");
        var resdata = await respons.data;
        data["language"] = resdata

        respons = await server.get("/location");
        resdata = await respons.data;
        data["location"] = resdata

        respons = await server.get("/category");
        resdata = await respons.data;
        data["category"] = resdata

        return data;
    } catch(e){
        //books not found
        return data;
        
    }
}

export async function getBooksByFilter(filter) {
    try
    {
        let newFilter = JSON.parse(JSON.stringify(filter));
        var respons = await server.post("/book", newFilter);
        var data = await respons.data;
        
        return data;
    } catch(e){
        //books not found
        return [];
        
    }
    
}

export async function getAllBooks() {
    try
    {
        var respons = await server.get("/");
        var data = await respons.data;
        return data;
    } catch(e){
        //books not found
        return [];
        
    }
}

export async function addBook(book) {
    
    if (book.picBook === "") {
        book.picBook = "default_book.png";
    }
    let newBook = JSON.parse(JSON.stringify(book));
    //console.log(newBook)
    var response = await server.post("/", newBook);
    
    console.log(response.data);            
}

export async function getBook(idBook) {
    try
    {
        var response = await server.get(`/book/${idBook}`);
        var data = await response.data;
        return data;
    } catch(e){
        //book not found- thus return null
        return null;   
    }     
}

export async function getTop4NewBooks() {
    try
    {
        var response = await server.get(`/newBooks`);
        var data = await response.data;
        return data;
    } catch(e){
        //book not found- thus return null
        return null;   
    }     
}

export async function updateBooks(books){
    books.forEach(async book => {
        var response = await server.put(`/book/${book.idBook}`, book);
        console.log(response.data); 
    });
        
}
