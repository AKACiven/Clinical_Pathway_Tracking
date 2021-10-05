<template>
  <div class="app-container">
    <el-button type="primary" size="small" @click="addname" >提交</el-button>
<!--    {{date}}-->
<!--    {{fulltime}}-->
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
  },
  methods: {
    addname() {
      this.$router.push({
        path: '/Home',
        query: {
          switch: 1
        }
      })
    }
  }
}
</script>
