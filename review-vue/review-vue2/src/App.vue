<template>
  <div id="app">
    {{  name  }} - {{ testArr[0] }} - {{ testObj.gender }} - {{ testArr[2].arr[1] }}
    <button @click="handleClick">点击改数据</button>
    <!-- <text-content /> -->
  </div>
</template>

<script>
// import TextContent from './view/content.vue';

export default {
  components: {
    // TextContent,
  },
  data() {
    return {
      name: '林嘉恒',
      testArr: ['sso-map', 'smartsortingoperation', { arr: [1,2,3]}],
      // age: 22,
      testObj: {
        gender: '男',
        // projects: ['sso-map', 'smartsortingoperation']
      }
    }
  },
  computed: {
    // projectsMap() {
    //   return this.testObj.projects.map(key => ({
    //     name: key,
    //     person: 'linjiaheng',
    //   }))
    // }
  },
  created() {
    console.log(this.$data)

    setTimeout(() => {
      // this.testArr[0] = 'dddddtest' // 不会触发更新
      this.$set(this.testArr, '0', 'ddddd2222') // 可以触发更新
      // this.name = 'xielin'
      // this.testArr[2].arr[1] = 'dddjiaheng'
      console.log('setTimeout')
    }, 1000)
  },
  methods: {
    handleClick() {
      this.name = 'hhhh'
      this.testArr[0] = 'sso-map-sdk'
    }
  }
}
</script>

<style lang="less">
#app {
  color: red;
}
</style>