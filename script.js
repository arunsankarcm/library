// Constructor function for creating book objects
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Array to store the library of books
const myLibrary = [];

// Get references to HTML elements
const table = document.getElementById('bookTable');
const formContainer = document.getElementById('formContainer');
const newBookButton = document.getElementById('newBookButton');
const submitButton = document.getElementById('submitBook');

// Event listener for showing the form to add a new book
newBookButton.addEventListener('click', () => {
    formContainer.style.display = 'block';
});

// Event listener for submitting the new book form
submitButton.addEventListener('click', () => {
    // Get values from form input fields
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;

    // Create a new book object and add it to the library
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);

    // Hide the form and clear form fields
    formContainer.style.display = 'none';
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('isRead').checked = false;

    // Update the displayed library
    displayLibrary();
});

// Function to display the library of books
function displayLibrary() {
    table.innerHTML = ''; // Clear the table

    // Add headers only if the table is empty
    if (myLibrary.length > 0) {
        const row = table.insertRow();
        const headerTitles = ['Title', 'Author', 'Pages', 'Read', 'Change Status', 'Action'];

        // Create header cells
        for (let i = 0; i < headerTitles.length; i++) {
            const headerCell = document.createElement('th');
            headerCell.textContent = headerTitles[i];
            row.appendChild(headerCell);
        }
    }

    // Iterate through the books and display them
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const row = table.insertRow();

        // Create cells for book information
        const titleCell = row.insertCell(0);
        const authorCell = row.insertCell(1);
        const pagesCell = row.insertCell(2);
        const readCell = row.insertCell(3);

        // Populate cells with book information
        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        pagesCell.textContent = book.pages;
        readCell.textContent = book.isRead ? 'Yes' : 'No';

        // Add a button to change the read status
        const changeStatusButton = document.createElement('button');
        changeStatusButton.textContent = 'Change Status';
        changeStatusButton.addEventListener('click', () => {
            // Call the function to change the read status
            changeReadStatus(i);
        });

        const actionCell = row.insertCell(4);
        actionCell.appendChild(changeStatusButton);

        // Add a button to remove the book
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            // Call the function to remove the book
            removeBook(i);
        });

        const actionCell2 = row.insertCell(5);
        actionCell2.appendChild(removeButton);
    }
}

// Function to change the read status of a book
function changeReadStatus(index) {
    myLibrary[index].isRead = !myLibrary[index].isRead;
    displayLibrary();
}

// Function to remove a book from the library
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

// Initial display of the library
displayLibrary();
