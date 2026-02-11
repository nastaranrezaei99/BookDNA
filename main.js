
const landing = document.getElementById("landing");
const landing2 = document.getElementById ("step1");
const  form2 = document.getElementById("secque");     
const moodForm = document.getElementById("firstque");   
const btnMood  = document.getElementById("second-Button"); 
const btn2 = document.getElementById ("button1");
const back1 = document.getElementById("button22")
const landing3 = document.getElementById("step2")

btnMood.addEventListener("click", () => {
  
  landing.style.display = "none";

  
  moodForm.style.display = "block";
});

btn2.addEventListener("click" , () => {
    landing2.style.display="none";

    form2.style.display = "block";
});

back1.addEventListener("click" , () => {
    landing3.style.display = "none";
    moodForm.style.display = "block";
    landing2.style.display = "block"; 

})