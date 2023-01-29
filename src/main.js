const addBookFormToggle = document.querySelector('#add-book');
const addPopUp = document.querySelector('#pop-up');
const addForm = document.querySelector('#add-book-form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const isReadInput = document.querySelector('#isRead');
const addBookSubmit = document.querySelector('#submit');
const addBookNote = document.querySelector('#add-book-note');
const booksList = document.querySelector('#books-list');
class Book {
    constructor(title,author,numberOfPages,isRead) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
    }
    showInfo() {
        return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.isRead ? "already read": "not read yet"}`;
    }
}
let myLibrary = [];
appendLibraryToDom();

function appendLibraryToDom() {
    for(let book of myLibrary) {
        booksList.appendChild(bookBox(book.title, book.author, book.numberOfPages, book.isRead));
    }
}


//add pop up handler 
function showAddPopUp() {
    if(addPopUp.classList.contains('hidden')) {
        addPopUp.classList.remove('hidden');
        addPopUp.classList.add('flex');
    }
}
function hideAddPopUp() {
    if(addPopUp.classList.contains('flex')) {
        addPopUp.classList.remove('flex');
        addPopUp.classList.add('hidden');
    }
}
addBookFormToggle.addEventListener('click' , showAddPopUp);
window.addEventListener('click' , (click) => {
    if(addPopUp.classList.contains('flex')) {
        if(click.target === addPopUp) {
            hideAddPopUp();
            resetForm();
        }
    }
});
// form reset function
function resetForm() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    isReadInput.checked = false;
}
// Add book form handler 
function addBookToLibrary() {
    let newBook = new Book(titleInput.value , authorInput.value , pagesInput.value , isReadInput.checked);
    if(myLibrary.push(newBook)) {
        hideAddPopUp();

    }
    console.log(myLibrary);
}
function appendBookToDom() {
    booksList.appendChild(bookBox(titleInput.value , authorInput.value , pagesInput.value , isReadInput.checked));
}
addBookSubmit.addEventListener('click', (e) => {
    if(!addForm.checkValidity()) {
        addForm.reportValidity();
    } else {
        e.preventDefault();
        for(let book of myLibrary) {
            if(book.title === titleInput.value) {
                addBookNote.textContent = 'This Book Already Exists!'; 
                return;
            }
        }
        addBookToLibrary();
        appendBookToDom();
        resetForm();
    }
});
// append books to dom
function bookBox(bookTitle, bookAuthor, bookNumPages, bookIsRead) {
    let list = document.createElement('li');
    list.className += 'bg-white py-8 px-6 rounded-lg shadow-md';

    let ul = document.createElement('ul');
    ul.className += 'flex flex-col justify-center items-center gap-4';

    let bookTitleLi = document.createElement('li');
    let bookTitleNode = document.createTextNode(bookTitle);
    bookTitleLi.appendChild(bookTitleNode);
    ul.appendChild(bookTitleLi);

    let bookAuthorLi = document.createElement('li');
    let bookAuthorNode = document.createTextNode(bookAuthor);
    bookAuthorLi.appendChild(bookAuthorNode);
    ul.appendChild(bookAuthorLi);

    let bookNumPagesLi = document.createElement('li');
    let bookNumPagesNode = document.createTextNode(bookNumPages);
    bookNumPagesLi.appendChild(bookNumPagesNode);
    ul.appendChild(bookNumPagesLi);

    let bookIsReadLi = document.createElement('li');
    bookIsReadLi.className += 'w-full read-book';
    bookIsReadLi.setAttribute('data-title' , bookTitle);
    let bookIsReadBtn = document.createElement('button');
    bookIsReadBtn.className += 'border rounded-lg bg-green-600 hover:bg-green-500 text-white  py-2 w-full';
    if(bookIsRead) {
        bookIsReadBtn.appendChild(document.createTextNode('Read'));
    } else {
        bookIsReadBtn.appendChild(document.createTextNode('Not Read'));
    }
    bookIsReadLi.appendChild(bookIsReadBtn);
    bookIsReadLi.addEventListener('click' , () => {
        readToggle(bookTitle);
        bookIsReadBtn.innerText === "Read" ? bookIsReadBtn.innerText = "Not Read" : bookIsReadBtn.innerText = "Read";
    });
    ul.appendChild(bookIsReadLi);

    let delLi = document.createElement('li');
    delLi.className += 'w-full delete-book';
    let delBtn = document.createElement('button');
    delBtn.appendChild(document.createTextNode('Delete'));
    delBtn.className += "border rounded-lg bg-red-600 hover:bg-red-500 text-white py-2 w-full";
    delLi.appendChild(delBtn);
    delLi.setAttribute('data-title' , bookTitle);
    ul.appendChild(delLi);
    list.appendChild(ul);
    delLi.addEventListener('click' , () => {
        delBook(bookTitle);
        list.remove();
    });
    return list;
}

function delBook(bookTitle) {
    myLibrary.forEach(book => {
        if(book.title === bookTitle) {
            myLibrary.splice(myLibrary.indexOf(book.title), 1);
        }
    })
}
function readToggle(bookTitle) {
    myLibrary.forEach(book => {
        if(book.title === bookTitle) {
            book.isRead=== true ? book.isRead = false : book.isRead = true;
        }
    })
}