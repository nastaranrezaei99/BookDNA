
const landing = document.getElementById("landing");
const landing2 = document.getElementsById ("step1");
const  form2 = document.getElementById("secque");     
const moodForm = document.getElementById("firstque");   
const btn1 = document.getElementById("second-Button"); 
const btn2 = document.getElementById ("button1");


btn1.addEventListener("click", () => {
  
  landing.style.display = "none";

  
  moodForm.style.display = "block";
});

btn2.addEventListener("click" , () => {
    landing2.style.display="none";

    form2.style.display = "block";
});