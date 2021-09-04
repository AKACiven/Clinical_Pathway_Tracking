<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="状态">
        <el-tag :type="form.status | statusFilter">{{ form.status }}</el-tag>
      </el-form-item>
      <el-form-item label="编号" style="width: 40%;">
        <el-input v-model="form.ID" readonly/>
      </el-form-item>
      <el-form-item label="主治医师" style="width: 40%;">
        <el-input v-model="form.doctor" readonly/>
      </el-form-item>
      <el-form-item label="患者" style="width: 40%;">
        <el-input v-model="form.patient" readonly/>
      </el-form-item>
      <el-form-item label="科室" style="width: 40%;">
        <el-input v-model="form.department" readonly/>
      </el-form-item>
      <el-form-item label="记录时间">
        <el-date-picker
          v-model="form.datetime"
          type="datetime"
          style="width: 40%;"
          readonly
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="处方">
        <el-input v-model="form.prescription" readonly autosize type="textarea" />
      </el-form-item>
      <el-form-item label="治疗意见">
        <el-input v-model="form.opinion" readonly autosize type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmit">确认以上信息正确</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { recordtail, submittee } from '@/api/record'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '处方结束': 'success',
        '等待确认': 'gray',
        '处理中': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      form: {
        id: '',
        ID: '',
        doctor: '',
        patient: '',
        department: '', // 科室
        datetime: '',
        prescript: '',
        opinion: '',
        docfirm: '', // 医生确认记录结束
        patfirm: '', // 患者认可record的记录
        status: '' // 表示当前是否完成整个医疗过程。
      }
    }
  },
  created() {
    if (!this.$route.query.ID) {
      this.$alert('请先在记录表点击操作按钮！', '提示', {
        confirmButtonText: '前往记录表',
        callback: action => {
          this.$router.push({
            path: '/record/patient'
          })
        }
      })
    } else {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      recordtail({ ID: this.$route.query.ID }).then(response => {
        this.form = response.data
        this.form.ID = this.$route.query.ID
      })
    },
    onSubmit() {
      this.form.patfirm = 'true'
      this.form.status = '处方结束'
      this.$refs.form.validate(valid => {
        if (valid) {
          submittee(this.form).then(() => {
            this.$alert('确认成功！', '消息', {
              confirmButtonText: '返回',
              callback: action => {
                window.location.reload()
              }
            })
          })
        } else {
          this.$alert('提交失败！', '消息', {
            confirmButtonText: '返回',
            callback: action => {
              window.location.reload()
            }
          })
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style scoped>

</style>

