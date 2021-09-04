<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="用户账号">
        <el-input v-model="form.username" style="width: 30%;" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.password"
          placeholder="不少于6个字母"
          auto-complete="on"
          style="width: 30%;"
        />
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="form.birthdatetime"
          type="date"
          style="width: 40%;"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-radio-group v-model="form.role">
          <el-radio :label="'admin'">管理员</el-radio>
          <el-radio :label="'doctor'">医生</el-radio>
          <el-radio :label="'patient'">患者</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio :label="'Male'">男</el-radio>
          <el-radio :label="'Female'">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onmod">修改</el-button>
        <el-button @click="useradd">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { adminadd, adminmod, getUserinfo } from '@/api/user'

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        birthdatetime: '',
        role: '',
        gender: ''
      }
    }
  },
  created() {
    if (this.$route.query.username) {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      getUserinfo({ username: this.$route.query.username }).then(response => {
        this.form = response.data
        this.form.username = this.$route.query.username
      })
    },
    useradd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          adminadd(this.form).then(() => {
            this.$alert('用户 ' + this.form.username + ' 添加成功！', '消息', {
              confirmButtonText: '确认',
              callback: action => {
                window.location.reload()
              }
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onmod() {
      this.$refs.form.validate(valid => {
        if (valid) {
          adminmod(this.form).then(() => {
            this.$alert('用户 ' + this.form.username + ' 修改成功！', '消息', {
              confirmButtonText: '确认',
              callback: action => {
                window.location.reload()
              }
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>

