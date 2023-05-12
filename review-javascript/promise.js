// 对同一个promise对象调用`then`方法
// let aPromise = new Promise((resolve, reject) => {
//     console.log('test')
//     resolve(100)
// });
// aPromise.then(function(value) {
//     return value * 2;
// })
// aPromise.then(function(value) {
//     return value * 2;
// })
// aPromise.then(function(value) {
//     console.log('1:', value); // 100
// })

// 通过回调方式来进行多个异步调用
function getURLCallback(URL, callback) {
    let req = new XMLHttpRequest()
    req.open('GET', URL, true);
    req.onload = function() {
        if (req.status === 200) {
            callback(null, req.responseText)
        } else {
            callback(new Error(req.statusText), req.response)
        }
    }
    req.onerror = function() {
        callback(new Error(req.statusText))
    }
    req.send()
}
// <1> 对JSON数据进行安全的解析
function jsonParse(callback, error, value) {
    if (error) {
        callback(error, value);
    } else {
        try {
            let result = JSON.parse(value);
            callback(null, result);
        } catch (e) {
            callback(e, value);
        }
    }
}
// <2> 发送XHR请求
let request = {
    comment: function getComment(callback) {
        return getURLCallback('http://azu.github.io/promises-book/json/comment.json', jsonParse.bind(null, callback));
    },
    people: function getPeople(callback) {
        return getURLCallback('http://azu.github.io/promises-book/json/people.json', jsonParse.bind(null, callback));
    }
};
// <3> 启动多个XHR请求，当所有请求返回时调用callback
function allRequest(requests, callback, results) {
    if (requests.length === 0) {
        return callback(null, results);
    }
    let req = requests.shift();
    req(function (error, value) {
        if (error) {
            callback(error, value);
        } else {
            results.push(value);
            allRequest(requests, callback, results);
        }
    });
}
function main(callback) {
    allRequest([request.comment, request.people], callback, []);
}
// 运行的例子
// main(function(error, results){
//     if(error){
//         return console.error(error);
//     }
//     console.log(results);
// });

const promise1 = new Promise((resolve, reject) => {
    try {
        setTimeout(() => {
            resolve('promise1')
        }, 200)
    } catch (e) {
        reject(e)
    }
})

const promise2 = new Promise((resolve, reject) => {
    try {
        setTimeout(() => {
            resolve('promise2')
        }, 1000)
    } catch (e) {
        reject(e)
    }
})

// promise1.then(res => console.log(res))
// Promise.all([promise1, promise2]).then((res) => console.log(res));

// 用一个计时器来计算一个程序执行时间，可以知道传递给Promise.all的promise数组同时执行
// delay 毫秒后执行 resolve

function timerPromisefy(delay) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(delay);
        }, delay);
    });
}
let startDate = Date.now();
// console.log(startDate, '开始时间')
// 所有promise变为resolve后程序退出
// Promise.all([
//     timerPromisefy(1),
//     timerPromisefy(32),
//     timerPromisefy(64),
//     timerPromisefy(128)
// ]).then(function (values) {
//     console.log(Date.now() - startDate + 'ms'); // 不固定比128ms多
//     // 約128ms
//     console.log(values);    // [1,32,64,128]
// });
// 如果这些promise全部串行处理的话，那么需要 等待1ms → 等待32ms → 等待64ms → 等待128ms ，全部执行完毕需要225ms的时间。

// Promise.race([
//     timerPromisefy(1),
//     timerPromisefy(32),
//     timerPromisefy(64),
//     timerPromisefy(128)
// ]).then(function (values) {
//     console.log(Date.now() - startDate + 'ms'); // 不固定 比128ms少
//     // 約128ms
//     console.log(values);    // 1
// });


// let winnerPromise = new Promise(function (resolve) {
//     setTimeout(function () {
//         console.log('this is winner');
//         resolve('this is winner');
//     }, 4);
// });
// let loserPromise = new Promise(function (resolve) {
//     setTimeout(function () {
//         console.log('this is loser console.log');
//         resolve('this is loser');
//     }, 1000);
// });
// // 第一个promise变为resolve后程序停止
// Promise.race([winnerPromise, loserPromise]).then(function (value) {
//     console.log(value);    // => 'this is winner'
// });

function throwError(value) {
    // 抛出异常
    throw new Error(value);
}
// <1> onRejected不会被调用
function badMain(onRejected) {
    return Promise.resolve(42).then(throwError, onRejected);
}
// <2> 有异常发生时onRejected会被调用
function goodMain(onRejected) {
    return Promise.resolve(42).then(throwError).catch(onRejected);
}
// promise有错误
function normalMain(onRejected) {
    return new Promise((resolve, reject) => {
        throwError()
    }).then(undefined, onRejected)
}

// 运行示例
// badMain(function(){
//     console.log("BAD");
// });
// goodMain(function(){
//     console.log("GOOD");
// });
// normalMain(function() {
//     console.log('NORMAL')
// })

// if (typeof Promise.prototype.done === "undefined") {
    Promise.prototype.done = function (onFulfilled, onRejected) {
        this.then(onFulfilled, onRejected).catch(function (error) {
            setTimeout(function () {
                console.log('test done')
                throw error;
            }, 0);
        });
    };
// }

const promiseDone = new Promise((resolve, reject) => {
    resolve('linjiaheng')
})

// promiseDone.then(res => {
//     console.log(res)
//     return Promise.resolve(22);
// }).done(function(age) {
//     console.log(age2) // 报错了age2 is not defined
// }, function() {
//     console.log(engineer)
// })

// try {
//     promiseDone.then(res => {
//         console.log(res)
//         return Promise.resolve(22);
//     }).done(function(age) {
//         console.log(age2) // 报错了age2 is not defined
//     }, function() {
//         console.log(engineer)
//     })
// } catch (e) {
//     console.log(e)
// }

// try{
//     setTimeout(function callback() {
//         throw new Error("error");
//     }, 0); // 不可以捕获到
//     // console.log(age) // 可以捕获
// }catch(error){
//     console.log(error);
// }

// function main1() {
//     try {
//       new Promise(() => {
//         throw new Error('promise1 error')
//       })
//     } catch(e) {
//       console.log(e.message);
//     }
//   }
  
//   function main2() {
//     try {
//       Promise.reject('promise2 error');
//     } catch(e) {
//       console.log(e.message);
//     }
//   }
  
// main1()
// main2()

function main3() {
    Promise.resolve(true).then(() => {
    //   try {
        throw new Error('then');
    //   } catch(e) {
    //     return e;
    //   }
    }).catch(e => console.log(e.message));
  }

//   main3()

// async function async1 () {
//     await new Promise((resolve, reject) => {
//         resolve()
//     })
//     console.log('A')
// }

// async1()

// new Promise((resolve) => {
//     console.log('B')
//     resolve()
// }).then(() => {
//     console.log('C')
// }).then(() => {
//     console.log('D')
// })

// 最终结果👉: B A C D

// async function async1 () {
//     await async2()
//     console.log('A')
// }

// async function async2 () {
//     return new Promise((resolve, reject) => {
//         resolve()
//     })
// }

// async1()

// new Promise((resolve) => {
//     console.log('B')
//     resolve()
// }).then(() => {
//     console.log('C')
// }).then(() => {
//     console.log('D')
// })
// 最终结果👉: B C D A

// async function testB () {
//     return {
//         then (cb) {
//             cb();
//         }
//     };
// }

// testB().then(() => console.log(1));
// Promise.resolve()
//     .then(() => console.log(2))
//     .then(() => console.log(3));

// (等待一个then)最终结果👉: 2 1 3

// async function testC () {
//     return new Promise((resolve, reject) => {
//         resolve()
//     })
// }

// testC().then(() => console.log(1));
// Promise.resolve()
//     .then(() => console.log(2))
//     .then(() => console.log(3));
    
// (等待两个then)最终结果👉: 2 3 1

// const testAsync = async function() {
//     console.log(22)
//     return Promise.resolve(2)
// }
// testAsync().then(res => console.log(res))

// function func () {
//     console.log(2);
// }

// async function test () {
//     console.log(1);
//     await func();
//     console.log(3);
// }

// test();
// console.log(4);

// 最终结果👉: 1 2 4 3


// Promise.resolve().then(() => {
//     console.log(0);
  
//     return new Promise(resolve => {
//       resolve(4)
//     })
//     // 新增一个 then  
//     .then(res => {
//       console.log('新增的 then 执行啦！')
//       return res
//     })
//   }).then(res => {
//     console.log(res)
//   })

const promise1 = new Promise((resolve, reject) => {
    try {
        setTimeout(() => {
            console.log('test')
            resolve('success')
        }, 1000)
    } catch (e) {
        console.error('输出错误')
        reject('错误')
    }
})

const testFun = () => {
    console.log('面试')
}


promise1.retry = function(fn, times, delay) {
    let count = times;
    let timer;
    return new Promise((resolve, reject) => {
      if (times) {
        timer = setInterval(() => {
          count--
          fn()
          resolve('成功')
        }, delay)
      } else if (count === 0){
        console.log('结束了')
        resolve('重试完成')
        timer && clearInterval(timer)
      }
    })
  }

  promise1.retry(testFun, 3, 2000)