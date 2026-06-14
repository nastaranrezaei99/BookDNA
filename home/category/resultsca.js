const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const title = document.getElementById("categoryTitle");
const results = document.getElementById("bookResults");

title.innerText = category + " Books";

fetch("http://localhost:3000/books/" + category)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        results.innerHTML = "";

        data.forEach(function (book) {

            results.innerHTML +=
                '<div class="book-card">' +


                '<img src="/images/' + book.img + '" width="120">' +

                '<div class="book-info">' +
                '<h3>' + book.name + '</h3>' +
                '<p>' + book.author + '</p>' +
                '<p>' + book.beschreibung + '</p>' +
                '</div>' +

                '</div>';

        });

    });