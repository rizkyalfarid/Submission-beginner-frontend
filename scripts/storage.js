const STORAGE_KEY = 'BOOKSHELF_APP';

export function loadBooks() {
    const storedBooks = localStorage.getItem(STORAGE_KEY);
    return storedBooks ? JSON.parse(storedBooks) : [];
}

export function saveBooks(books) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}
