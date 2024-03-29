const canvas = document.getElementById("candlestickChart");
const priceNow = document.querySelector(".price-now");
const pricePoints = document.querySelector(".price-points");
pricePoints.innerHTML = generatePriceLadder().join(""); // Attach the price ladder
const tickPoints = document.querySelectorAll(".tick-price");
const orderQtyValue = document.querySelector(".order-quantity__numbers");
const grossPnlEl = document.querySelector(".account_gross--pnl");
const openPnlEl = document.querySelector(".open-pnl");
const entryPriceEl = document.querySelector(".entry-price");
const boughtOrSoldQtyEl = document.querySelector(".bought-sold");
const activeOrderLight = document.querySelector(".is-active-order");
const openPositionsTextTab = document.querySelector(".open-positions-text");
const accountTotalPnl = document.querySelector(".account_total--pnl");
const activePositionDirection = document.querySelector(".position-direction");
const activePositionQuantity = document.querySelector(".position-qty");
const activePositionEntryPrice = document.querySelector(".position-price");
const activePositionPnl = document.querySelector(".position-pnl");
const tickPriceList = document.querySelectorAll(".tick-price");
const totalCashValue = document.querySelector(".account_cash--vlue");

// Generate p elements with numbers form 150 to 1
function generatePriceLadder() {
  return Array.from({ length: 150 }, (_, i) => {
    const price = 150 - i;
    return `<p class='tick-price'>${price}</p>`;
  });
}

const ctx = canvas.getContext("2d");
canvas.style.width = "100%";
canvas.style.height = "100%";

let candleWidth = 10;
let chartHeight = canvas.height;
let chartWidth = canvas.width;
let currentPrice = 50;
let priceRange = 10;

const accountBalance = 100000;
let dailyProfitGross = 0;
let dailyProfitNet = 0;
let cleanTotalCash = 0;

function createCandle() {
  const open = currentPrice;
  let priceChange;
  // if price goes below 10: lift the price otherwise generate random numbers
  if (Math.floor(currentPrice) < 10) {
    priceChange = Math.floor(generatePositivePriceChange());
  } else if (Math.floor(currentPrice) > 140) {
    priceChange = Math.floor(generateNegativePriceChange());
  } else {
    priceChange = Math.floor(generateRandomPriceChange());
  }
  // Calculate the high, low, and closing prices for the new candle
  const high = open + Math.max(priceChange, 0);
  const low = open + Math.min(priceChange, 0);
  const close = open + priceChange;
  // Remove the last candle (chart will have an auto scroll effect and follow to price)
  let theMarketData = localStorage.getItem("market_data"); // Access local storage data
  let parsedData = JSON.parse(theMarketData);
  let slicedData = parsedData.slice(1);

  // Add new candle
  slicedData.push({ open, high, low, close });
  localStorage.setItem("market_data", JSON.stringify(slicedData));

  currentPrice = close;
  priceNow.textContent = Math.floor(currentPrice);
  // Calculate the highest x-coordinate in the chart to determine if the chart needs resizing.
  const highestX = (candles.length - 1) * candleWidth + candleWidth / 2;
  if (highestX > chartWidth) {
    // If highest x-coordinate goes beyond chart width, adjust chart width
    chartWidth = highestX;
    canvas.width = chartWidth;
  }
}

function updateChart() {
  // Access data for local storage
  let dataFlow = localStorage.getItem("market_data");
  let dataFlowParsed = JSON.parse(dataFlow);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < dataFlowParsed.length; i++) {
    // Calculate the x-coordinate (xAxis) for the center of the candlestick.
    const xAxis = (i + 0.5) * candleWidth + candleWidth / 2;
    const { open, high, low, close } = dataFlowParsed[i];
    // Draw the candlestick at the specified coordinates.
    drawCandle(xAxis, open, high, low, close);
  }
  // Display the current traded price position on Y axis
  displayCurrentTradedPrice(tickPoints);

  if (activeOrder) {
    // Calculate and display the profit based on BUY or SELL order
    const profitAndLossData = calculateProfitAndLoss(
      entryPriceLevelNumber,
      currentPrice,
      orderQtyValue.value,
      activeOrder
    );
    updateUI(profitAndLossData, activeOrder);
  }
}

setInterval(createCandle, 900);
setInterval(updateChart, 900);

function displayCurrentTradedPrice(priceLadder) {
  // Loop over the price ladder check which number is equal to the current price and display it, else hide it.
  priceLadder.forEach((el) => {
    if (parseInt(el.textContent) === Math.floor(currentPrice)) {
      el.style.visibility = "visible";
      el.style.borderTopRightRadius = "3px";
      el.style.borderBottomRightRadius = "3px";
      el.style.padding = "0px 10px 0px 10px";
      el.style.border = "1px solid #fff";
      el.style.color = "#000";
      el.style.fontWeight = "bold";
      el.style.transform = "translateX(-25px)";
    } else {
      // Check if there is entry price to display it (horizontal label)
      if (el.textContent === entryPriceLevel.textContent) {
        el.style.visibility = "visible";
      } else {
        el.style.visibility = "hidden";
      }
      el.style.backgroundColor = "";
      el.style.transform = "translateX(0px)";
      el.style.padding = "0px 0px 0px 0px";
      el.style.border = "none";
      el.style.borderTopRightRadius = "0px";
      el.style.borderBottomRightRadius = "0px";
    }
  });
}

// Calculate profit in real time, based on 'orderQunatity'
function calculateProfitAndLoss(entryPrice, currentPrice, orderQty, orderType) {
  let profitOrLossTicks;
  let profitOrLoss;
  let profitOrLossColor;
  let decimalPercentage;
  let totalPnl;

  if (orderType === "BUY_MARKET") {
    // Substract the CURRENT PRICE form ENTRY PRICE
    profitOrLossTicks = currentPrice - parseInt(entryPrice);
    // Profit based on order qunatity
    profitOrLoss = profitOrLossTicks * parseInt(orderQty);
    profitOrLossColor = profitOrLoss > 0 ? "green" : "red";
    // Substact 0.5% commissions
    decimalPercentage = 0.5 / 100;
    totalPnl = profitOrLoss - profitOrLoss * decimalPercentage;
  } else if (orderType === "SELL_MARKET") {
    // Substract the ENTRY PRICE form CURRENT PRICE
    profitOrLossTicks = parseInt(entryPrice) - currentPrice;
    // Profit based on order qunatity
    profitOrLoss = profitOrLossTicks * parseInt(orderQty);
    profitOrLossColor = profitOrLoss > 0 ? "green" : "red";
    // Substact 0.5% commission
    decimalPercentage = 0.5 / 100;
    totalPnl = profitOrLoss - profitOrLoss * decimalPercentage;
  }

  return {
    profitOrLossTicks,
    profitOrLoss,
    profitOrLossColor,
    totalPnl,
  };
}

// Update UI in real time with profit or loss, currency colors based on profit/loss,
// BUY or SELL order based on 'orderType'
function updateUI(profitAndLossData, orderType) {
  grossPnlEl.innerHTML = `<span style="color: ${
    profitAndLossData.profitOrLossColor
  }">&euro; ${formatCurrency(profitAndLossData.profitOrLoss)}</span>`;
  openPnlEl.innerHTML = `<span style="color: ${
    profitAndLossData.profitOrLossColor
  }">&euro; ${formatCurrency(profitAndLossData.profitOrLoss)}</span>`;
  entryPriceEl.textContent = entryPriceLevelNumber;
  entryPriceEl.style.backgroundColor = "#2d333a";
  boughtOrSoldQtyEl.textContent = orderQtyValue.value;
  boughtOrSoldQtyEl.style.backgroundColor =
    orderType === "BUY_MARKET" ? "green" : "red";
  activeOrderLight.style.display = "block";
  openPositionsTextTab.style.marginLeft = "15px";
  accountTotalPnl.innerHTML = `<span style="color: ${
    profitAndLossData.profitOrLossColor
  }" >&euro; ${formatCurrency(profitAndLossData.totalPnl)}</span>`;

  // Active Positions tab
  activePositionDirection.textContent =
    orderType === "BUY_MARKET" ? "BUY" : "SELL";
  activePositionDirection.style.color =
    orderType === "BUY_MARKET" ? "green" : "red";
  activePositionQuantity.textContent = orderQtyValue.value;
  activePositionEntryPrice.textContent = entryPriceLevelNumber;
  activePositionPnl.innerHTML = `<span style="color: ${
    profitAndLossData.profitOrLossColor
  }">&euro; ${formatCurrency(profitAndLossData.profitOrLoss)}</span>`;

  // Update inserted horizontal label
  tickPriceList.forEach((el) => {
    if (el.querySelector(".entry")) {
      let parent = el;
      parent.querySelector(".entry-window").textContent =
        profitAndLossData.profitOrLossTicks;
      parent.querySelector(".entry-window").style.backgroundColor =
        profitAndLossData.profitOrLossColor;
      parent.querySelector(".entry-num-of-qty").textContent =
        orderQtyValue.value;
      parent.querySelector(".entry-num-of-qty").style.backgroundColor =
        orderType === "BUY_MARKET" ? "green" : "red";
    }
  });
}
