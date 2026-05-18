//SEARCH POPUP
   
const openSearch = document.getElementById("openSearch");
const searchPopup = document.getElementById("searchPopup");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

openSearch.onclick = function(event){
    event.preventDefault();

    searchPopup.style.display = "block";
    searchInput.focus();
};

searchButton.onclick = goToResults;

searchInput.onkeydown = function(event){
    if(event.key === "Enter"){
        goToResults();
    }
};

function goToResults(){
    var text = searchInput.value.trim();

    if(text === ""){
        return;
    }

    window.location.href = "results.html?q=" + encodeURIComponent(text);
}