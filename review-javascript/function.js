const isDef = v => v !== undefined;

const testData = {
  test: {
    data: {
      registerRouteInstance: {
        name: 'linjiaheng'
      }
    },
  },
  data: 3,
}

const test = (vm, callVal) => {
  let i = vm.test
  if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
    console.log(i, i.data)
  }
}

test(testData)