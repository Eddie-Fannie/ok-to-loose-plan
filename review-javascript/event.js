const btn1 = document.getElementById('button1')
const btn2 = document.getElementById('button2')

btn1.addEventListener('click', () => {
  console.log('冒泡')
})

btn1.addEventListener('click', () => {
  console.log('捕获')
}, true)