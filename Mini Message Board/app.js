// Handle all the imports

const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));

// Register View Engine
app.set('view engine','ejs')


app.listen('8080',() => console.log('Listening on port 8080'));


const messages = [
    {
        text: 'Hi there!',
        user: 'Amando',
        added: new Date()
    },
    {
        text: 'Hello World!',
        user: 'Charles',
        added: new Date()
    }

]


app.get('/',(req,res) => {
    


    res.render('index', {title: 'Mini MessageBoard', messages: messages})

});

app.get('/new',(req,res) => {
    res.render('form')
})


app.post('/new',(req,res) => {
    messages.push({text: req.body.messageText , user: req.body.authorName , added: new Date()});

    res.redirect('/')
})