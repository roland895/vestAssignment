const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


let emojiReactions = {};

app.post('/addReaction', (req, res) => {
    const { timestamp, userId, emoji } = req.body;
    if (!emojiReactions[timestamp]) {
        emojiReactions[timestamp] = [];
    }
    emojiReactions[timestamp].push({ userId, emoji });
    console.log(emojiReactions)
    res.json({ 
        success: true, 
        updatedReactions: emojiReactions 
    });});

app.get('/getReactions', (req, res) => {
    res.json(emojiReactions);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
