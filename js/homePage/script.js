const headerElement = document.querySelector(".header-hero_text-box");
const navigationBar = document.querySelector("nav");
const copyrightEl = document.querySelector(".current-year");
const dropdownInsights = document.querySelector(".insights-link");
const dropdownAbout = document.querySelector(".about-link");
const dropdownInsightsExpander = document.querySelector(
  ".data-expander_insights"
);
const dropdownAboutExpander = document.querySelector(".data-expander_about");
const dropdownLinks = document.querySelectorAll(".data-expander ul li");
const mobileMenu = document.querySelector(".mobile-icon");
const navigationLinksMobile = document.querySelector(".nav-links");

// Navigation dropdown links toggle
dropdownAbout.addEventListener("click", () => {
  dropdownInsightsExpander.classList.remove("active-dropdown");
  dropdownAboutExpander.classList.toggle("active-dropdown");
  dropdownAbout.classList.toggle("active-link");
  dropdownInsights.classList.remove("active-link");
});

dropdownInsights.addEventListener("click", () => {
  dropdownInsightsExpander.classList.toggle("active-dropdown");
  dropdownAboutExpander.classList.remove("active-dropdown");
  dropdownAbout.classList.remove("active-link");
  dropdownInsights.classList.toggle("active-link");
});

// Set dropdown menu to initial state when click on a dropdown link
dropdownLinks.forEach((el) => {
  el.addEventListener("click", () => {
    el.parentElement.parentElement.classList.remove("active-dropdown");
    el.parentElement.parentElement.previousElementSibling.classList.remove(
      "active-link"
    );
  });
});

// Set dropdown menu to initial state when click ouside of the dropdown menu
document.addEventListener("click", (e) => {
  if (e.target !== dropdownAbout && e.target !== dropdownInsights) {
    dropdownInsights.classList.remove("active-link");
    dropdownAbout.classList.remove("active-link");
    dropdownAboutExpander.classList.remove("active-dropdown");
    dropdownInsightsExpander.classList.remove("active-dropdown");
  }
});

const currentYear = new Date().getFullYear();
copyrightEl.textContent = currentYear;

// Add sticky nav on scroll if headerElement section is not in window view
const obsCallback = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) {
    navigationBar.classList.add("fixed-nav");
  } else {
    navigationBar.classList.remove("fixed-nav");
  }
};

const obsOptions = {
  root: null, // Viewport
  threshold: 0, // Element in view
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(headerElement); // Observe if 'headerElement' is in the viewport

// Mobile menu functionality
mobileMenu.addEventListener("click", () => {
  navigationLinksMobile.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});
