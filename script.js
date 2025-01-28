// Download function for CV and Certificates
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
      url: "./assets/EMMANUEL OUKO OWUOR CERTS.pdf", // Update this path to your certs file
      filename: "EMMANUEL OUKO OWUOR CERTS.pdf",
    },
  };

  const fileInfo = files[fileType];
  if (!fileInfo) {
    console.error("Invalid file type requested");
    return;
  }

  const link = document.createElement("a");
  link.href = fileInfo.url;
  link.download = fileInfo.filename;

  // Add error handling for file access
  link.onerror = () => {
    showAlert(errorAlert);
    console.error(`Error downloading ${fileType}`);
  };

  // Temporarily append link to body, trigger click, then remove
  try {
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showAlert(successAlert);
  } catch (error) {
    showAlert(errorAlert);
    console.error("Download error:", error);
  }
}

// Function to show alert
function showAlert(alertElement) {
  // Hide any existing alerts
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => alert.classList.remove("show"));

  // Show the new alert
  alertElement.classList.add("show");

  // Hide alert after 3 seconds
  setTimeout(() => {
    alertElement.classList.remove("show");
  }, 5000);
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

// Initialize EmailJS
// Replace with your actual public key
emailjs.init("YOUR_PUBLIC_KEY");

const contactForm = document.querySelector(".contact-form");
const successAlert = document.querySelector(".alert-success");
const errorAlert = document.querySelector(".alert-error");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    // Replace these with your actual EmailJS service ID and template ID
    const response = await emailjs.sendForm(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      contactForm
    );

    if (response.status === 200) {
      showAlert(successAlert);
      contactForm.reset();
    } else {
      showAlert(errorAlert);
    }
  } catch (error) {
    console.error("Error:", error);
    showAlert(errorAlert);
  }
});

function showAlert(alertElement) {
  // Hide any existing alerts
  successAlert.classList.remove("show");
  errorAlert.classList.remove("show");

  // Show the new alert
  alertElement.classList.add("show");

  // Hide alert after 5 seconds
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
