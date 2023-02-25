const express = require('express')
const app = express()

/*app.get("/api", (req ,res) => {
    res.json({"user":"user1"})
})*/

app.listen(3000,()=>{console.log("Server started on port 3000")})