// const obj = {
//   '2': 'integer: 2',
//   'foo': 'string: foo',
//   '01': 'string: 01',
//   1: 'integer: 1',
//   [Symbol('first')]: 'symbol: first',
//   '-1': 'jiaheng'
// };

// obj['0'] = '0';
// obj[Symbol('last')] = 'symbol: last';
// obj['veryLast'] = 'string: very last';

// console.log('内部ownPropertyKeys', Reflect.ownKeys(obj));
// console.log('Object.keys', Object.keys(obj));


var obj2 = {
  city: "Beijing",
  12: 12,
  7: 7,
  0: 0,
  "-2": -2,
  "age": 15,
  "-3.5": -3.5,
  7.7: 7.7,
  _: "___",
  online: true,
  3: 3,
  "23": "23",
  "44": 44
}
console.log('Object.keys', Object.keys(obj2));
console.log('内部ownPropertyKeys', Reflect.ownKeys(obj2));

for(let key in obj2) {
  console.log(key)
}

