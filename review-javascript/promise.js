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

  main3()