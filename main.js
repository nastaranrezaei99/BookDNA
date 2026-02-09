const steps = Array.from(document.querySelectorAll(".step"));
let current = 0;

function showStep(i) {
  steps.forEach((step, idx) => {
    step.classList.toggle("active", idx === i);
  });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  if (btn.dataset.action === "next" && current < steps.length - 1) {
    current++;
    showStep(current);
  }

  if (btn.dataset.action === "back" && current > 0) {
    current--;
    showStep(current);
  }
});

showStep(current);
