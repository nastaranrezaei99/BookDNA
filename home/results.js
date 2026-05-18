const input =document.getElementById("resultSearchInput");

const button =document.getElementById("resultSearchButton");

const results =document.getElementById("searchResults");
var params =
new URLSearchParams(window.location.search);

var query =
params.get("q");

if(query){

    input.value = query;

    searchBooks();
}

button.onclick = searchBooks;


input.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        searchBooks();

    }

});


function searchBooks(){

    var text = input.value;

    fetch(
        "https://openlibrary.org/search.json?title=" + text
    )

    .then(function(response){

        return response.json();

    })

    .then(function(data){

        results.innerHTML = "";

        data.docs.slice(0,10).forEach(function(book){

            var image =
            "https://via.placeholder.com/150x220";

            if(book.cover_i){

                image =
                "https://covers.openlibrary.org/b/id/"
                + book.cover_i +
                "-M.jpg";
            }

            var author =
            "Unknown author";

            if(book.author_name){

                author =
                book.author_name.join(", ");
            }

            results.innerHTML +=

            '<div class="book-card" onclick="window.open(\'https://openlibrary.org' + book.key + '\', \'_blank\')">' +

            '<img src="' + image + '" style="width:100%; height:250px; object-fit:contain; background:white;">' +

            '<div class="book-info">' +

            '<h3>' + book.title + '</h3>' +

            '<p>' + author + '</p>' +

            '</div>' +

            '</div>';

        });

    });

}