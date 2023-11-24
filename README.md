# EquityEdge Simulation Trading Platform

The EquityEdge simulation trading platform allows aspiring traders to practice trading in a simulated environment before entering the real stock market.

## Live Demo

Check out the live demo [here](https://marcel-balint.github.io/EquityEdge/).

## UX

### User Stories

- Access the site seamlessly on various devices (mobile, tablet, desktop).
- Explore articles to get familiar with the investing world.
- Practice executing trades, including buying and selling stocks with specified quantities.
- View real-time updates on entry price, quantity, and gross/net profit/loss.
- Experience a comprehensive overview of total account changes upon closing a position.

## Features

- **Navbar:**

  - **About:** Dropdown menu with information about trading/investing.
  - **Insights:** Dropdown menu with detailed information on trading/investing and associated risks.
  - **Trading Platform:** Direct link to the trading platform.

- On the home page there is a background image with introduction text and a button which links to the platform page - The aim of this section is to introduce the user to the website.
- **Footer:**

  - Six links related to investing.
  - Social media links with hover effects.

- **Trading Platform:**

  - **Accounts Tab:**
    - Cash value, gross realized PnL, total commissions, total PnL.
  - **Active Positions Tab:**

    - Order type (BUY or SELL), quantity, average price, PnL.

  - **Chart:**
    - Displays candles with real-time price indicators.

- **Chart Controller:**
  - Buy Mkt and Sell Mkt buttons for executing orders.
  - Visual indicators for active orders.
  - Entry price, PnL, and Order Qty input field.
  - Warning for entering more than 50 contracts.

## Technologies used:

- HTML
- CSS
- JavaScript

## Installing the project locally:

1 Clone this repo:

`git clone https://github.com/marcel-balint/EquityEdge.git`

2 To cut ties with this GitHub repository, type in terminal:

`git remote rm origin`
