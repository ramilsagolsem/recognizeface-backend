const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: 123,
            name: 'John',
            email: 'john@email.com',
            password: 'john1',
            entries: 0,
            joined: new Date()
        },
        {
            id: 124,
            name: 'Sally',
            email: 'sally@emmail.com',
            password: 'Sally1',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.listen(3001, ()=>{
    console.log('app is listening at port 3001');
})

app.get('/', (req, res)=>{
    res.send(database.users);
})


app.post('/signin', (req, res)=>{
    if(req.body.email === database.users[0].email 
        && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    }else{
        res.status(400).json("login error");
    }
})

app.post('/register', (req, res)=>{
    const{email,name,password} = req.body;
    database.users.push({
        id: 125,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res)=>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(Number(user.id) === Number(id)){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json("no such user")
    }
    
})

app.put('/image', (req, res)=>{
    const{id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(Number(user.id) === Number(id)){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json("no such user")
    }
})
