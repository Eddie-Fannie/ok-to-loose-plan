const createRequest = (num, time) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(num)
      }, time)
    } catch (e) {
      console.error('request error', e)
      reject(e)
    }
  })
}

const createTaskList = (count) => {
  let promiseList = []
  for (let i = 0; i < count; i++) {
    // const p1 = createRequest(Math.floor(Math.random() * i), Math.floor(Math.random() * i * 100))
    promiseList.push(createRequest.bind(this, Math.floor(Math.random() * i), Math.floor(Math.random() * i * 100)))
  }
  return promiseList;
}

const tasks = createTaskList(20);
console.log(tasks, '所有任务')
function paralleTask(tasks, limit = 4) {
  return new Promise((resolve, reject) => {
    if (tasks.length === 0) {
      resolve()
      return;
    }
    let nextIndex = 0;
    let succeedCount = 0;
    function _run() {
      const task = tasks[nextIndex]
      nextIndex++
      task().then(res => {
        console.log(res, 'res')
        // 运行下一个
        succeedCount++
        if (nextIndex < tasks.length) {
          _run()
        } else if (succeedCount === tasks.length) {
          resolve('成功')
        }
      })
    }
    for (let i = 0; i<limit && i < tasks.length;i++) {
      _run()
    }
  })
}
paralleTask(tasks, 4).then(res => {
  console.log(res)
})
