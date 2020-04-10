const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
var bodyParser = require("body-parser");
var cors = require("cors");
const knex = require("knex");
const register = require('./routeHandlers/register');
const signin = require('./routeHandlers/signin');
const profile = require('./routeHandlers/profile');
const image = require('./routeHandlers/image');
const postgresdb = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'anurag',
    database : 'smartbrain'
  }
});
postgresdb.select('*').from('users').then(data => {
   console.log(data);})
app.use(cors());
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send(db.users);
})
app.post("/signin",(req,res) => {signin.handleSignin(req,res,postgresdb,bcrypt)});
app.post("/register", (req,res) => {register.handleRegister(req,res,postgresdb,bcrypt)});
app.get("/profile/:id",(req,res) => {profile.handleProfile (req,res,postgresdb)});
app.put("/image",(req,res) => {image.handleImage (req,res,postgresdb)});
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})