# Flex Review: JavaScript & DOM

## Demo: Grocery List

In this demo, you will be creating a grocery list where you can add items to the list and clear all items from the list.

### Requirements

- The HTML does not contain any hard-coded data about grocery items
- Use `document.querySelector`
- The program initializes a state with a grocery list with at least 2 items
- When the "Add" button is clicked, a new item is added to the grocery list
  - Can be from items array OR a new item with a **random price** and **random quantity**
  - **_Extra_**: Make sure input value is not empty before adding to the list
  - **_Extra_**: If the item already exists in the grocery list, add to and update the item
- When the "Clear Items" button is clicked, all items are cleared
- A function is written that correctly calculates the total price of all the items on the grocery list
- A function is written that correctly calculates the total qty of all the items on the grocery list
- The DOM is updated to reflect the total price and total quantity

### Extra Challenges

- Add `-` and `+` buttons on either side of an item's quantity
  - When you click `-`, the item's quantity decreases by 1
  - When you click `+`, the item's quantity increases by 1
- Add a hover effect over a `<tr>` line item
- When you click on an item (`<tr>`), cross it out, i.e. ~~strikethrough~~

### Credit

Inspired by Grocery Bud from [javascript-basic-projects](https://github.com/john-smilga/javascript-basic-projects/tree/master/14-grocery-bud) by John Smilga
