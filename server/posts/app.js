const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

// temp database
const posts = {};


app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    let id = randomBytes(4).toString('hex');
    const {title} = req.body;
    
    posts[id] = {
        id, title
    };

    try{
        await axios.post('http://localhost:4005/events', {
            type: 'PostCreated',
            data: {
                id,
                title
            }
        });
    }catch(err){
        console.log(err, "ERROR")
    }

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Event Received', req.body.type)

    res.send({})
})



app.listen(4000, () => {
    console.log('v55')
    console.log('Post Service Listening on 4000')
})
