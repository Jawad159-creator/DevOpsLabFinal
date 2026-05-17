const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let namesStorage = []; // Temporary local in-memory storage

app.post('/api/name', (req, res) => {
    const { name } = req.body;
    if (name) {
        namesStorage.push(name);
        return res.status(201).json({ message: 'Name saved successfully!', names: namesStorage });
    }
    return res.status(400).json({ error: 'Name is required' });
});

app.get('/api/names', (req, res) => {
    res.json({ names: namesStorage });
});
// NEW: Route to handle deletions
app.delete('/api/names/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    // Check if the index exists in our array
    if (index >= 0 && index < namesStorage.length) {
        namesStorage.splice(index, 1); // Remove 1 item at that index
        return res.json({ message: 'Name deleted successfully!', names: namesStorage });
    }

    return res.status(404).json({ error: 'Name not found' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));