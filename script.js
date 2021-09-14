//test test test
let myLibrary = [];
let printCount = 0;
let totalBooks = 0;
let totalPages = 0;
let totalRead = 0;
let readPercent = 0;
const newBookButton = document.querySelector('button.newBook');
const bookGrid = document.querySelector("div.bookGrid");
const counts = document.querySelectorAll("label.counts");


function Book(title, author, pages, read, data) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.data = data;
}

Book.prototype.readStatus = function(){
    const bookDivs = bookGrid.querySelectorAll("div");
    const bookH3s = bookGrid.querySelectorAll("h3");
    if (this.read=="Read"){
        this.read = "Unread";
        totalRead--;
        readPercent = Math.round((totalRead/totalBooks)*100);
        bookDivs[this.data].setAttribute("style", "background-image:linear-gradient(white,red);");
        bookH3s[3+(this.data*3)+this.data].innerHTML = "Status: Unread";
        counts[2].innerHTML = `Books Read:  ${totalRead} (${readPercent}%) &ensp;`;
    }
    else{
        this.read = "Read";
        totalRead++;
        readPercent = Math.round((totalRead/totalBooks)*100);
        bookDivs[this.data].setAttribute("style", "background-image:linear-gradient(white,green);");
        bookH3s[3+(this.data*3)+this.data].innerHTML = "Status: Read";
        counts[2].innerHTML = `Books Read:  ${totalRead} (${readPercent}%) &ensp;`;
    }
}
Book.prototype.deleteBook = function(){
    const bookDivs = bookGrid.querySelectorAll("div");
    const bookH3s = bookGrid.querySelectorAll("h3");
    if (this.read == "Read"){
        totalRead--;
    }
    totalPages-=this.pages;
    bookDivs[this.data].remove();
    let k = this.data;
    myLibrary.splice(this.data,1);
    if (k!=myLibrary.length){
    for (let i=0; i<myLibrary.length;i++){
        myLibrary[i].data = i;
    }
    const readButtons = document.querySelectorAll("button.readButton");
    const deleteButtons = document.querySelectorAll("button.deleteButton");
    let x = 0;
    readButtons.forEach((button)=>{
        button.setAttribute("onclick",`myLibrary[${x}].readStatus();`)
        x++;
    });
    x=0;
    deleteButtons.forEach((button)=>{
        button.setAttribute("onclick",`myLibrary[${x}].deleteBook()`);
        x++;
    });
   }
    printCount--;
    totalBooks--;
    readPercent = Math.round((totalRead/totalBooks)*100);
    counts[2].innerHTML = `Books Read:  ${totalRead} (${readPercent}%) &ensp;`;
    counts[1].innerHTML = `Total Pages: ${totalPages}`;
    counts[0].innerHTML = `Total Books: ${totalBooks}`;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book();
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.read = read;
    book.data = myLibrary.length;
    myLibrary.push(book);
}
function populatePage() {
    let bookCount = myLibrary.length;
    while (printCount != bookCount) {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class","bookDiv");
        newDiv.setAttribute("id",`${myLibrary[printCount].data}`);
        const newTitle = document.createElement("h3");
        const newAuthor = document.createElement("h3");
        const newPages = document.createElement("h3");
        const newRead = document.createElement("h3");
        const newReadButton = document.createElement("button");
        const newDeleteButton = document.createElement("button");
        newReadButton.setAttribute("class", "readButton");
        newReadButton.setAttribute("onclick",`myLibrary[${myLibrary[printCount].data}].readStatus()`);
        newDeleteButton.setAttribute("class", "deleteButton");
        newReadButton.innerHTML = "Change Read Status";
        newDeleteButton.innerHTML = "Delete Book";
        newDeleteButton.setAttribute("onclick",`myLibrary[${myLibrary[printCount].data}].deleteBook()`);
        const newTitleText = document.createTextNode(`Title: ${myLibrary[printCount].title}`);
        const newAuthorText = document.createTextNode(`Author: ${myLibrary[printCount].author}`);
        const newPagesText = document.createTextNode(`Page #: ${myLibrary[printCount].pages}`);
        const newReadText = document.createTextNode(`Status: ${myLibrary[printCount].read}`);

        newTitle.appendChild(newTitleText);
        newAuthor.appendChild(newAuthorText);
        newPages.appendChild(newPagesText);
        newRead.appendChild(newReadText);

        newDiv.appendChild(newTitle);
        newDiv.appendChild(newAuthor);
        newDiv.appendChild(newPages);
        newDiv.appendChild(newRead);
        newDiv.appendChild(newReadButton);
        newDiv.appendChild(newDeleteButton);
        if (myLibrary[printCount].read == "Unread"){
            newDiv.setAttribute("style", "background-image:linear-gradient(white,red);");
        }
        else{
            totalRead++;
        }
        bookGrid.appendChild(newDiv);
        totalBooks++;
        if(isNaN(parseInt(myLibrary[printCount].pages))){
            myLibrary[printCount].pages = 0;
        }
        totalPages += parseInt(myLibrary[printCount].pages);
        printCount++;
        readPercent = Math.round((totalRead/totalBooks)*100);
        counts[0].innerHTML = `Total Books: ${totalBooks}`;
        counts[1].innerHTML = `Total Pages: ${totalPages}`;
        counts[2].innerHTML = `Books Read:  ${totalRead} (${readPercent}%) &ensp;`;
    }
};

function getUserBook() {
    const inputs = document.querySelectorAll("input");
    let title = inputs[0].value;
    let author = inputs[1].value;
    let pages = inputs[2].value;
    let read;
    if (isNaN(parseInt(pages))){
        console.log(parseInt(pages));
        alert("Warning: You didn't input a integer page number.");
    }
    if (inputs[3].checked) {
        read = "Read";
    }
    else {
        read = "Unread";
    }

    addBookToLibrary(title, author, pages, read);
    populatePage();
    clearInputs();
}
function clearInputs() {
    const inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length - 1; i++) {
        inputs[i].value = "";
    }
    inputs[3].checked = false;
}

/*addBookToLibrary("Harry Potter 1", "JK Rowling", 515, "Read");
addBookToLibrary("Harry Potter 2", "JK Rowling", 490, "Unread");
addBookToLibrary("HuckleBerry Finn", "Mark Twain", 231, "Read");
addBookToLibrary("Kimodo Dragons", "Sensei", 422, "Read");
addBookToLibrary("Big Chungus", "Doctor Bone", 969, "Unread");

populatePage();*/





