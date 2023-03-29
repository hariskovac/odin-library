let myLibrary = [];

const bookshelf = document.querySelector('.bookshelf');
const newBookButton = document.querySelector('.new-btn');
const deleteBookButton = document.querySelector('.delete-icon')
const cancelButton = document.querySelector('.cancel-btn');
const formWrapper = document.querySelector('.form-wrapper');
const form = document.querySelector('.book-form');
const overlay = document.querySelector('.overlay');

newBookButton.addEventListener('click', openBookForm);
deleteBookButton.addEventListener('click', deleteBook);
form.addEventListener('submit', addBookToLibrary);
cancelButton.addEventListener('click', closeBookForm);

function Book(title, author, pages, read, cover) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.cover = cover;
}

Book.prototype.info = function() {
  return `${title} by ${author}, ${pages}, ${read}`
}

function addBookToLibrary(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const cover = document.getElementById('cover').value;
  const read = document.getElementById('read').checked ? "Read" : "Unread";

  const newBook = new Book(title, author, pages, read, cover);
  myLibrary.push(newBook);

  createLastCard();
  closeBookForm();
}

function createAllCards(library) {
  for (let i = 0; i < library.length; i++) {
    createLastCard(myLibrary[i]);
  }
}

function createLastCard(element = myLibrary[myLibrary.length - 1]) {
  const book = document.createElement('div');
  const deleteIcon = document.createElement('div');
  const cover = document.createElement('img');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readStatus = document.createElement('p');
  const readButton = document.createElement('button');

  book.classList.toggle('book');
  deleteIcon.classList.toggle('delete-icon');
  cover.classList.toggle('cover');
  title.classList.toggle('title');
  author.classList.toggle('author');
  pages.classList.toggle('pages');
  readStatus.classList.toggle('read-status');
  readButton.classList.toggle('read-btn');

  deleteIcon.textContent = 'x';
  deleteIcon.addEventListener('click', deleteBook);
  cover.src = element.cover;
  title.textContent = element.title;
  author.textContent = element.author;
  pages.textContent = element.pages;
  readStatus.textContent = element.read;

  deleteIcon.dataset.title = element.title;
  book.dataset.title = element.title;
  book.append(deleteIcon, cover, title, author, pages, readStatus, readButton);

  bookshelf.appendChild(book);
  checkCovers();
}

function deleteBook() {
  const book = document.querySelector(`.book[data-title="${this.dataset.title}"]`);
  myLibrary.splice(myLibrary.findIndex(object => object.title === this.dataset.title), 1);
  bookshelf.removeChild(book);
}

function checkCovers() {
  const covers = document.querySelectorAll('.cover');
  covers.forEach((cover) => {
    cover.onerror = () => {
      cover.onerror = null;
      cover.src = 'media/cover-placeholder.jpg';
    }
  })
}

function openBookForm(event) {
  form.reset();
  formWrapper.style.display = 'block';
  overlay.style.display = "block"
  event.stopPropagation();
}

function closeBookForm () {
  form.reset();
  formWrapper.style.display = 'none';
  overlay.style.display = "none"
}

document.addEventListener('click', function(event) {
  if (!formWrapper.contains(event.target)) {
    closeBookForm();
  }
});