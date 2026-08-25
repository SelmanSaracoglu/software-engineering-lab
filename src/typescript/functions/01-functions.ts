// A function is a reusable block of behavior.

function calculateTax(price: number) {
  return price * 1.2;
}

const result = calculateTax(100);

console.log(result);

const numbers = [10, 20, 30];

function doubleNumber(number: number) {
    return number * 2;
}

const doubledNumbers = numbers.map(doubleNumber);

console.log(doubledNumbers);