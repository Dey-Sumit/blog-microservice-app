const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express()
app.use(cors())
app.use(bodyParser.json())

const posts = {}


const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId]
        post.comments.push({ id, content, status })
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId]
        const comment = post.comments.find(comment => comment.id === id)

        comment.status = status;
        comment.content = content;

    }
}

app.get('/posts', (req, res) => {
    res.send(posts)
})

// catch the event from event bus
app.post('/events', (req, res) => {
    const { type, data } = req.body;
    console.log("Received Event ", type);
    handleEvent(type, data)

    res.send({})
});

app.listen(4002, async () => {
    console.log("query server is listening on port 4002");
    try {
        // get all the unprocessed events when the server is up
        const res = await axios.get('http://localhost:4005/events');

        for (let event of res.data) {
            console.log("processing event ", event.type);
            handleEvent(event.type, event.data)
        }
    } catch (error) {
        console.log("ERROR----");
        console.log(error.message);
    }


})