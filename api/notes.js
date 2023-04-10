const express = require('express');
const {v4: uuidv4} = require('uuid');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (_req, res) => {
    console.log('sare notes');
    res.send('sare notes');
});

router.get('/:id', (req, res) => {
    let id = req.params['id'];
    console.log(`${id} wale notes`);
    res.send(`${id} wale notes`);
});

router.post('/', (req, res) => {

    const notes = {
        id: uuidv4(),
        title: req.body.title,
        content: req.body.content
    };

    console.log(`notes saved: ${JSON.stringify(notes)}`);
    res.send(notes.id);
});

router.put('/:id', (req, res) => {
    if(req.params['id'] != req.body.id) {
        res.sendStatus(400);
    }

    const notes = {
        id: req.body.id,
        title: req.body.title,
        content: req.body.content
    };

    console.log(`notes updated: ${JSON.stringify(notes)}`);
    res.status('202');
    res.send(`updated notes ${notes.id}`);
});

router.delete('/:id', (req, res) => {
    console.log(`deleted ${req.params['id']}`)
    res.sendStatus(200);
});

module.exports = router;