// ******* STATE *******
// The program initializes a state with a grocery list with at least 2 items
const state = {
  groceries: [
    { name: "apple", price: 1.75, quantity: 1 },
    { name: "banana", price: 0.25, quantity: 1 },
  ],
  quantity: 0,
  price: 0,
};

const items = [
  { name: "apple", price: 1.75 },
  { name: "banana", price: 0.25 },
  { name: "orange", price: 1.0 },
  { name: "broccoli", price: 3.0 },
  { name: "cucumber", price: 1.0 },
  { name: "carrot", price: 1.0 },
  { name: "milk", price: 5.75 },
  { name: "cheddar cheese", price: 4.0 },
  { name: "sourdough loaf", price: 5.5 },
  { name: "eggs", price: 4.0 },
  { name: "cereal", price: 3.5 },
  { name: "rice", price: 5 },
];

// ******* REFERENCES *******
// Use document.querySelector
const form = document.querySelector("form");
const groceryInput = document.getElementById("grocery-input");

const addButton = document.querySelector(".submit-btn");
const clearButton = document.getElementsByClassName("clear-btn")[0];

const tableBody = document.getElementById("table-body");
const totalQty = document.getElementById("total-qty");
const totalPrice = document.getElementById("total-price");

// Initial Render
render();

// ******* EVENT LISTENERS *******
// When the "Add" button is clicked, a new item is added to the grocery list
// Form submit: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
form.addEventListener("submit", (event) => {
  // Need to prevent default re-render on form submit
  // Try to submit without the next line to see what happens!
  event.preventDefault();

  // Get the value in the input of the form
  // const itemValue = form.elements.grocery.value
  const itemValue = groceryInput.value;
  // Check to see if the itemValue exists in items array
  const itemFound = items.find((item) => item.name === itemValue.toLowerCase());
  // Create random qty & price
  const quantity = Math.floor(Math.random() * 5) + 1;
  const price = Math.floor(Math.random() * 10) + 1;

  // If item is found...
  if (itemFound) {
    // Add new object with found item's name & price
    state.groceries.push({
      name: itemFound.name,
      quantity,
      price: itemFound.price,
    });
    // Otherwise, check if itemValue is valid, not empty space
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
  } else if (itemValue.trim().length > 0) {
    state.groceries.push({
      name: itemValue,
      quantity,
      price,
    });
    // Else, alert the user to enter a valid item name
  } else {
    alert("Please enter an item name");
  }

  // Reset input value so it's empty after adding item
  groceryInput.value = "";
  // Re-render since we changed our state data to update UI
  render();
});

// When the "Clear Items" button is clicked, all items are cleared
clearButton.addEventListener("click", (event) => {
  // Reset state.groceries to clear all items
  state.groceries = [];
  // Re-render to update UI
  render();
});

// ******* RENDER *******
function render() {
  // Map over groceries to create a new <tr> for each item
  const itemRows = state.groceries.map((item) => {
    const newRow = document.createElement("tr");
    // Create 3 <td> elements and populate with item data
    const name = document.createElement("td");
    name.innerText = item.name;

    const quantity = document.createElement("td");
    quantity.innerText = item.quantity;

    const price = document.createElement("td");
    const priceText = (item.quantity * item.price).toFixed(2);
    price.innerText = `$${priceText}`;

    // Add <td> elements to parent <tr>
    newRow.append(name, quantity, price);
    // Return newRow to populate new array
    return newRow;
  });

  // Replace table body's children with new rows
  // Difference between append & replaceChildren? Try the next line with .append() instead to see what happens!
  tableBody.replaceChildren(...itemRows);

  // Calculate new totals, add to state
  calculateTotalQty();
  calculateTotalPrice();

  // The DOM is updated to reflect the total price and total quantity
  totalQty.innerText = state.quantity;
  totalPrice.innerText = `$${state.price}`;
}

// ******* FUNCTIONS *******
// A function is written that correctly calculates the total qty of all the items on the grocery list
function calculateTotalQty() {
  const qty = state.groceries.reduce((accum, item) => accum + item.quantity, 0);

  state.quantity = qty;
}

// A function is written that correctly calculates the total price of all the items on the grocery list
function calculateTotalPrice() {
  const totalPrice = state.groceries
    .reduce((accum, item) => accum + item.quantity * item.price, 0)
    .toFixed(2);

  state.price = totalPrice;
}
