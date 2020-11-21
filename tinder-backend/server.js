import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Cards from './models/dbCards.js';

// app config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://admin2:test2@cluster0.d6coy.gcp.mongodb.net/tinder-db?retryWrites=true&w=majority';

//middleware
app.use(express.json());
app.use(cors());

// db config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// api endpoints
app.get('/', (req, res) => {
    res.status(200).send('Hi');
});

app.post('/tinder/cards', async (req, res) => {
    const dbCard = req.body;

    await Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);   
        } else {
            res.status(200).send(data);
        }
    })
});

app.get('/tinder/cards', async (req, res) => {
    await Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);   
        } else {
            res.status(200).send(data);
        }
    })
});

// listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));