const form = document.getElementById("testForm");
const result = document.getElementById("result");

const successMessage = document.getElementById("successMessage");
const submitAnotherBtn = document.getElementById("submitAnother");

function setError(name, msg) {
  const el = document.querySelector(`[data-error-for="${name}"]`);
  if (el) el.textContent = msg || "";
}

function clearErrors() {
  ["full_name","email","phone","accept_terms"].forEach(k => setError(k, ""));
}

// Submit handler
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  const data = new FormData(form);

  const full_name = (data.get("full_name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const phone = (data.get("phone") || "").toString().trim();
  const accept = data.get("accept_terms") === "on";

  let ok = true;

  if (!full_name) { setError("full_name", "Full name is required."); ok = false; }
  if (!email || !email.includes("@")) { setError("email", "Valid email is required."); ok = false; }
  if (!phone) { setError("phone", "Phone is required."); ok = false; }
  if (!accept) { setError("accept_terms", "You must accept terms."); ok = false; }

  if (!ok) return;

  // Build JSON (demo output)
  const output = {
    full_name,
    email,
    phone,
    city: (data.get("city") || "").toString().trim(),
    degree: (data.get("degree") || "").toString().trim(),
    birthday: (data.get("birthday") || "").toString().trim(),
    accept_terms: accept
  };

  // Show success message + hide form
  form.classList.add("hidden");
  successMessage.classList.remove("hidden");

  // Optional: show JSON result (useful for debugging/agent testing)
  result.style.display = "block";
  result.textContent = "✅ Submitted (demo). JSON:\n\n" + JSON.stringify(output, null, 2);
});

// Reset button: keep default reset behavior, but also clear errors and result
form.addEventListener("reset", () => {
  clearErrors();
  result.style.display = "none";
  result.textContent = "";
});

// Submit another response
submitAnotherBtn.addEventListener("click", () => {
  // reset form + UI
  form.reset();
  result.style.display = "none";
  result.textContent = "";

  successMessage.classList.add("hidden");
  form.classList.remove("hidden");
});
