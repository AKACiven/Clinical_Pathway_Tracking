<template>
<!--  <div class="app-container">-->
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <div class="info-container">
        <span class="display_name">欢迎 {{ name }} 使用本系统</span>
      </div>
    </div>
    <div>
      <img :src="emptyGif" class="emptyGif">
    </div>
<!--    <el-row>-->
<!--      <a class="document-btn" @click="patRegister" >患者挂号</a>-->
<!--    </el-row>-->
    <el-row>
      <el-button :loading="loading" v-if="roles == 'patient'" type="primary" style="width:100%;margin-bottom:30px;" @click="patRegister">患者挂号页面</el-button>
      <el-button :loading="loading" v-if="roles == 'doctor'" type="success" style="width:100%;margin-bottom:30px;" @click="departmentcheck">医生操作页面</el-button>
      <el-button :loading="loading" v-if="roles == 'admin'" type="danger" style="width:100%;margin-bottom:30px;" @click="adminwork">管理员页面</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
      disability: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
  },
  methods: {
    patRegister() {
      this.$router.push({
        path: '/Registration/Action'
      })
    },
    departmentcheck() {
      this.$router.push({
        path: '/Record/Department'
      })
    },
    adminwork() {
      this.$router.push({
        path: '/Adminedit/Index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.document-btn {
  flex-shrink: 0;
  display: block;
  cursor: pointer;
  background: #409eff;
  color: #ffffff;
  height: 60px;
  padding: 0 16px;
  margin: 16px;
  line-height: 60px;
  font-size: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
}
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}
.document-btn {
  width: available;
}
.dashboard-editor-container {
  background-color: #e3e3e3;
  //background-color: #ffffff;
  min-height: 100vh;
  padding: 50px 60px 0px;
  .info-container {
    position: relative;
    margin-left: 50px;
    height: 50px;
    line-height: 100px;
    .display_name {
      font-size: 48px;
      line-height: 0px;
      color: #212121;
      position: absolute;
      top: 0px;
    }
  }
}
</style>
