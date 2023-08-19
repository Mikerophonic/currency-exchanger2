import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currency-exchange.js';

// Business Logic

async function getExchange(USD, newCurrency) {
  const response = await CurrencyExchange.getExchange(USD);
  console.log(response);
  if (response.result === "success") {
    const newCurrencyAmount = USD * response["conversion_rates"][newCurrency];
    console.log(newCurrencyAmount);
    printElements(USD, newCurrency, newCurrencyAmount);
  } else {
    printError(response);
  }
}

// UI Logic

function printElements(USD, newCurrency, newCurrencyAmount) {
  document.querySelector('#showResponse').innerText = `${USD} USD = ${newCurrencyAmount} ${newCurrency}`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the exchange rate: 
  ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const USD = document.querySelector('#USD').value;
  document.querySelector('#USD').value = null;
  const newCurrency = document.getElementById("currency-select").value;
  getExchange(USD, newCurrency);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});