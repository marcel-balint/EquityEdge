const canvas = document.getElementById("candlestickChart");
const pricePoints = document.querySelector(".price-points");
pricePoints.innerHTML = generatePriceLadder().join(""); // Attach the price ladder

// Generate p elements with numbers form 150 to 1
function generatePriceLadder() {
  return Array.from({ length: 150 }, (_, i) => {
    const price = 150 - i;
    return `<p class='tick-price'>${price}</p>`;
  });
}
