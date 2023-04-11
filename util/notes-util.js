let notesDb = require('../db/notes-db');

module.exports = {

    getAllNotes: () => {
        return notesDb.getAllNotes();
    },

    insertNotes: (notes) => {
        return notesDb.insertNotes(notes);
    },

    findNotesById: (id) => {
        return notesDb.getNotesById(id);
    },

    updateNotes: (id, notes) => {
        return new Promise((resolve, error) => {
            if(id != notes._id) {
                error({code: 400, msg: 'request id doesn\'t match with body'});
                return;
            }

            notesDb.updateNotes(notes).then((value) => {
                if(value == 0) {
                    error({code: 410, msg: `notes with id: ${id} not found`});
                    return;
                }
                resolve(value);
            }).catch((err) => {
                error({code: 500, msg: err});
            });
        });
    },

    deleteNotes: (id) => {
        return new Promise((resolve, error) => {
            notesDb.deleteNotes(id).then((value) => {
                if(value == 0) {
                    error({code: 208, msg: `notes with id: ${id} not found`});
                    return;
                }

                resolve(value);
            }).catch((err) => {
                error({code: 500, msg: err});
            });
        });
    }
}