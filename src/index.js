
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
    if(!localStorage.getItem('name')) {
    //puts all the needed values in the storage
    function populateStorage() {
        for(let i = 0; i < myLibrary.length; i++){
            //maybe add the library inside the storage
            localStorage.setItem('name', myLibrary[i].name.value);
            localStorage.setItem('author', myLibrary[i].author.value);
            localStorage.setItem('pages', myLibrary[i].pages.value);
            localStorage.setItem('read', myLibrary[i].read.value);
        }
    }
    populateStorage();
    
    } else {
    setStyles();
    
  }
  }
  else {
    // Too bad, no localStorage for us
    console.log("storage declined");
  }

  //moves values from storage to website, stores them in varaibles and uses them.
function setStyles() {
    var currentColor = localStorage.getItem('bgcolor');
    var currentFont = localStorage.getItem('font');
    var currentImage = localStorage.getItem('image');
  
    document.getElementById('bgcolor').value = currentColor;
    document.getElementById('font').value = currentFont;
    document.getElementById('image').value = currentImage;
  
    htmlElem.style.backgroundColor = '#' + currentColor;
    pElem.style.fontFamily = currentFont;
    imgElem.setAttribute('src', currentImage);
  }
/*
// if storage changes it says what changed
window.addEventListener('storage', function(e) {
    document.querySelector('.my-key').textContent = e.name;
    document.querySelector('.my-old').textContent = e.author;
    document.querySelector('.my-new').textContent = e.pages;
    document.querySelector('.my-url').textContent = e.read;
  }); 
  */
 
//removes certain key from storage
storage.removeItem(keyName);

/*
//local storage shit section

//if localstorage available then store
Store = function() {
    const getLib = function(){
        let myLibrary; 
        if (localStorage.getItem('myLibrary') === null){
            myLibrary = [];
        } else {
            myLibraryLocal = JSON.parse(localStorage.getItem('myLibrary'));
        }
        return myLibrary;
    }
    const addLib = function(myLibrary){
        const libs = Store.getLibs();
        libs.push(myLibrary);
        localStorage.setItem('libs', JSON.stringify(libs));
    }
    const removeLib = function(isbn){
        const libs = Store.getLib();

        libs.forEach((myLibrary, index) => {
            if(myLibrary.isbn === isbn){
                myLibrary.splice(index, 1);
            }
        });
        localStorage.setItem('libs', JSON.stringify(libs));
    }
}
if(storageAvailable('localStorage')) {
    Store.addLib();
  } */
