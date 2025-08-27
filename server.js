//server.js
//connection to the api (creating server)
const password= require('./secret')
const express = require('express');
const app=express();
app.use(express.json());//to parse json request body
const port=5555;
//mongoDb
const {MongoClient, ObjectId}=require('mongodb');
const uri = `mongodb+srv://itaysegev:${password}@cluster0.sh1plvg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client=new MongoClient(uri);
const validator = require('validator');

function validEmail(email){
     return typeof email === 'string' && validator.isEmail(email);
}

function connectToMongoClient(db) {
        client.connect();
        console.log("Connected to MongoDB");
        return client.db(db);
}

function disconnectToMongoClient(db) {
    return ""//client.close();
}


app.listen(port,'0.0.0.0',()=>{console.log("server listening on port:",port)})

app.get("/posts",async (req,res)=>{
    try {

        const db=connectToMongoClient("onb")
        posts = await db.collection("posts").find().sort("Creation Date","asc").toArray()
        res.json(posts)
        console.log(disconnectToMongoClient())
    }catch(e){
        res.status(500).json({error:e.message})
        console.log("error in get posts")
    }
})

app.get("/posts/:id",async (req,res)=>{
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({error: "Invalid ObjectId format"})
        }
        const db=connectToMongoClient("onb")
        post = await db.collection("posts").find({"_id":new ObjectId(req.params.id)}).toArray()
        res.json(post)
        console.log(disconnectToMongoClient())
    }catch(e){
        res.status(500).json({error:e.message})
        console.log("error in get post by id")
    }
})

app.get("/posts/author/:Author",async (req,res)=>{
    try {
        const db=connectToMongoClient("onb")
        post = await db.collection("posts").find({"Author":req.params.Author}).toArray()
        res.json(post)
        console.log(disconnectToMongoClient())
    }catch(e){
        res.status(500).json({error:e.message})
        console.log("error in get post by author")
    }
})

app.delete("/posts/:id",async (req,res)=>{
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({error: "Invalid ObjectId format"})
        }
        const db = connectToMongoClient("onb")
        result = await db.collection("posts").deleteOne({"_id": new ObjectId(req.params.id)});
        if (result.deletedCount === 0) {
            res.status(404).json({"error": "No posts found"})
        } else {
            res.status(200).json({"accepted": "post deleted successfully"})
        }
        console.log(disconnectToMongoClient())
    }catch(e){
        res.status(500).json({error:e.message})
        console.log("error in delete post by id")
    }
})

app.post("/users",async (req,res)=>{
    try{
        const db=connectToMongoClient("onb")
        result = await db.collection("users").insertOne(req.body)
        user = await db.collection("users").findOne({"_id":result.insertedId})
        res.status(201).json(user)
        console.log("user added")
    }catch(e){
        res.status(500).json({error:e.message})
        console.log("error in add user")
    }
    console.log(disconnectToMongoClient())
})

app.post("/posts",async (req,res)=>{
    try{
        const body=req.body;
        console.log(body);
        if(validEmail(body.Author)) {
            const db=connectToMongoClient("onb")
            result = await db.collection("posts").insertOne(body)
            post = await db.collection("posts").findOne({"_id":result.insertedId})
            res.status(201).json(post)
            console.log("post added")
        }else{
            res.status(400).json({error:"Author Email not Valid: " + body.Author})
        }
    }catch(e){
        res.status(500).json({error:e.message})
        console.log("error in add post")
    }
    console.log(disconnectToMongoClient())
})


app.get("/posts/title/:Title",async (req,res)=>{
    try{
        const db=connectToMongoClient("onb")
        post = await db.collection("posts").findOne({"Title":req.params.Title})
        res.status(200).json(post)
        console.log("post found by title")
    }catch(e){
        res.status(500).json({error:e.message})
        console.log("error in get post by title")
    }
    console.log(disconnectToMongoClient())
})



