
// map() transforms a collection.
const prices = [25, 40, 15, 80];

// Transform each item and return a new array.
// map() rebuilds the array.
const pricesWithTax = prices.map(price => {
    return price * 1.2;
});

console.log(prices);
console.log(pricesWithTax);

