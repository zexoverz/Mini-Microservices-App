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

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    });

    res.status(201).send(posts[id]);
    console.log("created post", posts[id])
});



app.listen(4000, () => {
    console.log('Post Service Listening on 4000')
})
