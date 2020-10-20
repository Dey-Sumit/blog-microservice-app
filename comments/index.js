const express = require('express');
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios');
const { log } = require('console');

const app = express()


const commentsByPostId = {}

app.use(cors())
app.use(bodyParser.json())

app.get('/api/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/api/posts/:id/comments', async (req, res) => {

    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    // get all the previous comments
    const comments = commentsByPostId[req.params.id] || []

    // push new comment 
    const newComment = { id: commentId, content, status: 'pending' }
    comments.push(newComment)

    // store the updated comments
    commentsByPostId[req.params.id] = comments

    // emit an event(commentCreated)
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            ...newComment,
            postId: req.params.id
        }
    })

    res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('Received Event: ', type);
    try {
        if (type === 'CommentModerated') {
            const { postId, id, status, content } = data;
            const comments = commentsByPostId[postId]

            const comment = comments.find(comment => {
                return comment.id === id
            })
            comment.status = status

            // notify event bus that a comment is updated

            await axios.post('http://localhost:4005/events', {
                type: 'CommentUpdated',
                data: {
                    id, status, postId, content
                }
            })

        }
    } catch (error) {
        console.log(error.message);
    }

    res.send({})

})

app.listen(4001, () => console.log("comment server is listening on PORT 4001"))