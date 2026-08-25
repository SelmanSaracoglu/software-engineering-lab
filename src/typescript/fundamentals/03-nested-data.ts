// NESTED DATA
//
// Objects and arrays can contain other objects and arrays.
//
// In the OrderDetailDialog test, an order contains an items array.
// Each element inside that array is another object.

const orderDetail = {
  id: 101,
  customerName: "New Customer",
  total: 85,
  items: [
    {
      id: 1,
      description: "Black Dress",
      quantity: 2,
      unitPrice: 42.5
    },
    {
      id: 2,
      description: "White Shirt",
      quantity: 1,
      unitPrice: 30
    }
  ]
};


// Start with the outer object.

console.log(orderDetail.id);
// 101

console.log(orderDetail.customerName);
// New Customer


// The items property contains an array.

console.log(orderDetail.items);


// Accessing an array index may return undefined.
//
// TypeScript does not assume that items[0] exists,
// so first retrieve the value and check it.

const firstItem = orderDetail.items[0];

if (firstItem) {
  console.log(firstItem.description);
  // Black Dress

  console.log(firstItem.quantity);
  // 2

  console.log(firstItem.unitPrice);
  // 42.5
}


const secondItem = orderDetail.items[1];

if (secondItem) {
  console.log(secondItem.description);
  // White Shirt

  console.log(secondItem.unitPrice);
  // 30
}


// Conceptually:
//
// orderDetail.items[0].description
//
// means:
//
// get the items array
// -> get its first item
// -> read that item's description
//
// With strict indexed access, we check that the item exists
// before accessing its properties.