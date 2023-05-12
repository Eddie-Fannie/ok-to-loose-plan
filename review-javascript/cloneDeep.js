var test = {
  name: 'linjiaheng',
  age: 22,
}
test.test = test;
const objSymbol = Symbol('test')

let obj1 = {
  a: {
    b: 1,
  },
  c: 2,
  d: 3,
  e: test, // 循环引用
  f: test,
}
obj1[objSymbol] = 'symbol'

let obj2 = { ...obj1 } // 浅拷贝

function isObject(obj) { // 用来判断对象
  return typeof obj === 'object' && obj !== null;
}

function cloneDeep(obj, hash = new Map()) { // new Map用来记录处理过的 能解决循环引用及引用丢失情况
  if (!isObject(obj)) return obj;
  // 查询hash
  if (hash.has(obj)) return hash.get(obj)

  let result = Array.isArray(obj) ? [] : {}
  hash.set(obj, result)

  // ============= 新增代码
  let symKeys = Object.getOwnPropertySymbols(obj); // 查找
  if (symKeys.length) { // 查找成功
    symKeys.forEach(symKey => {
      if (isObject(obj[symKey])) {
        result[symKey] = cloneDeep(obj[symKey], hash);
      } else {
        result[symKey] = obj[symKey];
      }
    });
  }

  Object.keys(obj).forEach(key => { // Object.keys只会拿到可枚举的属性，symbol也拿不到
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!isObject(obj[key])) {
        // 基本数据类型
        result[key] = obj[key]
      } else {
        // 对象
        result[key] = cloneDeep(obj[key], hash)
      }
    }
  })
  return result;
}
const obj3 = cloneDeep(obj1)
obj3.a.b = 3;
obj2.a.b = 'jiaheng'
console.log(obj1, obj2, obj3)
// console.log(obj1.e === obj1.f)
// console.log(obj2.e === obj2.f)

function cloneDeep5(x) {
  const root = {};

  // 栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    }
  ];

  while(loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    for(let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}