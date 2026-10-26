/* Portfolio interactions: theme, mobile navigation, and EmailJS contact form. */

const themeToggle = document.querySelector("#themeToggle");
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#main-nav");
const year = document.querySelector("#year");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = document.querySelector("#submit-button");
const buttonText = document.querySelector("#button-text");

/* EmailJS configuration — values retained from your existing working project. */
const SERVICE_ID = 'service_bseh5lz';
const TEMPLATE_ID = 'template_y8vi0wx';
const PUBLIC_KEY = 'h9t7AGlCtpSRYTfVp';

if (year) {
  year.textContent = new Date().getFullYear();
}

/* Theme toggle */
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    themeToggle.textContent = isLight ? "☾" : "☼";
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      isLight ? "#f7f8fc" : "#0b1020"
    );
  });
}

/* Mobile navigation */
if (menuToggle && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeMenu();
  });
}

/* EmailJS contact form */
if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    if (
      SERVICE_ID === "YOUR_SERVICE_ID" ||
      TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
      PUBLIC_KEY === "YOUR_PUBLIC_KEY"
    ) {
      formStatus.textContent = "Email setup incomplete. Check the EmailJS IDs in script.js.";
      formStatus.className = "form-status error";
      return;
    }

    if (!window.emailjs) {
      formStatus.textContent = "Email service unavailable. Check your internet connection and refresh.";
      formStatus.className = "form-status error";
      return;
    }

    if (submitButton) submitButton.disabled = true;
    if (buttonText) buttonText.textContent = "Sending…";
    formStatus.textContent = "Sending your message…";
    formStatus.className = "form-status";

    try {
      window.emailjs.init({ publicKey: PUBLIC_KEY });
      const response = await window.emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        contactForm
      );

      if (response.status !== 200) {
        throw new Error("Unexpected email service response.");
      }

      formStatus.textContent = "Success! Your message was sent. Thank you for contacting me.";
      formStatus.className = "form-status success";
      contactForm.reset();
    } catch (error) {
      console.error("EmailJS sending error:", error);
      formStatus.textContent = "Sorry, your message could not be sent. Please try again.";
      formStatus.className = "form-status error";
    } finally {
      if (submitButton) submitButton.disabled = false;
      if (buttonText) buttonText.textContent = "Send message";
    }
  });
}
