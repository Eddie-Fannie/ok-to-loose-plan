// // 'use strict'
// const object = {};

// // Object.defineProperty(obj, prop, descriptor)
// Object.defineProperty(object, 'name', {
//   value: 42,
//   writable: false,
// })

// object.name = 'jiaheng'; // 不生效,严格模式下报错
// console.log(object.name)

// Object.defineProperty(object, 'age', {
//   enumerable: true,
//   configurable: true,
//   get: function() {
//     return 3;
//   },
//   set: function(newval) {
//     console.log('set val')
//   }
// })
// object.age = 18;


// console.log(object.age)

const testArray = [1,2,3]

for (let i = 0, l = testArray.length; i < l; i++) {
  Object.defineProperty(testArray, testArray[i], {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('ddd test arr')
    },
    set: function(val) {
      console.log(val, '设置')
    }
  })
}

testArray[1] = 2