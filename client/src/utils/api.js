import axios from "axios";
import {} from "dotenv/config";

export default {
    // Gets all books from google that match given search criteria
    getBook: function(query) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&apikey=${process.env.API_KEY}`);

    },
    // Gets saved books
    getBooks: function() {
        return axios.get("/api/books/");
    },
    // Deletes the book with the given id
    deleteBook: function(id) {
        return axios.delete("/api/books/" + id);
    },
    // Saves a book to the database
    saveBook: function(bookData) {
        return axios.post("/api/books", bookData);
    }
};