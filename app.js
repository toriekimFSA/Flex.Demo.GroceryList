// ******* STATE *******
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
const form = document.querySelector("form");
const groceryInput = document.getElementById("grocery-input");
const clearButton = document.getElementsByClassName("clear-btn")[0];

const tableBody = document.getElementById("table-body");
const totalQty = document.getElementById("total-qty");
const totalPrice = document.getElementById("total-price");

// const addItemIntervalId = setInterval(addGroceryItem, 3000);

// Initial Render
render();

// ******* EVENT LISTENERS *******
// Submit to add item to grocery list
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const itemValue = groceryInput.value;
  const item = items.find((item) => item.name === itemValue.toLowerCase());
  const qty = Math.floor(Math.random() * 5) + 1;
  const price = (Math.random() * 10).toFixed();

  if (item) {
    state.groceries.push({
      name: item.name,
      quantity: qty,
      price: item.price * qty,
    });
  } else {
    state.groceries.push({
      name: itemValue,
      quantity: qty,
      price,
    });
  }

  groceryInput.value = "";
  render();
});

// Clear all items from grocery list
clearButton.addEventListener("click", (event) => {
  state.groceries = [];
  render();
});

// ******* RENDER *******
function render() {
  const itemRows = state.groceries.map((item) => {
    const newRow = document.createElement("tr");

    const name = document.createElement("td");
    name.innerText = item.name;

    const quantity = document.createElement("td");
    quantity.innerText = item.quantity;

    const price = document.createElement("td");
    price.innerText = `$${item.quantity * item.price}`;

    newRow.replaceChildren(name, quantity, price);
    return newRow;
  });

  tableBody.replaceChildren(...itemRows);

  calculateTotalQty();
  calculateTotalPrice();

  totalQty.innerText = state.quantity;
  totalPrice.innerText = `$${state.price}`;
}

// ******* FUNCTIONS *******
function calculateTotalQty() {
  const qty = state.groceries.reduce((accum, item) => accum + item.quantity, 0);

  state.quantity = qty;

  return qty;
}

function calculateTotalPrice() {
  const totalPrice = state.groceries
    .reduce((accum, item) => accum + item.quantity * item.price, 0)
    .toFixed(2);

  state.price = totalPrice;

  return totalPrice;
}

// function addGroceryItem() {
//   const item = items[Math.floor(Math.random() * items.length)];
//   const quantity = Math.floor(Math.random() * 10) + 1;

//   state.groceries.push({ ...item, quantity });

//   render();

//   if (state.groceries.length === 10) {
//     clearInterval(addItemIntervalId);
//   }
// }
