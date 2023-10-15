const accountTab = document.querySelector(".account-tab");
const positionTab = document.querySelector(".open-positions-tab");
const accountRows = document.querySelector(".account-info__rows");
const positionRows = document.querySelector(".position-info__rows");
const buyButton = document.querySelector(".buy-btn");
const sellButton = document.querySelector(".sell-btn");
const closePositionBtn = document.querySelector(".close-position__btn");

let activeOrder = null;
let entryPriceLevel = "";
let entryPriceLevelNumber = 0;

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

// BUY Order
buyButton.addEventListener("click", () => {
  handleOrderClick("BUY_MARKET");
});

// Set the order type (BUY/SELL), insert entry price label on the chart
function handleOrderClick(orderType) {
  activeOrder = orderType;
  insertEntryPriceLine(tickPoints);
  buyButton.style.pointerEvents = "none";
  sellButton.style.pointerEvents = "none";
}

// Insert horizontal line with real time info about the order (entry price, profit/loss on position)
function insertEntryPriceLine(pricePoints) {
  pricePoints.forEach((el) => {
    // Check which number on Y axis price ladder is equal with the 'currentPrice'
    if (currentPrice === parseInt(el.textContent)) {
      entryPriceLevel = el;
      el.classList.remove("tick-price");
      el.style.border = "none";
      el.innerHTML = `<p class="entry">
            <span class="entry-window">99</span>
            <span class="entry-num-of-qty"></span>
            <span class="entry-line"></span>
            <span class="entry-price-position">${el.textContent}</span>
        </p>`;
      // Get the entry price
      entryPriceLevelNumber = entryPriceLevel.querySelector(
        ".entry-price-position"
      ).textContent;
    }
  });
}
