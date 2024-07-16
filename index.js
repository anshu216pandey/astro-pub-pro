const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

if(process.env.NODE_ENV!== "production"){
    require('dotenv').config()
}




let dbUrl = process.env.MONGO_ATLAS_DB;
// MongoDB connection
main().then((res)=>{
    console.log("connection successful");
})
.catch(err=>{
    console.log(err)
});


async function main(){
    await mongoose.connect(dbUrl);
};

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

// Routes
const mainRoutes = require('./routes/main');
app.use(mainRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
