
const express = require('express');
const path = require('path');
const adminroute = require('./routes/admin');
const shoproute = require('./routes/shop');
const bodyparser = require('body-parser');



//const expressHbs = require('express-handlebars');

const app = express();



//app.engine('hbs',expressHbs.engine({layoutsDir:'views/layouts/',defaultLayout:'main-layout',extname:'hbs'}));
const ErrorContoller = require('./controllers/404');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
app.set('view engine','ejs');
app.set('views','views');


app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    User.findById('63b519c6f133326235ef75ee')
    .then(user =>{
        req.user = new User(user.name,user.email,user.cart,user._id);
        next();
    })
    .catch(err => console.log(err));
    
});

app.use('/admin',adminroute);
app.use('/',shoproute);

app.use('/',ErrorContoller.get404);

mongoConnect(()=>{
    
    app.listen(3000);
})










