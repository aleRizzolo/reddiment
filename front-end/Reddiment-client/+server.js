import express from 'express';
import { MongoClient } from 'mongodb';
import { join } from 'path';

const app = express();
const port = process.env.PORT || 3000;

const uri = 'mongodb+srv://alessio:alessio@cluster1.y1zvldh.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongo();

// Serve the Svelte app
app.use(express.static(join(__dirname, 'public')));

// API endpoint to fetch items
app.get('/api/items', async (req, res) => {
  const db = client.db('Reddiment');
  const collection = db.collection('items');
  const items = await collection.find().toArray();
  res.json(items);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
