const headerElement = document.querySelector(".header-hero_text-box");
const navigationBar = document.querySelector("nav");

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
