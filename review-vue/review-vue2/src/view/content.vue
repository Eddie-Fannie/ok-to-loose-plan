<template>
  <div id="content">
    {{ project.title }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {
        title: 'SPX'
      }
    }
  },
  created() {
    console.log(this.$data, 'content')
  }
}
</script>

<style>

</style>