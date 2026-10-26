
/* ===== SELECT PAGE ELEMENTS ===== */

const themeToggle = document.querySelector("#themeToggle");
const contactBtn = document.querySelector("#contactBtn");
const contactMessage = document.querySelector("#contactMessage");
const year = document.querySelector("#year");

/* ===== CURRENT YEAR ===== */

if (year) {
  year.textContent = new Date().getFullYear();
}

/* ===== THEME TOGGLE ===== */

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    themeToggle.textContent = isLight ? "🌙" : "☀️";
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
  });
}

/* ===== CONTACT BUTTON ===== */

if (contactBtn && contactMessage) {
  contactBtn.addEventListener("click", () => {
    contactMessage.textContent =
      "Thanks for stopping by! Add your email or social links here.";
  });
}

/* ===== EMAILJS CONFIGURATION ===== */

// Replace these placeholders with your actual EmailJS dashboard values.
const SERVICE_ID = "service_bseh5lz";
const TEMPLATE_ID = "template_y8vi0wx";
const PUBLIC_KEY = "h9t7AGlCtpSRYTfVp";

/* ===== CONTACT FORM ===== */

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = document.querySelector("#submit-button");
const buttonText = document.querySelector("#button-text");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    // Check EmailJS configuration.
    if (
      SERVICE_ID === "YOUR_SERVICE_ID" ||
      TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
      PUBLIC_KEY === "YOUR_PUBLIC_KEY"
    ) {
      formStatus.textContent =
        "Email setup incomplete. Add your EmailJS IDs in script.js.";
      formStatus.className = "form-status error";
      return;
    }

    // Check that the EmailJS browser SDK is loaded.
    if (!window.emailjs) {
      formStatus.textContent =
        "Email service unavailable. Check your internet connection and refresh.";
      formStatus.className = "form-status error";
      return;
    }

    // Prevent duplicate submissions while sending.
    if (submitButton) submitButton.disabled = true;
    if (buttonText) buttonText.textContent = "Sending...";

    formStatus.textContent = "Sending your message...";
    formStatus.className = "form-status";

    try {
      // Initialize EmailJS with your public key.
      window.emailjs.init({
        publicKey: PUBLIC_KEY
      });

      // Send the form through your EmailJS template.
      const response = await window.emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        contactForm
      );

      if (response.status !== 200) {
        throw new Error("Unexpected email service response.");
      }

      formStatus.textContent =
        "Success! Your message was sent. Thank you for contacting me.";
      formStatus.className = "form-status success";

      contactForm.reset();
    } catch (error) {
      console.error("EmailJS sending error:", error);

      formStatus.textContent =
        "Sorry, your message could not be sent. Please try again.";
      formStatus.className = "form-status error";
    } finally {
      if (submitButton) submitButton.disabled = false;
      if (buttonText) buttonText.textContent = "Send Message ↗";
    }
  });
}
