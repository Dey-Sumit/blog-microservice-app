const express = require('express');
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express()

const posts = {}


app.use(cors())
app.use(bodyParser.json())

app.get('/api/posts', (req, res) => {
    res.send(posts)
})

app.post('/api/posts', async (req, res) => {
    try {
        const id = randomBytes(4).toString('hex')
        const { title } = req.body;

        posts[id] = {
            id, title
        }

        // send event to event bus
        await axios.post('http://localhost:4005/events', {
            type: 'PostCreated',
            data: {
                id,
                title
            }
        })

        res.status(201).send(posts[id])
    } catch (error) {
        console.log("ERROR------");
        console.log(error.message);
    }


})

app.post('/events', (req, res) => {
    console.log('Received Event: ', req.body.type);
    res.send({})
})

app.listen(4000, () => console.log("post server is listening on PORT 4000"))