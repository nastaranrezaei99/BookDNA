// 1) انتخاب عناصر از HTML
const landing = document.getElementById("landing");     // بخش صفحه اول
const moodForm = document.getElementById("firstque");   // فرم سوال‌ها
const moodBtn = document.getElementById("second-Button"); // دکمه Match my Mood

// 2) وقتی روی دکمه کلیک شد
moodBtn.addEventListener("click", () => {
  // صفحه اول مخفی
  landing.style.display = "none";

  // سوال‌ها نمایش داده شوند
  moodForm.style.display = "block";
});
