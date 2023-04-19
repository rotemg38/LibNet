import axios from 'axios'

//axios.defaults.withCredentials = true;
const server = axios.create({
    withCredentials: false,
    baseURL: "http://localhost:3000/api/users" 
  });

/* HELPFUL FUNCTION TO USE THE DB REGARDING USERS TABLE: */

export async function signIn(data){
    try{
        var response = await server.post("/signin", data);
        console.log(response.data.token)
        return response.data
    } catch(e){
        return null
    }

}

export async function updateUserPass(id, userPass) {
    
    let newUserPass = JSON.parse(JSON.stringify(userPass));
 
    var response = await server.put(`/pass/${id}`, newUserPass);
    
    console.log(response.data);            
}

export async function updateUser(id, user) {
    
    if (user.picUser === "") {
        user.picUser = "default_user.jpg";
    }
    let newUser = JSON.parse(JSON.stringify(user));
 
    var response = await server.put(`/user/${id}`, newUser);
    
    console.log(response.data);            
}
export async function addUser(user) {
    
    if (user.picUser === "") {
        user.picUser = "default_user.jpg";
    }
    let newUser = JSON.parse(JSON.stringify(user));
    
    var response = await server.post("/", newUser);
    
    console.log(response.data);            
}
export async function getUser(idUser) {
    try
    {
        var response = await server.get(`/user/${idUser}`);
        var data = await response.data;
        return data;
    } catch(e){
        //book not found- thus return null
        return null;   
    }     
}

export async function getAllUsers() {
    try
    {
        var response = await server.get(`/`);
        var data = await response.data;
        return data;
    } catch(e){
        //book not found- thus return null
        return null;   
    }     
}

