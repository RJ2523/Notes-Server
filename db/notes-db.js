const config = require('../config.json');

let DataSource = require('nedb');
let db = new DataSource({filename: config.dbFile?config.dbFile : `${process.env.HOME}/.notes/notes.db`, autoload: true});

module.exports = {

    getAllNotes: () => {
        return new Promise((resolve, error) => {
            db.find({}, (err, res) => {
                if(err) {
                    error(err);
                    return;
                }
                resolve(res);
            });
        });
    },

    insertNotes: (notes) => {
        return new Promise((resolve, error) => {
            db.insert(notes, (err, res) => {
                if(err) {
                    error(err);
                    return;
                }
                resolve(res);
            });
        });
    },

    getNotesById: (id) => {
        return new Promise((resolve, error) => {
            db.find({_id: id}, (err, res) => {
                if(err) {
                    error(err);
                    return;
                }

                resolve(res);
            });
        });
    },

    updateNotes: (notes) => {
        return new Promise((resolve, error) => {
            db.update({_id: notes._id}, notes, (err, res) => {
                if(err) {
                    error(err);
                    return;
                }

                resolve(res);
            });
        });
    },

    deleteNotes: (id) => {
        return new Promise((resolve, error) => {
            db.remove({_id: id}, (err, res) => {
                if(err) {
                    error(err);
                    return;
                }

                resolve(res);
            });
        })
    }
};