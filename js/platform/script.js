const canvas = document.getElementById("candlestickChart");
const priceNow = document.querySelector(".price-now");
const pricePoints = document.querySelector(".price-points");
pricePoints.innerHTML = generatePriceLadder().join(""); // Attach the price ladder

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
}

setInterval(createCandle, 500);
setInterval(updateChart, 500);
