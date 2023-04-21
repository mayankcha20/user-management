require('dotenv').config();
const express=require('express');
const expressLayaout=require('express-ejs-layouts');
const app=express();
const port=5000 || process.env.PORT;
const session=require('express-session');
const methodoveride=require('method-override');
const Flash=require('express-flash');

//database

const connectDb=require('./server/config/db');
connectDb();
//middlerware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//static file
app.use(express.static('public'));


app.use(methodoveride('_method'));

//express session
app.use(
    session({
        secret:'secret',
        resave:false,
        saveUninitialized:true,
        cookie:{
            maxAge:1000*60*60*24*7,
        }
    })
);

//flash message
app.use(
    Flash({ sessionKeyName: 'flashMessage'})
    );


//templatng
app.use(expressLayaout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

//routes
app.use('/' ,require("./server/routes/customer"))

app.get('*' ,(req,res)=>{
    res.status(404).render('404');
});




app.listen(port,()=>{
    console.log(`app listing on port ${port}`)
});
