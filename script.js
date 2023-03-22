let myLibrary = [];

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