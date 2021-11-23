
console.log("web is working");
let myLibrary = []; //my library

class Book {
    constructor(name, author, pages, read, color){
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.color = color;
    }
} //constructor for new books

const container = document.querySelector(".container");

function addBookToLibrary(book) {
    myLibrary.push(book);
} //adding books to the library

//loops through myLibrary to find books and display it.
function display(){
    for(let i = 0; i < myLibrary.length; i++){
        let newCard = document.createElement("div");
        newCard.classList.add("card");
        // newCard.textContent = myLibrary[i].name + " " + myLibrary[i].author + " " +myLibrary[i].pages + " " + myLibrary[i].read;
        newCard.textContent = myLibrary[i].name + " " + myLibrary[i].author;
        newCard.id = myLibrary[i];
        let newBtn = document.createElement("button");
        newBtn.textContent = "Remove Task"
        newBtn.addEventListener('click', function(){
            newCard.remove();
            myLibrary.splice(myLibrary[i],1);
        });
        let anoBtn = document.createElement("button");
        anoBtn.textContent = "Mark As Done";
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
        let expBtn = document.createElement("button");
        expBtn.textContent = "Expend Task";
        expBtn.addEventListener('click', function(){
            newCard.textContent = myLibrary[i].name + " " + myLibrary[i].author + " " +myLibrary[i].pages + " " + myLibrary[i].read;
            newCard.appendChild(expBtn);
            newCard.appendChild(deexpBtn);
            newCard.appendChild(anoBtn);
            newCard.appendChild(newBtn);
        }); 
        let deexpBtn = document.createElement("button");
        deexpBtn.textContent = "DeExpend Task";
        deexpBtn.addEventListener('click', function(){
            newCard.textContent = myLibrary[i].name + " " + myLibrary[i].author;
            newCard.appendChild(expBtn);
            newCard.appendChild(deexpBtn);
            newCard.appendChild(anoBtn);
            newCard.appendChild(newBtn);
        });
        newCard.appendChild(expBtn);
        newCard.appendChild(deexpBtn);
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
        let colorFNB = 'lightyellow';
        let newBook = new Book(nameFNB, authorFNB, pagesFNB, readFNB, colorFNB);
        addBookToLibrary(newBook);
        container.textContent = '';
        display();
        form.remove();
    });
    form.appendChild(continueBtn);
    container.appendChild(form);
}
); 

//local storage shit section
//function that finds if storage available and supported
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

//activates if storage is available
if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    console.log("storage confirmed");
    //checks for certain element in the storage
    function populateStorage() {
        for(let i = 0; i < myLibrary.length; i++){
            localStorage.setItem('name' + i, myLibrary[i].name.value);
            localStorage.setItem('author' + i, myLibrary[i].author.value);
            localStorage.setItem('pages' + i, myLibrary[i].pages.value);
            localStorage.setItem('read' + i, myLibrary[i].read.value);
            console.log(myLbrary[i].color.value +"  :color value");
            localStorage.setItem('color' + i, myLibrary[i].color.value);
        }
    }
    //moves values from storage to website, stores them in varaibles and uses them.
    function setTasks() {
        for(let i = 0; i < myLibrary.length; i++){
            var currentName = localStorage.getItem('name' + i);
            var currentAuthor = localStorage.getItem('author' + i);
            var currentPages = localStorage.getItem('pages' + i);
            var currentRead = localStorage.getItem('read' + i);
            var currentColor = localStorage.getItem('color' + i);

            myLibrary[i].name.value = currentName;
            myLibrary[i].author.value = currentAuthor;
            myLibrary[i].pages.value = currentPages;
            myLbrary[i].read.value = currentRead;
            myLibrary[i].color.value = currentColor;

            let nameFNB = currentName;
            let authorFNB  = currentAuthor;
            let pagesFNB = currentPages;
            let readFNB = currentRead;
            let colorFNB = currentColor;
            let newBook = new Book(nameFNB, authorFNB, pagesFNB, readFNB, colorFNB);
            addBookToLibrary(newBook);
            container.textContent = '';
            display();
        }
    }
    if(!localStorage.getItem('name' + 0)) {
        //if there is no storage then puted the library in the storage
            populateStorage();
        }
    setTasks();
  }
  else {
    // Too bad, no localStorage for us
    console.log("storage declined");
  }


