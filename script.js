let myLibrary = [];

const bookshelf = document.querySelector('.bookshelf');
const newBookButton = document.querySelector('.new-btn');
const cancelButton = document.querySelector('.cancel-btn');
const errorMessage = document.querySelector('.error');
const formWrapper = document.querySelector('.form-wrapper');
const form = document.querySelector('.book-form');
const overlay = document.querySelector('.overlay');

newBookButton.addEventListener('click', openBookForm);
form.addEventListener('submit', addBookToLibrary);
cancelButton.addEventListener('click', closeBookForm);

class Book {
  constructor(title, author, pages, read, cover) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.cover = cover;
  }
}

function addBookToLibrary(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const cover = document.getElementById('cover').value;
  const read = document.getElementById('read').checked ? 'Read' : 'Unread';

  const newBook = new Book(title, author, pages, read, cover);
  if (myLibrary.find(book => book.title === newBook.title)) {
    errorMessage.style.display = 'block';
    return;
  }
  myLibrary.unshift(newBook);

  createCard();
  closeBookForm();
}

function createCard(element = myLibrary[0]) {
  const book = document.createElement('div');
  const deleteWrapper = document.createElement('div');
  const deleteIcon = document.createElement('img');
  const cover = document.createElement('img');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readButton = document.createElement('button');

  book.classList.toggle('book');
  deleteWrapper.classList.toggle('delete-wrapper');
  deleteIcon.classList.toggle('delete-icon');
  cover.classList.toggle('cover');
  title.classList.toggle('title');
  author.classList.toggle('author');
  pages.classList.toggle('pages');
  readButton.classList.toggle('read-btn');
  readButton.classList.toggle('btn');
  if (element.read === "Unread") {
    readButton.classList.toggle('unread');
  }

  deleteIcon.addEventListener('click', deleteBook);
  readButton.addEventListener('click', toggleReadStatus);
  readButton.textContent = element.read;
  cover.src = element.cover;
  deleteIcon.src = 'media/close-icon.svg';
  title.textContent = `"${element.title}"`;
  author.textContent = `by ${element.author}`;
  pages.textContent = `${element.pages} pages`;

  deleteIcon.dataset.title = element.title;
  book.dataset.title = element.title;
  readButton.dataset.title = element.title;
  deleteWrapper.appendChild(deleteIcon);
  book.append(deleteWrapper, cover, title, author, pages, readButton);

  bookshelf.insertBefore(book, bookshelf.firstChild);
  checkCovers();
}

function deleteBook() {
  const book = document.querySelector(`.book[data-title="${this.dataset.title}"]`);
  myLibrary.splice(myLibrary.findIndex(object => object.title === this.dataset.title), 1);
  bookshelf.removeChild(book);
}

function toggleReadStatus() {
  const index = myLibrary.findIndex(object => object.title === this.dataset.title);
  if (myLibrary[index].read === 'Read') {
    myLibrary[index].read = 'Unread';
  } else {
    myLibrary[index].read = 'Read';
  }
  this.classList.toggle('unread');
  this.textContent = myLibrary[index].read;
}

function checkCovers() {
  const covers = document.querySelectorAll('.cover');
  covers.forEach((cover) => {
    cover.onerror = () => {
      cover.onerror = null;
      cover.src = 'media/cover-placeholder.png';
    }
  })
}

function openBookForm(event) {
  form.reset();
  formWrapper.style.display = 'block';
  overlay.style.display = 'block';
  event.stopPropagation();
}

function closeBookForm () {
  form.reset();
  errorMessage.style.display = 'none';
  formWrapper.style.display = 'none';
  overlay.style.display = 'none';
}

document.addEventListener('click', function(event) {
  if (!formWrapper.contains(event.target)) {
    closeBookForm();
  }
});