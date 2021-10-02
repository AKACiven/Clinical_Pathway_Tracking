<template>
  <div class="app-container">
    <el-form label-width="90px">
      <el-form-item label="阶段">
        <el-tag :type="success">{{ stage | statusFilter}}</el-tag>
      </el-form-item>
      <el-form-item label="时间进度">
        <el-radio-group v-model="sub.proce">
          <el-radio :label="0">继续本阶段</el-radio>
          <el-radio v-if="stage !== 3" :label="1">进入下一阶段</el-radio>
          <el-radio :label="2">变异</el-radio>
          <el-radio :label="3">完成路径</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="sub.proce === 2" label="变异原因">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入变异原因"
          v-model="sub.ground">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="submit">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { eValuate } from '@/api/record'
import { getProcess } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '0': '阶段1',
        '1': '阶段2',
        '2': '阶段3',
        '3': '阶段4'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      sub: {
        proce: null,
        ground: '',
        stage: '',
        date: null,
        time: null,
        id: null
      },
      stage: '',
      fulltime: new Date()
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.fulltime = new Date()
      var d = new Date()
      var year = d.getFullYear()
      // var month = d.getMonth() + 1
      var month = ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
      var day = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate())
      var hour = (d.getHours() < 10 ? '0' + (d.getHours()) : d.getHours())
      var minute = (d.getMinutes() < 10 ? '0' + (d.getMinutes()) : d.getMinutes())
      var second = (d.getSeconds() < 10 ? '0' + (d.getSeconds()) : d.getSeconds())
      this.sub.date = year + '-' + month + '-' + day
      this.sub.time = hour + ':' + minute + ':' + second
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  created() {
    if (!this.$route.query.id) {
      this.$alert('请先在患者进行操作！', '提示', {
        confirmButtonText: '前往患者界面',
        callback: action => {
          this.$router.push({
            path: '/Home'
          })
        }
      })
    } else {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      getProcess({ id: this.$route.query.id }).then(response => {
        this.stage = response.data.process
      })
    },
    submit() {
      this.sub.stage = this.stage
      this.sub.id = this.$route.query.id
      eValuate(this.sub).then(() => {
        this.$alert('提交成功！', '消息', {
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
