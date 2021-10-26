const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zsx3s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db('kids_world');
        const serviceCollection = database.collection('services');
        const teacherCollection = database.collection('teachers');

        //GET API 
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            const services = await cursor.toArray();
            res.json(services)
        });

        //Get API Teachers
        app.get('/teachers', async (req, res) => {
            const cursor = teacherCollection.find({});
            const teachers = await cursor.toArray();
            res.json(teachers);
        })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);












app.get('/', (req, res) => {
    res.send('Kids server is running');
});

app.listen(port, () => {
    console.log('Server running at port', port);
})