const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('this is working');
})

app.listen(3001, ()=>{
    console.log('app is listening at port 3001');
})

app.post('/signin', (req, res)=>{
    res.json('signed in');
})

/*
/ --> res = working
/sigin --> POST  success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user
*/