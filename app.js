
const express = require('express');
const path = require('path');
const adminroute = require('./routes/admin');
const shoproute = require('./routes/shop');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');



//const expressHbs = require('express-handlebars');

const app = express();



//app.engine('hbs',expressHbs.engine({layoutsDir:'views/layouts/',defaultLayout:'main-layout',extname:'hbs'}));
const ErrorContoller = require('./controllers/404');

const User = require('./models/user');
app.set('view engine','ejs');
app.set('views','views');


app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    User.findById('63ef33d80e4fdbeac925ebef')
    .then(user =>{
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
    
});

app.use('/admin',adminroute);
app.use('/',shoproute);

app.use('/',ErrorContoller.get404);


mongoose.connect('mongodb+srv://uS4EW6eafU9wWumd:Mongo-pass@cluster0.iokx3p2.mongodb.net/shop').then(result=>{
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'Om',
                email: 'om@test.com',
                cart:{
                    items:[]
                }
            });
            user.save();
        }
        
        app.listen(3000);
    })


}).catch(e=>{
    console.log(e);
})










