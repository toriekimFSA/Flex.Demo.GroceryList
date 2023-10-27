//   - _Extra_: If the item already exists in the grocery list, add to and update the item

// ******* STATE *******
const state = {
  groceries: [
    { name: "apple", quantity: 2, price: 1.75 },
    { name: "banana", quantity: 4, price: 0.25 },
  ],
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
const form = document.querySelector(".grocery-form");
const tableBody = document.getElementById("table-body");
const clearButton = document.querySelector(".clear-btn");
const addInput = document.getElementById("grocery-input");
const totalQty = document.getElementById("total-qty");
const totalPrice = document.getElementById("total-price");

// ******* EVENT LISTENERS *******
// When the "Add" button is clicked, a new item is added to the grocery list
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // When we click the button, we want to add the item to the groceries array
  // First, we need to grab the input value
  const inputValue = form.elements.grocery.value;
  // Can be from items array OR a new item with a random price and random quantity
  const qty = Math.floor(Math.random() * 10) + 1;
  const price = Math.floor(Math.random() * 5) + 1;

  const itemFound = items.find(
    (item) => item.name === inputValue.toLowerCase()
  );
  console.log("itemFound: ", itemFound);
  if (itemFound) {
    console.log("we found!");
  } else {
    console.log("we didn't find");
  }

  if (itemFound) {
    state.groceries.push({
      name: itemFound.name,
      quantity: qty,
      price: itemFound.price,
    });
  } else if (inputValue.trim().length > 0) {
    state.groceries.push({ name: inputValue, quantity: qty, price });
  } else {
    alert("Add a real item!!!");
  }

  // Clear input as empty string
  addInput.value = "";

  render();
});

// Initial render
render();

// When the "Clear Items" button is clicked, all items are cleared
// element.addEventListener("event", fnc)
clearButton.addEventListener("click", () => {
  // Clear our state
  state.groceries = [];
  console.log(state.groceries);
  render();
});

// ******* RENDER *******
function render() {
  // we want to display all our groceries in the table
  // rowItems -> [tr, tr, tr, tr, ...]
  const rowItems = state.groceries.map((item) => {
    // First, we want to create a table row
    const newRow = document.createElement("tr");

    // newRow.innerHTML = `<td>${item.name}</td>
    //   <td>${item.quantity}</td>
    //   <td>${item.price * item.quantity}</td>`;

    const name = document.createElement("td");
    name.textContent = item.name;

    const qty = document.createElement("td");
    qty.textContent = item.quantity;

    const price = document.createElement("td");
    price.textContent = item.price * item.quantity;

    newRow.replaceChildren(name, qty, price);

    return newRow;
  });

  tableBody.replaceChildren(...rowItems);

  // - The DOM is updated to reflect the total price and total quantity
  const newTotalQty = calculateTotalQty();
  totalQty.textContent = newTotalQty;
  const newTotalPrice = calculateTotalPrice();
  totalPrice.textContent = `$${newTotalPrice.toFixed(2)}`;
}

// ******* FUNCTIONS *******
// - A function is written that correctly calculates the total price of all the items on the grocery list
function calculateTotalPrice() {
  const total = state.groceries.reduce(
    (accum, item) => accum + item.price * item.quantity,
    0
  );

  return total;
}

// - A function is written that correctly calculates the total qty of all the items on the grocery list
function calculateTotalQty() {
  const total = state.groceries.reduce(
    (accum, item) => accum + item.quantity,
    0
  );
  return total;
}
