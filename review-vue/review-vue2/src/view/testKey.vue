<template>
  <div id="test-key">
    <div class="box">
      <div class="item">
        <h3>没有 key</h3>
        <p v-for="(item, index) in list">{{ item }}</p>
      </div>
      <div class="item">
        <h3>key 为 index</h3>
        <p v-for="(item, index) in list" :key="index">{{ item }}</p>
      </div>
      <div class="item">
        <h3>key 唯一</h3>
        <p v-for="(item, index) in list" :key="item">{{ item }}</p>
      </div>
    </div>
    <button @click="click1">push(4)</button>
    <button @click="click2">splice(1, 0, 666)</button>
    <button @click="click3">unshift(999)</button>
    <br /><br />
    <button @click="click4">pop()</button>
    <button @click="click5">splice(1, 1)</button>
    <button @click="click6">shift()</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      list: [1, 2, 3],
    }
  },
  methods: {
    click1() {
      this.list.push(4);
    },
    click2() {
      this.list.splice(1, 0, 666);
    },
    click3() {
      this.list.unshift(999);
    },
    click4() {
      this.list.pop();
    },
    click5() {
      this.list.splice(1, 1);
    },
    click6() {
      this.list.shift();
    }
  },
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: row;
}
.item {
  flex: 1;
}
</style>