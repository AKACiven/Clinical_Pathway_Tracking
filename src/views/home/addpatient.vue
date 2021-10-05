<template>
  <div class="app-container">
    <el-form label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输患者姓名"></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="form.id" readonlys></el-input>
      </el-form-item>
      <el-form-item label="床位">
        <el-input v-model="form.bed" readonly></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="small" @click="addname" >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { addPat, addPatName } from '@/api/table'

export default {
  data() {
    return {
      form: {
        id: null,
        bed: null,
        name: ''
      }
    }
  },
  created() {
    this.fetchOut()
  },
  methods: {
    fetchOut() {
      addPat().then(response => {
        this.form.id = response.data.id
        this.form.bed = response.data.bed
      })
    },
    addname() {
      addPatName(this.form).then(() => {
        this.$alert('患者添加成功！', '消息', {
          confirmButtonText: '确认',
          callback: action => {
            this.$router.push({
              path: '/Home'
            })
          }
        })
      })
    }
  }
}
</script>
