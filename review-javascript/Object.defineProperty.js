// 'use strict'
const object = {};

// Object.defineProperty(obj, prop, descriptor)
Object.defineProperty(object, 'name', {
  value: 42,
  writable: false,
})

object.name = 'jiaheng'; // 不生效,严格模式下报错
console.log(object.name)

Object.defineProperty(object, 'age', {
  enumerable: true,
  configurable: true,
  get: function() {
    return 3;
  },
  set: function(newval) {
    console.log('set val')
  }
})
object.age = 18;


console.log(object.age)