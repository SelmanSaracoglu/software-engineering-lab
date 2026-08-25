// UNION TYPES
//
// A union type allows a value to have
// more than one possible type.
//
// The | symbol means "or".

let orderId: string | number;

orderId = "101";
console.log(orderId);
// 101

orderId = 101;
console.log(orderId);
// 101


// This would be invalid:
//
// orderId = true;
//
// boolean is not allowed because the type is:
//
// string | number


// Union types can also be used with function parameters.

function printOrderId(id: string | number) {
  console.log(id);
}

printOrderId("101");
printOrderId(101);


// id: string | number
//
// id
// -> parameter name
//
// string | number
// -> parameter type
//
// | means:
//
// string OR number