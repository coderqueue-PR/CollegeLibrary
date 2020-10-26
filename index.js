console.log("This is the indexedDB.js");

//Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Constructor
function Display() {

}

//Add method to display prototype
Display.prototype.add = function (book) {
    console.log("adding to UI");
    tableBody = document.getElementById('tableBody');
    let uiString = `  <tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                        <td><button type="button" class="btn btn-danger">Delete</button></td>
                    </tr>`;
    tableBody.innerHTML += uiString;

}

//Implement the clear function
Display.prototype.clear = function () {
    let LibraryForm = document.getElementById('LibraryForm');
    LibraryForm.reset();
}

//Implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                         <strong>Message :</strong> ${displayMessage}
                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                         </button>
                    </div>
                         `
    setTimeout(function () {
        message.innerHTML = '';
    }, 2000);
}

//Submit add event listener to the LibraryForm
let LibraryForm = document.getElementById('LibraryForm');
LibraryForm.addEventListener('submit', LibraryFormSubmit);
function LibraryFormSubmit(e) {
    console.log("your form was submited");
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;

    let computerprorgamming = document.getElementById('computerprorgamming');
    let development = document.getElementById('development');
    let megazine = document.getElementById('megazine');

    if (computerprorgamming.checked) {
        type = computerprorgamming.value;
    } else if (development.checked) {
        type = development.value;
    } else if (megazine.checked) {
        type = megazine.value;
    }
    let book = new Book(name, author, type);
    console.log(book);
    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'your book has been successfully added');

    }

    else {
        display.show('danger', 'Sorry you can not add this book');
    }
    e.preventDefault();
}