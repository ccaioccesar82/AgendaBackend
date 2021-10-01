require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');

const session = require('express-session');
 const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const csrf = require('csurf');

const {checkErr, csrfMiddleware, middlewareGlobal} = require('./src/middlewares/middleware.js');



const mongoose = require('mongoose'); //Meu Banco de dados MongoDB
mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
   

}).then(()=>{
console.log('conectei na base de dados');
    app.emit('Pronto');
})
.catch(e => {
console.log(e);

});


app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({

secret: 'sjsaoasmasmasmsasm',
store:  MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
resave: false,
saveUninitialized: false,
cookie:{

maxAge: 1000*60*60*24*7,
httpOnly: true

}
})

app.use(sessionOptions);
app.use(flash());


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(checkErr);
app.use(csrfMiddleware);
app.use(middlewareGlobal);


app.use(routes);

app.on('Pronto', ()=>{

    app.listen(3000, ()=>{
    console.log('Acessar http://localhost:3000')
    });
})

