let myLibrary = [];

const bookshelf = document.querySelector('.bookshelf');
const newBookButton = document.querySelector('.new-btn');
const cancelButton = document.querySelector('.cancel-btn');
const formWrapper = document.querySelector('.form-wrapper');
const overlay = document.querySelector('.overlay');

newBookButton.addEventListener('click', openBookForm);
cancelButton.addEventListener('click', closeBookForm);
overlay.addEventListener('click', closeBookForm);

function Book(title, author, pages, read, image) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.image = image;
}

Book.prototype.info = function() {
  return `${title} by ${author}, ${pages}, ${read}`
}

function addBookToLibrary(title, author, pages, read, image) {
  const newBook = new Book(title, author, pages, read, image);
  myLibrary.push(newBook);
}

function createAllCards(library) {
  for (let i = 0; i < library.length; i++) {
    createLastCard(myLibrary[i]);
  }
}

function createLastCard(element = myLibrary[myLibrary.length - 1]) {
  const book = document.createElement('div');
  const deleteIcon = document.createElement('div');
  const cover = document.createElement('div');
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

  title.textContent = element.title;
  author.textContent = element.author;
  pages.textContent = element.pages;
  readStatus.textContent = element.read;

  book.append(deleteIcon, cover, title, author, pages, readStatus, readButton);

  bookshelf.appendChild(book);
}

function openBookForm(event) {
  formWrapper.style.display = 'block';
  overlay.style.display = "block"
  event.stopPropagation();
}

function closeBookForm () {
  formWrapper.style.display = 'none';
  overlay.style.display = "none"
}

document.addEventListener('click', function(event) {
  // Hide the popup form if the user clicks outside of it
  if (!formWrapper.contains(event.target)) {
    closeBookForm();
  }
});