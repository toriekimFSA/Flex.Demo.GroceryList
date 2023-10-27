// The program initializes a state with a grocery list with at least 2 items
// ******* STATE *******
const state = {
  groceries: [
    { name: "apple", quantity: 6, price: 1.75 },
    { name: "banana", quantity: 6000, price: 0.25 },
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
// Use document.querySelector
const form = document.querySelector("form");
const itemInput = document.querySelector("#grocery-input");
const addButton = document.querySelector(".submit-btn");
const clearButton = document.getElementsByClassName("clear-btn")[0];
const tableBody = document.getElementById("table-body");

const totalQty = document.getElementById("total-qty");
const totalPrice = document.getElementById("total-price");

// ******* EVENT LISTENERS *******
// When the "Add" button is clicked, a new item is added to the grocery list
addButton.addEventListener("click", (event) => {
  // Need to prevent default behavior of re-render on form submit
  event.preventDefault();
  // Get input value for name
  const name = itemInput.value;
  // new item with a random price and random quantity
  const quantity = Math.floor(Math.random() * 10) + 1;
  const price = Math.floor(Math.random() * 50) + 1;

  const itemFound = items.find((item) => item.name === name.toLowerCase());
  console.log(itemFound);
  const itemInList = state.groceries.find(
    (item) => item.name === name.toLowerCase()
  );

  // Extra: Make sure input value is not empty before adding to the list
  // Extra: If the item already exists in the grocery list, add to and update the item
  if (itemInList) {
    itemInList.quantity = itemInList.quantity + 1;
    // const updatedItem = { ...itemInList, quantity: itemInList.quantity + 1 };
    // const newState = state.groceries.filter(
    //   (item) => item.name !== itemInList.name
    // );
    // state.groceries = [...newState, updatedItem];
  } else if (itemFound) {
    state.groceries.push({
      name: itemFound.name,
      quantity,
      price: itemFound.price,
    });
  } else if (name.trim().length > 0) {
    state.groceries.push({ name, quantity, price });
  } else {
    alert("Hey, add a real item!");
  }

  // Reset input value so it's empty
  itemInput.value = "";
  // Re-render
  render();
});

// When the "Clear Items" button is clicked, all items are cleared
clearButton.addEventListener("click", () => {
  // Reset state.groceries to clear all items
  state.groceries = [];
  // Re-render
  render();
});

// Another way to write the above:
// form.addEventListener("submit", (event) => {
//   event.preventDefault();
// });

// Initial render
render();

// ******* RENDER *******
function render() {
  const newRows = state.groceries.map((item) => {
    const newRow = document.createElement("tr");
    // We need to create 3 <td> elements and populate that with our item data
    const name = document.createElement("td");
    name.innerText = item.name;

    const quantity = document.createElement("td");
    quantity.innerText = item.quantity;

    const price = document.createElement("td");
    price.innerText = `$${(item.price * item.quantity).toFixed(2)}`;

    // Add <td> elements to parent <tr>
    newRow.append(name, quantity, price);
    // Return newRow to correctly populate new array
    return newRow;
  });

  // Replace table body's children with new rows
  tableBody.replaceChildren(...newRows);

  // The DOM is updated to reflect the total price and total quantity
  // Add total price and total qty to table
  totalQty.innerText = calculateTotalQty();
  totalPrice.innerText = `$${calculateTotalPrice()}`;
}

// ******* FUNCTIONS *******
// A function is written that correctly calculates the total price of all the items on the grocery list
function calculateTotalPrice() {
  return state.groceries
    .reduce((subtotal, currentItem) => {
      return subtotal + currentItem.price * currentItem.quantity;
    }, 0)
    .toFixed(2);
}

// A function is written that correctly calculates the total qty of all the items on the grocery list
function calculateTotalQty() {
  return state.groceries.reduce((subtotal, currentItem) => {
    return subtotal + currentItem.quantity;
  }, 0);
}
