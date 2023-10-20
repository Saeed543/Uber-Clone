const express = require('express')
const { SERVER_PORT } = require('./config/index')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());

const port = SERVER_PORT

mongoose.connect('mongodb://127.0.0.1:27017/Uber-Clone-Database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log("connected to mongodb database was successful!")
})

// Define a marker schema
const markerSchema = new mongoose.Schema({
    userId: String,
    lat: Number,
    lng: Number,
});

const Marker = mongoose.model('Marker', markerSchema);

// Save marker endpoint
app.post('/markers', async (req, res) => {
    const { userId, lat, lng } = req.body;

    const marker = new Marker({
        userId,
        lat,
        lng,
    });

    await marker.save();
    res.json({ message: 'Marker saved successfully' });
});

// Retrieve markers for a user endpoint
app.get('/markers/:userId', async (req, res) => {
    const userId = req.params.userId;
    const markers = await Marker.find({ userId });

    res.json(markers);
});

// app.use(express.static(path.join(__dirname, 'client/public')))

app.get('/', (req, res) => {
    res.send("<p>Hello World</p>")
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
