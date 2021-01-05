const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { randomBytes } = require('crypto');

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', (req, res) => {

    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    let comment = { id: commentId, content}

    comments.push(comment);
    
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
    
    console.log("Created Comments" , comment)
}) 

app.listen(4001, () => {
    console.log('Comment Service Listening on 4001')
})
