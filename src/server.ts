import express from "express";

const app = express();

app.get('/test', (req, res) => {
    return res.send("Hello World - GET");
})

app.post('/test-post', (req,res) => {
    return res.send("Hello World - POST");
})

app.listen(5000, () => console.log("Server is running on port 5000"));