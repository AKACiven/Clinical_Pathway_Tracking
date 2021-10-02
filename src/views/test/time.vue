<template>
  <div class="app-container">
    {{date}}
    {{fulltime}}
  </div>
<!--  <el-form label-width="20px">-->
<!--    <el-form-item label="">-->

<!--    </el-form-item>-->
<!--  </el-form>-->
</template>

<script>
export default {
  data() {
    return {
      date: null,
      fulltime: new Date()
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.fulltime = new Date()
      var d = new Date()
      var year = d.getFullYear()
      var month = d.getMonth() + 1
      var day = d.getDate()
      this.date = year + '-' + month + '-' + day
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>
