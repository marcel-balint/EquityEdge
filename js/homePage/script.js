const featuresContent = document.querySelector(".row");
const navigationBar = document.querySelector("nav");

// Add sticky nav on scroll if features section is on window view
const obsCallback = function (entries) {
  const [entry] = entries;
  entry.isIntersecting
    ? navigationBar.classList.add("fixed-nav")
    : navigationBar.classList.remove("fixed-nav");
};

const obsOptions = {
  root: null, // All window observer
  threshold: 0, // Element in view
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(featuresContent); // Observe if 'featuresContent' is in window
