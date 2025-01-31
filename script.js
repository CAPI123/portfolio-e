// Consolidate the showAlert functions into one
function showAlert(alertElement) {
  // Get all alerts
  const alerts = document.querySelectorAll(".alert");
  // Hide all alerts first
  alerts.forEach((alert) => alert.classList.remove("show"));

  // Show the new alert
  if (alertElement) {
    alertElement.classList.add("show");
    // Hide after 5 seconds
    setTimeout(() => {
      alertElement.classList.remove("show");
    }, 5000);
  }
}

// Modify the downloadFile function to properly handle alerts
function downloadFile(fileType) {
  const successAlert = document.querySelector(
    ".download-alerts .alert-success"
  );
  const errorAlert = document.querySelector(".download-alerts .alert-error");

  const files = {
    cv: {
      url: "./assets/EMMANUEL OUKO OWUOR CV.pdf",
      filename: "EMMANUEL OUKO OWUOR CV.pdf",
    },
    cert: {
      url: "./assets/EMMANUEL OUKO OWUOR CERTS.pdf",
      filename: "Emmanuel Ouko certificate.pdf",
    },
  };

  const fileInfo = files[fileType];
  if (!fileInfo) {
    showAlert(errorAlert);
    console.error("Invalid file type requested");
    return;
  }

  fetch(fileInfo.url)
    .then((response) => {
      if (!response.ok) throw new Error("File not found");
      return response.blob();
    })
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileInfo.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showAlert(successAlert);
    })
    .catch((error) => {
      console.error("Download error:", error);
      showAlert(errorAlert);
    });
}

// Initialize event listeners when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get both buttons
  const resumeButton = document.querySelector(
    '.cta-buttons a[href="#"]:nth-of-type(2)'
  );
  const certButton = document.querySelector(
    '.cta-buttons a[href="#"]:nth-of-type(4)'
  );

  if (resumeButton) {
    resumeButton.removeAttribute("href");
    resumeButton.addEventListener("click", () => downloadFile("cv"));
  }

  if (certButton) {
    certButton.removeAttribute("href");
    certButton.addEventListener("click", () => downloadFile("cert"));
  }

  // Update footer year
  updateFooterYear();
});

// Hamburger Menu functionality
const navToggle = document.querySelector(".mobile-nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  const visibility = navLinks.getAttribute("data-visible");

  if (visibility === "false" || !visibility) {
    navLinks.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else {
    navLinks.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

// Close menu when clicking a link
const navItems = document.querySelectorAll(".nav-links a");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !navLinks.contains(e.target) &&
    !navToggle.contains(e.target) &&
    navLinks.getAttribute("data-visible") === "true"
  ) {
    navLinks.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

// Initialize EmailJS when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS with your public key
  emailjs.init("A4FuOK1yQ3QXUp2b6");

  const form = document.querySelector(".contact-form");
  const submitBtn = form.querySelector('button[type="submit"]');

  async function sendEmail(e) {
    e.preventDefault();

    // Get alerts
    const successAlert = document.querySelector(".form-alerts .alert-success");
    const errorAlert = document.querySelector(".form-alerts .alert-error");

    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const result = await emailjs.sendForm(
        "service_826nk3r", // Your EmailJS service ID
        "template_xbqe2tj", // Your EmailJS template ID
        form
      );

      if (result.status === 200) {
        showAlert(successAlert);
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      showAlert(errorAlert);
    } finally {
      // Reset button state
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    }
  }

  // Add form submit event listener
  if (form) {
    form.addEventListener("submit", sendEmail);
  }
});

// Alert handling function
function showAlert(alertElement) {
  if (!alertElement) return;

  // Hide all existing alerts first
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => alert.classList.remove("show"));

  // Show new alert
  alertElement.classList.add("show");

  // Hide after 5 seconds
  setTimeout(() => {
    alertElement.classList.remove("show");
  }, 5000);
}

// Update footer year
function updateFooterYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
