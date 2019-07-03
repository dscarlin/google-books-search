const BookSchema = require("./book.js");
const NoteSchema = require("./note.js");
module.exports = {
    Book: BookSchema.Book,
    Note: NoteSchema.Note
};
