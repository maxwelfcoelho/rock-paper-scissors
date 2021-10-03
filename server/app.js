const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/random-hand', (req, res) => {
    const hands = ['pedra', 'papel', 'tesoura'];
    const randomHand = hands[Math.floor(Math.random() * hands.length)];

    res.send(randomHand);
});

const port = 4000;
app.listen(port);