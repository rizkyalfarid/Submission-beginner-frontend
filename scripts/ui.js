export function renderBooks(books) {
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  books.forEach((book) => {
    const bookItem = createBookItem(book);
    (book.isComplete ? completeBookList : incompleteBookList).append(bookItem);
  });
}

function createBookItem(book) {
  const bookItem = document.createElement("div");
  bookItem.classList.add("bookItem");
  bookItem.setAttribute("data-testid", "bookItem");
  bookItem.setAttribute("data-bookid", "123123123");
  bookItem.innerHTML = `
    <h3 data-testid="bookItemTitle" >${book.title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
    <p data-testid="bookItemYear">Tahun: ${book.year}</p>
    <div>
      <button data-id="${book.id}" data-testid="bookItemIsCompleteButton" class="toggle-status">
        ${book.isComplete ? "Belum Selesai" : "Selesai Dibaca"}
      </button>
      <button data-id="${book.id}" data-testid="bookItemDeleteButton" class="edit-book">Edit</button>
      <button data-id="${book.id}"  data-testid="bookItemEditButton" class="delete-book">Hapus</button>
    </div>
  `;
  return bookItem;
}

export function initializeEventListeners(books, updateBooks) {
  document.getElementById("bookForm").addEventListener("submit", (event) => {
    event.preventDefault();
    handleBookFormSubmit(books, updateBooks);
  });

  document.getElementById("searchBook").addEventListener("submit", (event) => {
    event.preventDefault();
    handleSearchBook(books);
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    const bookId = target.dataset.id;

    if (target.matches(".toggle-status")) toggleBookStatus(bookId, books, updateBooks);
    else if (target.matches(".edit-book")) editBook(bookId, books);
    else if (target.matches(".delete-book")) deleteBook(bookId, books, updateBooks);
  });
}

export function handleBookFormSubmit(books, updateBooks) {
  const bookObject = getBookFromForm();
  books.push(bookObject);
  updateBooks(books);
  document.getElementById("bookForm").reset();
}

function getBookFromForm() {
  return {
    id: Date.now(),
    title: document.getElementById("bookFormTitle").value,
    author: document.getElementById("bookFormAuthor").value,
    year: parseInt(document.getElementById("bookFormYear").value),
    isComplete: document.getElementById("bookFormIsComplete").checked,
  };
}

export function handleSearchBook(books) {
  const searchTerm = document.getElementById("searchBookTitle").value.toLowerCase();
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));
  renderBooks(filteredBooks);
}

export function toggleBookStatus(bookId, books, updateBooks) {
  const book = books.find(book => book.id === parseInt(bookId));
  if (book) {
    book.isComplete = !book.isComplete;
    updateBooks(books);
  }
}

export function editBook(bookId, books) {
  const book = books.find(book => book.id === parseInt(bookId));
  if (book) {
    fillBookForm(book);
    books.splice(books.indexOf(book), 1);
    alert(`Buku "${book.title}" sedang dalam mode edit. Silakan ubah dan submit.`);
  }
}

function fillBookForm(book) {
  document.getElementById("bookFormTitle").value = book.title;
  document.getElementById("bookFormAuthor").value = book.author;
  document.getElementById("bookFormYear").value = book.year;
  document.getElementById("bookFormIsComplete").checked = book.isComplete;
}

export function deleteBook(bookId, books, updateBooks) {
  const bookIndex = books.findIndex(book => book.id === parseInt(bookId));
  if (bookIndex > -1) {
    books.splice(bookIndex, 1);
    updateBooks(books);
  }
}
