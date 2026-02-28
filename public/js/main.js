// Booking form behavior: basic validation + confirmation message
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const message = document.getElementById("form-message");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");

  // Exit cleanly if this script loads on a page without the booking form
  if (!form || !message || !startDate || !endDate) return;

  const todayISO = new Date().toISOString().split("T")[0];

  // Date bounds
  startDate.min = todayISO;
  endDate.min = todayISO;

  startDate.addEventListener("change", () => {
    if (startDate.value) endDate.min = startDate.value;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    message.textContent = "";
    message.classList.remove("success", "error");

    const requiredIds = ["fullName", "email", "category", "startDate", "endDate", "travelers"];
    const missing = requiredIds.filter((id) => {
      const el = document.getElementById(id);
      if (!el) return true;
      const val = (el.value ?? "").toString();
      return val.trim() === "";
    });

    if (missing.length > 0) {
      message.textContent = "Please complete the required fields before submitting.";
      message.classList.add("error");
      document.getElementById(missing[0])?.focus();
      return;
    }

    if (startDate.value > endDate.value) {
      message.textContent = "End date must be the same as or later than the start date.";
      message.classList.add("error");
      endDate.focus();
      return;
    }

    const name = document.getElementById("fullName").value.trim();
    const category = document.getElementById("category").value;

    message.textContent = `Request submitted! Thanks, ${name}. We received your ${category} request and will follow up soon.`;
    message.classList.add("success");

    form.reset();
    startDate.min = todayISO;
    endDate.min = todayISO;
  });
});