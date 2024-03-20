const books = [];
const RENDER_BOOK = 'render-books'

function generatedId() {
    return +new Date();
}

function generateBookObject (id, title, author, year, isCompleted) {
    return {
        id, 
        title,
        author,
        year,
        isCompleted,
    };
}

document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("inputBook");
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });
});

function addBook() {
    const title = document.getElementById("inputBookTitle").value;
    const writer = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    
    const generatedID = generatedId();
    const bookObject = generateBookObject(generatedID, title, writer, year, false);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_BOOK));
    //saveData();
}

function makeBook(bookObject){
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = bookObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = bookObject.year;

    const textContainer = document.createElement('article');
    textContainer.classList.add('bookItem');
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.classList.add('action');
    textContainer.append(container);
    container.setAttribute('id', `book-${bookObject.id}`);

    if (bookObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('orange');
        undoButton.innerText = 'Not Finished Reading';
        undoButton.addEventListener('click', function () {
            undoTaskFromCompleted(bookObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('red');
        trashButton.innerText = 'Delete Book';
        trashButton.addEventListener('click', function () {
            removeTaskFromCompleted(bookObject.id);
        });

        container.append(undoButton, trashButton);
        // document.getElementById('completeBookshelfList').appendChild(container);
    } else {
        const doneButton = document.createElement('button');
        doneButton.classList.add('green');
        doneButton.innerText = 'Finished Reading';
        doneButton.addEventListener('click', function () {
            addTaskToCompleted(bookObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('red');
        trashButton.innerText = 'Delete Book';
        trashButton.addEventListener('click', function () {
            removeTaskFromCompleted(bookObject.id);
        });

        container.append(doneButton, trashButton);
        // document.getElementById('incompleteBookshelfList').appendChild(container);
    }
    return textContainer;
}


document.addEventListener(RENDER_BOOK, function () {
    // console.log(books);
    const uncompletedBooks = document.getElementById("uncompletedBooks");
    const completedBooks = document.getElementById("uncompletedBooks");

    uncompletedBooks.innerHTML = "";
    completedBook.innerHTML = "";
    for (bookItem of books) {
        const booksElement = makeTheBook(bookItem);
        if (bookItem.isCompleted) {
            completedBook.append(booksElement);
        } else {
         uncompletedBooks.append(booksElement);
      } 
    }
});

