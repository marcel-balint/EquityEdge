const accountTab = document.querySelector(".account-tab");
const positionTab = document.querySelector(".open-positions-tab");
const accountRows = document.querySelector(".account-info__rows");
const positionRows = document.querySelector(".position-info__rows");

accountTab.style.backgroundColor = "#42494f";

accountTab.addEventListener("click", () => {
  positionRows.style.display = "none";
  positionTab.style.backgroundColor = "";
  accountRows.style.display = "flex";
  accountTab.style.backgroundColor = "#42494f";
});

positionTab.addEventListener("click", () => {
  accountRows.style.display = "none";
  accountTab.style.backgroundColor = "";
  positionRows.style.display = "flex";
  positionTab.style.backgroundColor = "#42494f";
});
