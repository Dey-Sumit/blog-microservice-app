const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json())

const events = [];

app.post('/events', async (req, res) => {
    const event = req.body;
    events.push(event)
    console.log("Got event in event-bus --", event.type);

    try {
        await axios.post('http://localhost:4000/events', event)
        console.log("4000 done");
    }
    catch (error) {
        console.log(error.message);
    }

    try {
        await axios.post('http://localhost:4001/events', event)
        console.log("4001 done");
    }
    catch (error) {
        console.log(error.message);
    }

    try {
        await axios.post('http://localhost:4002/events', event)
        console.log("4002 done");
    }
    catch (error) {
        console.log(error.message);
    }

    try {
        await axios.post('http://localhost:4003/events', event)
        console.log("4003 done");
    }
    catch (error) {
        console.log(error.message);
    }

    console.log('---------');
    res.send({ status: "OK" });

})

app.get('/events', (req, res) => {
    res.send(events)
})


app.listen(4005, () => console.log("event-bus server is listening on port 4005"));