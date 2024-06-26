const books = [];
const RENDER_BOOK = 'render-books'

function generatedId() {
    return +new Date();
}

function generateBookObject (id, title, author, year, IsComplete) {
    return {
        id, 
        title,
        author,
        year,
        IsComplete,
    };
}

document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("inputBook");
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function addBook() {
    const titleBook = document.getElementById("inputBookTitle").value;
    const authorBook = document.getElementById("inputBookAuthor").value;
    const yearBook = document.getElementById("inputBookYear").value;
    
    var cbCompleted = document.getElementsByName('inputBookIsComplete');
    var isComplete = false;
    for (var i = 0; i < cbCompleted.length; i++) {
        if (cbCompleted[i].checked) {
            isComplete = true;
        }

    }

    document.getElementById('inputBookTitle').value="";
    document.getElementById('inputBookAuthor').value="";
    document.getElementById('inputBookYear').value="";
    document.getElementsByName('inputBookIsComplete').checked=false;
    
    const generatedID = generatedId();
    const bookObject = generateBookObject(generatedID, titleBook, authorBook, yearBook,isComplete, false);
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
    textContainer.classList.add('bookItem', 'shadow');
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.classList.add('action');
    textContainer.append(container);
    container.setAttribute('id', `book-${bookObject.id}`);

    if (bookObject.IsComplete) {
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
        doneButton.classList.add('orange');
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
    const uncompletedBooks = document.getElementById('incompleteBookshelfList');
    const completedBooks = document.getElementById('completeBookshelfList');

    uncompletedBooks.innerHTML = "";
    completedBooks.innerHTML = "";

    for (const bookItem of books) {
        const booksElement = makeBook(bookItem);
        if (bookItem.IsComplete) {
            completedBooks.append(booksElement);
        } else {
         uncompletedBooks.append(booksElement);
      } 
    }
});

