// Download CV function
function downloadCV() {
  const fileUrl = "./assets/EMMANUEL OUKO OWUOR CV.pdf";
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "EMMANUEL OUKO OWUOR CV.pdf"; // Specify the download filename

  // Add error handling for file access
  link.onerror = () => {
    console.error("Error downloading CV");
    alert(
      "Sorry, there was an error downloading the CV. Please try again later."
    );
  };

  // Temporarily append link to body, trigger click, then remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Update footer year
function updateFooterYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Initialize event listeners when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the resume button
  const resumeButton = document.querySelector('.cta-buttons a[href="#"].btn');

  if (resumeButton) {
    // Remove the placeholder href
    resumeButton.removeAttribute("href");

    // Add click event listener
    resumeButton.addEventListener("click", downloadCV);
  }

  // Keep the existing year update functionality
  updateFooterYear();
});

/* //Typing Animation
// First, update your HTML to have a span for the typing effect
const text = document.querySelector(".intro-text h2");
const originalText = text.textContent;
text.textContent = "";

// Create typing sound effect
const typeSound = new Audio("path-to-your-typing-sound.mp3"); // Add your typing sound file path
typeSound.volume = 0.2; // Adjust volume (0.0 to 1.0)

function typeText(element, text, speed = 150) {
  // Increased speed to 150ms for slower typing
  let index = 0;

  // Add initial delay before typing starts
  setTimeout(() => {
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        // Play sound for each character
        typeSound.currentTime = 0; // Reset sound to start
        typeSound.play();
        index++;
        setTimeout(type, speed);
      }
    }
    type();
  }, 500); // 500ms delay before typing starts
}

// Track if animation has played
let hasAnimationPlayed = false;

// Create an Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimationPlayed) {
        // Only run animation if it hasn't played yet
        typeText(text, originalText);
        hasAnimationPlayed = true;
      } else if (!entry.isIntersecting) {
        // Reset when section is out of view
        text.textContent = "";
        hasAnimationPlayed = false;
      }
    });
  },
  {
    threshold: 0.5,
  }
);

// Start observing the hero section
const heroSection = document.querySelector(".hero");
observer.observe(heroSection); */
