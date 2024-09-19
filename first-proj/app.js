const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')
// connect to mongo DB
const dbURI = 'mongodb+srv://calypsolunasol:TiIQ3x9xo8F2zJ1d@nodetutorial.3hb3g.mongodb.net/?retryWrites=true&w=majority&appName=NodeTutorial';
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true}).then((result) => app.listen(8080)).catch((err) => console.log(err));

// express app
const app = express();

// listen for requests
// app.listen(8080, console.log('listening for request on port 8080'));

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save().then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    })

})

app.get('/all-blogs', (req, res) => {
    Blog.find().sort({createdAt: -1}).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
})

app.get('/single-blog', (req , res) => {
    Blog.findById('')
})

// routes
app.get('/',(req , res) => {
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    
    // res.render('index', { title: 'Home', blogs});
    res.redirect('/blogs');
});

app.get('/about',(req , res) => {

    //res.send('<p>Home Page</p>');
    res.render('about',{ title: 'About'});
})

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
})



// Blog routes

app.get('/blogs', (req, res) => {
    Blog.find().then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result})
    }).catch((err) => {
        console.log(err);
    })
})


app.post('/blogs', (req , res) => {
    const blog = new Blog(req.body);

    blog.save().then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => console.log(err));
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then(result => {
        res.render('details', {blog: result , title: 'Blog Details'});
    }).catch(err => {console.log(err)});
});

app.delete('/blogs/:id', (req , res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id).then(result => {
        res.json({ redirect: '/blogs'});
    }).catch(err => console.log(err));
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog'});
})




// 404 page. This 404 function must be at the bottom of every get handler.
app.use((req, res) => {
    res.status(404).render('404',{ title: '404'});
});

