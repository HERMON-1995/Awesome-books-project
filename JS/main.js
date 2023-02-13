class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}


class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.getElementById("book-list");
        const ul = document.createElement('ul');

        ul.innerHTML = `
           <li>${book.title}</li>
           <li>${book.author}</li><br>
           <button class="btn delete">Remove</button><hr>
        `;

        list.appendChild(ul);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
           el.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }
}

// Store Class
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
         books = [];
      }
      else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }

    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a Book
document.getElementById("book-form").addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
  //Instatiate book
  const book = new Book(title, author);

  //Add Book to UI
  UI.addBookToList(book);

  //Add book to store
  Store.addBook(book);

  //Clear fields
  UI.clearFields();
});




