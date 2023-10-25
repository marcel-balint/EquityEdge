// Generate positive numbers
function generatePositivePriceChange() {
  const randomNumber = Math.random();
  return randomNumber * 20;
}

// Generate negative numbers
function generateNegativePriceChange() {
  const randomNumber = Math.random();
  return -randomNumber * 20;
}

// Generate random numbers based on price range
function generateRandomPriceChange() {
  return (Math.random() * 2 - 1) * priceRange;
}

function drawCandle(xAxis, open, high, low, close) {
  ctx.beginPath();
  ctx.strokeStyle = close > open ? "limegreen" : "red";
  ctx.lineWidth = 1;
  // Move the drawing cursor to the top of the candlestick, which is at the high price level.
  ctx.moveTo(xAxis, chartHeight - high);
  // Draw a line from the top to the bottom of the candlestick, representing the price range.
  ctx.lineTo(xAxis, chartHeight - low);
  // Stroke the path to actually draw the lines on the canvas.
  ctx.stroke();
  ctx.fillStyle = close > open ? "limegreen" : "red";
  // Draw a filled rectangle representing the candlestick body.
  // The top and bottom of the candle are determined by the higher of the opening and closing prices
  // and the lower of the opening and closing prices, respectively. The width is fixed at 8 pixels,
  // and the height is the absolute difference between the opening and closing prices.
  ctx.fillRect(
    xAxis - candleWidth / 2,
    chartHeight - Math.max(open, close),
    8,
    Math.abs(open - close)
  );
}

// Convert numbers in currency
function formatCurrency(amount) {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&.");
}

// Check if the incoming values are thousands
// Remove the dot (.) at 2nd index (1.234 -> 1234.00) so can be added or substracted to a float number
function adjustThousandsNet(floatNum) {
  let numToArray = floatNum.toString().split("");
  let theInd = numToArray.indexOf(".");
  let decimalNumbers = numToArray.slice(theInd + 1);
  //   if there are more than 3 numbers after the dot, remove it
  decimalNumbers.length === 3 ? numToArray.splice(theInd, 1) : "";
  let thousands = numToArray.join("");

  return [thousands, decimalNumbers];
}

function adjustThousandsGross(floatNum) {
  let numToArray = floatNum.toString().split("");
  let theInd = numToArray.indexOf(".");
  let decimalNumbersGross = numToArray.slice(theInd + 1);
  decimalNumbersGross.length === 3 ? numToArray.splice(theInd, 1) : "";
  let thousandsGross = numToArray.join("");

  return thousandsGross;
}
