const express = require('express');
const bodyParser = require('body-parser');
const notesUtil = require('../util/notes-util');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (_req, res) => {
    console.log('sare notes triggered');
    notesUtil.getAllNotes().then((val) => {
        console.log(`val: ${val}`);
        res.send(val);
    }).catch((err) => {
        console.error(err);
        res.status(500);
        res.send(err);
    });
}, );

router.get('/:id', (req, res) => {
    let id = req.params['id'];
    console.log(`${id} wale notes triggered`);
    
    notesUtil.findNotesById(id).then((val) => {
        if(!val || val.length === 0) {
            res.sendStatus(404);
            return;
        }
        res.send(val);
    }).catch((err) => {
        console.log(`error: ${err}`);
        res.status(500);
        res.send(err);
    });

});

router.post('/', (req, res) => {

    const notes = {
        heading: req.body.heading,
        note: req.body.note,
        date: new Date()
    };

    console.log(`notes save triggered: ${JSON.stringify(notes)}`);
    
    notesUtil.insertNotes(notes).then((val) => {
        console.log(`saved: ${notes}`);
        res.status(201);
        res.send(val);
    }).catch((err) => {
        console.error(err);
        res.status(500);
        res.send(err);
    });
});

router.put('/:id', (req, res) => {
    const notes = {
        _id: req.body._id,
        heading: req.body.heading,
        note: req.body.note,
        date: new Date()
    };

    console.log(`notes update triggered: ${JSON.stringify(notes)}`);

    notesUtil.updateNotes(req.params['id'], notes).then((_value) => {
        res.sendStatus(202);
    }).catch((error) => {
        console.log(JSON.stringify(error));
        res.status(error.code);
        res.send(error.msg);
    })
});

router.delete('/:id', (req, res) => {
    console.log(`delete ${req.params['id']} trigerred`)
    
    notesUtil.deleteNotes(req.params['id']).then((_value) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.status(error.code);
        res.send(error.msg);
    });
});


module.exports = router;