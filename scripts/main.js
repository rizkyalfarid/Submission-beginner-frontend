import { loadBooks, saveBooks } from './storage.js';
import {renderBooks, initializeEventListeners} from './ui.js'

let books = loadBooks();

document.addEventListener("DOMContentLoaded", () => {
    renderBooks(books);
    initializeEventListeners(books, updateBooks);
});

function updateBooks(updatedBooks) {
    books = updatedBooks;
    saveBooks(books);
    renderBooks(books);
}

window.toggleBookStatus = function(bookId) {
    const book = books.find(book => book.id === bookId);
    if (book) {
        book.isComplete = !book.isComplete;
        updateBooks(books);
    }
};

window.editBook = function(bookId) {
    const book = books.find(book => book.id === bookId);
    if (book) {
        document.getElementById("bookFormTitle").value = book.title;
        document.getElementById("bookFormAuthor").value = book.author;
        document.getElementById("bookFormYear").value = book.year;
        document.getElementById("bookFormIsComplete").checked = book.isComplete;

        books = books.filter(b => b.id !== bookId);
        updateBooks(books);
        alert(`Buku "${book.title}" sedang dalam mode edit.`);
    }
};

window.deleteBook = function(bookId) {
    books = books.filter(book => book.id !== bookId);
    updateBooks(books);
};
