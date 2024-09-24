const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//express app
const app = express();

const dbURI = 'mongodb+srv://jgranger3:SDEV255@nodes-tutorial.w4fan.mongodb.net/?retryWrites=true&w=majority&appName=Nodes-Tutorial';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


//register view engine
app.set('view engine', 'ejs');


//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) =>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},

    ];
    //res.send('<p>home page</p>');
    res.render('index', {title:'Home', blogs});
});

app.get('/about', (req, res) =>{
    //res.send('<p>about page</p>');
    res.render('about', {title:'About'});
});

app.get('/blogs/create', (req, res) =>{
    res.render('create', {title:'Create a new blog'});
})

// 404 page
app.use((req, res) =>{
    res.status(404).render('404', {title:'404'});
});