const config = require('./config.json');

const express = require('express');

const server = express();

const notesRouter = require('./api/notes-api');

server.use('/notes', notesRouter);

server.listen(config.port, () => 
    console.log(`Server listening on port ${config.port}`));