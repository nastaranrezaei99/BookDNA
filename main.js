
const landing = document.getElementById("landing");     
const moodForm = document.getElementById("firstque");   
const moodBtn = document.getElementById("second-Button"); 


moodBtn.addEventListener("click", () => {
  
  landing.style.display = "none";

  
  moodForm.style.display = "block";
});
