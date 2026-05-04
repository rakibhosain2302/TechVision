// ============================================
// DARK MODE TOGGLE
// ============================================
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Services Data Array - FIXED PATH
const servicesData = [
  {
    image: "assets/images/services/Web.png",
    title: "Web Development",
    desc: "Build modern, responsive websites that engage your audience and drive conversions with our expert development team.",
    link: "#Web",
  },
  {
    image: "assets/images/services/Cloud .png",
    title: "Cloud Solutions",
    desc: "Migrate and manage your infrastructure on the cloud for improved scalability, security, and cost efficiency.",
    link: "#Cloud",
  },
  {
    image: "assets/images/services/Cyber.png",
    title: "Cybersecurity",
    desc: "Protect your business with advanced security measures and comprehensive threat protection strategies.",
    link: "#security",
  },
  {
    image: "assets/images/services/App.png",
    title: "Mobile Apps",
    desc: "Create powerful mobile applications for iOS and Android that delight users and deliver real value.",
    link: "#MobileApps",
  },
  {
    image: "assets/images/services/Data.png",
    title: "Data Analytics",
    desc: "Gain actionable insights from your data with our advanced analytics and business intelligence solutions.",
    link: "#DataAnalytics",
  },
  {
    image: "assets/images/services/Ai.png",
    title: "AI & Automation",
    desc: "Leverage artificial intelligence and machine learning to automate processes and improve efficiency.",
    link: "#Automation",
  },
];

// Target container
const servicesGrid = document.getElementById("servicesGrid");

// Loop through servicesData and inject HTML
servicesData.forEach((service) => {
  const col = document.createElement("div");
  col.className = "col-md-4";

  col.innerHTML = `
    <div class="service-card h-100 shadow p-4 d-flex flex-column text-center">
     <img src="${service.image}" alt="${service.title}" class="img-fluid mb-3 service-img">
     <h3 class="mt-1">${service.title}</h3>
     <p class="desc flex-grow-1">${service.desc}</p>
     <a href="${service.link}" class="btn mt-2">Read More</a>
    </div>
  `;

  servicesGrid.appendChild(col);
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ============================================
// FORM VALIDATION
// ============================================
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("successMessage");

// Validation functions
function validateName() {
  const name = nameInput.value.trim();

  if (name === "") {
    nameError.textContent = "❌ Name is required";
    nameError.classList.add("show");
    return false;
  } else if (name.length < 3) {
    nameError.textContent = "❌ Name must be at least 3 characters";
    nameError.classList.add("show");
    return false;
  } else {
    nameError.classList.remove("show");
    return true;
  }
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    emailError.textContent = "❌ Email is required";
    emailError.classList.add("show");
    return false;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = "❌ Please enter a valid email address";
    emailError.classList.add("show");
    return false;
  } else {
    emailError.classList.remove("show");
    return true;
  }
}

function validateMessage() {
  const message = messageInput.value.trim();

  if (message === "") {
    messageError.textContent = "❌ Message is required";
    messageError.classList.add("show");
    return false;
  } else if (message.length < 10) {
    messageError.textContent = "❌ Message must be at least 10 characters";
    messageError.classList.add("show");
    return false;
  } else {
    messageError.classList.remove("show");
    return true;
  }
}

// Real-time validation
nameInput.addEventListener("blur", validateName);
nameInput.addEventListener("input", () => {
  if (nameError.classList.contains("show")) {
    validateName();
  }
});

emailInput.addEventListener("blur", validateEmail);
emailInput.addEventListener("input", () => {
  if (emailError.classList.contains("show")) {
    validateEmail();
  }
});

messageInput.addEventListener("blur", validateMessage);
messageInput.addEventListener("input", () => {
  if (messageError.classList.contains("show")) {
    validateMessage();
  }
});

// Form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate all fields
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isMessageValid) {
    // Simulate form submission
    successMessage.textContent =
      "✅ Message sent successfully! We will get back to you soon.";
    successMessage.classList.add("show");

    // Reset form
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 5000);

    // Log form data (in a real app, you would send this to a server)
    console.log({
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
      timestamp: new Date(),
    });
  }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe service cards for animation
document.querySelectorAll(".service-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// ============================================
// NAVIGATION HIGHLIGHTING
// ============================================
window.addEventListener("scroll", () => {
  let current = "";

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.3s ease";

// Simulate page load
setTimeout(() => {
  document.body.style.opacity = "1";
}, 100);

console.log("TechVision Landing Page Loaded Successfully! 🚀");
