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

// SELL Order
sellButton.addEventListener("click", () => {
  handleOrderClick("SELL_MARKET");
});

closePositionBtn.addEventListener("click", () => {
  if (activeOrder) {
    updateProfitsOrLossOnClose();
    buyButton.style.pointerEvents = "auto";
    sellButton.style.pointerEvents = "auto";
    entryPriceLevel.classList.add("tick-price");
    entryPriceLevel.style.visibility = "hidden";
    entryPriceLevel = "";
    activeOrder = null;
  }
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

// Update variables which holds the net, gross and total realized profit and display in the UI
function updateProfitsOrLossOnClose() {
  // Get values form UI
  let netPnlOnClose = parseFloat(accountTotalPnl.textContent.substring(1));
  let grossPnlOnClose = parseFloat(grossPnlEl.textContent.substring(1));
  // Check if the incoming values are thousands
  // Adjust the number (1.234 -> 1234.00) so can be added or substracted to a float number
  const [thousands, decimalNumbers] = adjustThousandsNet(netPnlOnClose);
  const thousandsGross = adjustThousandsGross(grossPnlOnClose);

  // console.log("NET ON CLOSE", netPnlOnClose);
  // If value is negative, substract form net/gross global variables else add
  if (netPnlOnClose < 0) {
    // console.log("CALCULATION", dailyProfitNet, "-", Math.abs(netPnlOnClose));
    // If incoming value is in thousands, add it to variable
    dailyProfitNet -=
      decimalNumbers.length === 3
        ? Math.abs(thousands)
        : Math.abs(netPnlOnClose);
    dailyProfitGross -=
      decimalNumbers.length === 3
        ? Math.abs(thousandsGross)
        : Math.abs(grossPnlOnClose);
  } else {
    dailyProfitNet +=
      decimalNumbers.length === 3
        ? Math.abs(thousands)
        : Math.abs(netPnlOnClose);
    dailyProfitGross +=
      decimalNumbers.length === 3
        ? Math.abs(thousandsGross)
        : Math.abs(grossPnlOnClose);
  }

  // Add or substract form 'accountBalance' depending on if net value realized is positive or negative
  if (dailyProfitNet.toFixed(2) < 0) {
    cleanTotalCash = accountBalance - Math.abs(dailyProfitNet.toFixed(2));
  } else {
    cleanTotalCash = accountBalance + Math.abs(dailyProfitNet.toFixed(2));
  }

  // Insert in UI the updated variables (dailyProfitGross, dailyProfitNet, cleanTotalCash)
  grossPnlEl.innerHTML = `<span style="color: ${
    dailyProfitGross > 0 ? "green" : "red"
  }" >&euro; ${formatCurrency(dailyProfitGross)}</span>`;
  totalCashValue.innerHTML = `<span> &euro; ${formatCurrency(
    cleanTotalCash
  )} </sapn>`;
  accountTotalPnl.innerHTML = `<span style="color: ${
    dailyProfitNet > 0 ? "green" : "red"
  }" >&euro; ${formatCurrency(dailyProfitNet)}</span>`;
}
