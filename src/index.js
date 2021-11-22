console.log("web is working");
let myLibrary = []; //my library

class Book {
    constructor(name, author, pages, read){
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
} //constructor for new books

const container = document.querySelector(".container");

function addBookToLibrary(book) {
    myLibrary.push(book);
} //adding books to the library

//loops through myLibrary to find books and display it.
function display(){
    for(i = 0; i < myLibrary.length; i++){
        let newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.textContent = myLibrary[i].name + " " + myLibrary[i].author + " " +myLibrary[i].pages + " " + myLibrary[i].read;
        newCard.id = myLibrary[i];
        let newBtn = document.createElement("button");
        newBtn.textContent = "Remove Book"
        newBtn.addEventListener('click', function(){
            newCard.remove();
            myLibrary.splice(myLibrary[i],1);
        });
        let anoBtn = document.createElement("button");
        anoBtn.textContent = "Mark As Read";
        anoBtn.addEventListener('click', function(){
            console.log("button lunched");
            if(newCard.style.backgroundColor == 'red'){
                newCard.style.backgroundColor = 'lightyellow';
                console.log("first if statement lunched");
            } else {
                newCard.style.backgroundColor = 'red';
                console.log("second if statement lunched");
            }
        });
        newCard.appendChild(anoBtn);
        newCard.appendChild(newBtn);
        container.appendChild(newCard);
    }
} 
//creates 4 inputs for name, author, pages, read, then when continue pressed it adds a book with the info and deletes the form.
let addBtn = document.querySelector(".addBtn");
addBtn.addEventListener('click', function(){
    console.log("add button clicked");
    let form = document.createElement("div");
    form.classList.add("form");
    let inputName = document.createElement("input")
    let inputAuthor = document.createElement("input")
    let inputPages = document.createElement("input")
    let inputRead = document.createElement("input")
    form.appendChild(inputName);
    form.appendChild(inputAuthor);
    form.appendChild(inputPages);
    form.appendChild(inputRead);
    let continueBtn = document.createElement("button");
    continueBtn.textContent = "continue";
    continueBtn.addEventListener('click', function(){
        let nameFNB = inputName.value;
        let authorFNB  = inputAuthor.value;
        let pagesFNB = inputPages.value;
        let readFNB = inputRead.value;
        let newBook = new Book(nameFNB, authorFNB, pagesFNB, readFNB);
        addBookToLibrary(newBook);
        container.textContent = '';
        display();
        form.remove();
    });
    form.appendChild(continueBtn);
    container.appendChild(form);
}
); 
