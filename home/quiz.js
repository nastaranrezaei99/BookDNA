//Quiz

const form1 = document.getElementById("firstque");
const button1 = document.getElementById("button1");
const form2 = document.getElementById("secque");
const form3 = document.getElementById("thirdque");
const form4 = document.getElementById("f4que");
const form5 = document.getElementById("f5que");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const back1 = document.getElementById("button22");
const back2 = document.getElementById("button32");
const back3 = document.getElementById("button42");
const back4 = document.getElementById("button52");



let nummer = {
    classic: 0, poetry: 0, history: 0
};




button1.addEventListener("click", () => {
    const answer1 = document.querySelector('input[name ="q1"]:checked');

    if (answer1 == null) {
        alert("Please choose an answer!");
        return; //break

    }

    else if (answer1.value == "classic") {
        nummer["classic"]++;
    }
    else if (answer1.value == "poetry") {
        nummer["poetry"]++;
    }
    else if (answer1.value == "history") {
        nummer["history"]++;
    }
    console.log(nummer);  //testen


    form1.style.display = "none";
    form2.style.display = "block";


});

back1.addEventListener("click", () => {


    form2.style.display = "none";
    form1.style.display = "block";
});


button2.addEventListener("click", () => {
    const answer2 = document.querySelector('input[name ="q2"]:checked');

    if (answer2 == null) {
        alert("Please choose an answer!");
        return; //break

    }

    else if (answer2.value == "classic") {
        nummer["classic"]++;
    }
    else if (answer2.value == "poetry") {
        nummer["poetry"]++;
    }
    else if (answer2.value == "history") {
        nummer["history"]++;
    }
    console.log(nummer);  //testen


    form2.style.display = "none";
    form3.style.display = "block";
});

back2.addEventListener("click", () => {


    form3.style.display = "none";
    form2.style.display = "block";
});


button3.addEventListener("click", () => {
    const answer3 = document.querySelector('input[name ="q3"]:checked');
    if (answer3 == null) {
        alert("Please choose an answer!");
        return; //break

    }

    else if (answer3.value == "classic") {
        nummer["classic"]++;
    }
    else if (answer3.value == "poetry") {
        nummer["poetry"]++;
    }
    else if (answer3.value == "history") {
        nummer["history"]++;
    }
    console.log(nummer);  //testen


    form3.style.display = "none";
    form4.style.display = "block";
});

back3.addEventListener("click", () => {

    form4.style.display = "none";
    form3.style.display = "block";
});


button4.addEventListener("click", () => {
    const answer4 = document.querySelector('input[name ="q4"]:checked');
    if (answer4 == null) {
        alert("Please choose an answer!");
        return; //break

    }

    else if (answer4.value == "classic") {
        nummer["classic"]++;
    }
    else if (answer4.value == "poetry") {
        nummer["poetry"]++;
    }
    else if (answer4.value == "history") {
        nummer["history"]++;
    }
    console.log(nummer);  //testen


    form4.style.display = "none";
    form5.style.display = "block";
});

back4.addEventListener("click", () => {



    form5.style.display = "none";
    form4.style.display = "block";
});



