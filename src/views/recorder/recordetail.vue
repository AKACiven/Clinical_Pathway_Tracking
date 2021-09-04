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
        <el-input v-model="form.doctor" />
      </el-form-item>
      <el-form-item label="患者" style="width: 40%;">
        <el-input v-model="form.patient" />
      </el-form-item>
      <el-form-item label="科室">
        <el-input v-model="form.department" style="width: 40%;">
        </el-input>
      </el-form-item>
      <el-form-item label="记录时间">
        <el-date-picker
          v-model="form.datetime"
          type="datetime"
          style="width: 40%;"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="处方">
        <el-input v-model="form.prescription" autocomplete="on" autosize type="textarea" />
      </el-form-item>
      <el-form-item label="治疗意见">
        <el-input v-model="form.opinion"  autosize type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmit">提交</el-button>
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
        // 首先患者挂号，挂号同时提交一个表单，后端返回record的id给paeient作为凭据，挂号行为写入presription，record从这里开始记录
        // 医生使用患者提供的record的id，分多次提交表单（比如验血时提交一个，输液时提交另一个，最后开药时再提交一个），直至完成整个过程
        // 医生在完成整个过程后提交docfirm：‘true’，患者提交patfirm：‘true’，整个record记录结束
        // 这里比较复杂的就是患者查看自己的record这方面的权限问题，还有医生需不需要查看患者历史record，以及医生查看自己提交过的record
      }
    }
  },
  created() {
    if (!this.$route.query.ID) {
      this.$alert('请先在记录表点击操作按钮！', '提示', {
        confirmButtonText: '前往记录表',
        callback: action => {
          this.$router.push({
            path: '/Record/All'
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
      this.form.docfirm = 'true'
      this.form.patfirm = 'false'
      this.$refs.form.validate(valid => {
        if (valid) {
          submittee(this.form).then(() => {
            this.$alert('提交成功！', '消息', {
              confirmButtonText: '确认',
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
    }
  }
}
</script>

<style scoped>

</style>

