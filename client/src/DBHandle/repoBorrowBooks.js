import axios from 'axios'

//axios.defaults.withCredentials = true;
const server = axios.create({
    withCredentials: false,
    baseURL: "http://localhost:3000/api/borrowBooks" 
  });

/* HELPFUL FUNCTION TO USE THE DB REGARDING USERS TABLE: */

export async function updateBorrowBooks(idUser, books) {

    books.forEach(async book => {
        var response = await server.put(`/borrowBook/${idUser}/${book.idBook}`, book);
        console.log(response.data); 
    });
}
export async function updateReturnBooks(books) {

    books.forEach(async book => {
        var response = await server.put(`/returnBook/${book.idUser}/${book.idBook}/${book.dateBorrow}`);
        console.log(response.data);   
    });  
}

export async function addBorrowBook(data) {
    
    var response = await server.post("/", data);
    
    console.log(response.data);            
}
export async function getAllBorrowUsersByFilter(filter){
    try
    {
        var response = await server.post("/borrowUser", filter);
        var data = await response.data;
        
        return data;
        
    } catch(e){
        //users not found
        return [];   
    }     
}
export async function getAllBorrowedBooksByFilter(filter) {
    try
    {
        var response = await server.post("/borrowBook", filter);
        var data = await response.data;
        
        return data;
        
    } catch(e){
        //books not found
        return [];   
    }     
}

