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


button1.addEventListener("click", () => {
    form1.style.display = "none";
    form2.style.display = "block";
});

back1.addEventListener("click", () => {
    form2.style.display = "none";
    form1.style.display = "block";
});


button2.addEventListener("click", () => {
    form2.style.display = "none";
    form3.style.display = "block";
});

back2.addEventListener("click", () => {
    form3.style.display = "none";
    form2.style.display = "block";
});


button3.addEventListener("click", () => {
    form3.style.display = "none";
    form4.style.display = "block";
});

back3.addEventListener("click", () => {
    form4.style.display = "none";
    form3.style.display = "block";
});


button4.addEventListener("click", () => {
    form4.style.display = "none";
    form5.style.display = "block";
});

back4.addEventListener("click", () => {
    form5.style.display = "none";
    form4.style.display = "block";
});

let nummer = {
    classic:0
    ,poetry : 0
    ,history : 0
};