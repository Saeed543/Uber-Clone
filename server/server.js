const express = require('express')
const { SERVER_PORT, MONGO_DB_URL, REACT_APP_URL } = require('./config/index')
const mongoose = require('mongoose');
const cors = require("cors")
const bodyParser = require('body-parser');
const passport = require('passport');
const passportStrategy = require("./passport");
const authRoute = require("./routes/auth")
const cookieSession = require('cookie-session')
const app = express()
// const writeRoute = require('./routes/write')

app.use(
    cookieSession({
        name: "session",
        keys: ["uber-clone"],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(passport.initialize());
app.use(passport.session())
app.use(bodyParser.json());

app.use(
    cors({
        origin: REACT_APP_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

const port = SERVER_PORT

mongoose.connect(MONGO_DB_URL, {
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
app.post('/markers/post', async (req, res) => {
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
app.get('/markers/get', async (req, res) => {
    try {
        const pointer = await Marker.find({ userId: req.query.userId })

        res.status(200).json(pointer);
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use('/auth', authRoute);

app.get(
    "/", (req, res) => {
        res.send("<p>Hello From the auth server</p>")
    })
// app.use('/api/location', writeRoute)

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
