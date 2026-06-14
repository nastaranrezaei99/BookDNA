const results = document.getElementById("searchResults");

const params = new URLSearchParams(window.location.search);
const query = params.get("q");

if (query) {
    searchBooks();
}

function searchBooks() {
    const text = query;

    fetch("/search?q=" + text)
        .then(function(response) {
            return response.json();
        })
        .then(function(books) {
            results.innerHTML = "";

            books.forEach(function(book) {
                results.innerHTML +=
                    '<div class="book-card">' +
                    '<img src="/images/' + book.img +'">' +
                    '<div class="book-info">' +
                    '<h3>' + book.name + '</h3>' +
                    '<p>' + book.author + '</p>' +
                    '<p>' + book.kategorie + '</p>' +
                    '</div>' +
                    '</div>';
            });
        });
}