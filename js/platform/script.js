const canvas = document.getElementById("candlestickChart");
const priceNow = document.querySelector(".price-now");
const pricePoints = document.querySelector(".price-points");
pricePoints.innerHTML = generatePriceLadder().join(""); // Attach the price ladder
const tickPoints = document.querySelectorAll(".tick-price");

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
  candles = candles.slice(1);
  // Add new candle
  candles.push({ open, high, low, close });
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < candles.length; i++) {
    // Calculate the x-coordinate (xAxis) for the center of the candlestick.
    const xAxis = (i + 0.5) * candleWidth + candleWidth / 2;
    const { open, high, low, close } = candles[i];
    // Draw the candlestick at the specified coordinates.
    drawCandle(xAxis, open, high, low, close);
  }
  // Display the current traded price position on Y axis
  displayCurrentTradedPrice(tickPoints);
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
