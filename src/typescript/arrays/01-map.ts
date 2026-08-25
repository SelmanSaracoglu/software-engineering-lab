// MAP()
//
// map() transforms every item in an array and creates a new array from the returned values.

const prices = [25, 40, 15, 80];


// map() receives a callback function.
//
// price -> callback parameter
// The value of price is provided by map().
// map() takes each array item one by one and passes it to the callback.

const pricesWithTax = prices.map((price) => {
  return price * 1.2;
});

console.log(prices);
// [25, 40, 15, 80]

console.log(pricesWithTax);
// [30, 48, 18, 96]


// Conceptually, map() does something like:
// callback(25)
// callback(40)
// callback(15)
// callback(80)
//
// Each callback call returns a new value:
// 25 -> 30
// 40 -> 48
// 15 -> 18
// 80 -> 96
//
// map() collects those returned values into a new array.


// The callback could also be written as a separately named function.

function addTax(price: number): number {
  return price * 1.2;
}

const pricesWithTaxAgain = prices.map(addTax);

console.log(pricesWithTaxAgain);  // [30, 48, 18, 96]

// These two forms use the same callback idea:
//
// prices.map(addTax);
//
// prices.map((price) => {
//   return price * 1.2;
// });
//
// The second form is useful when the function is only needed in this map() call.