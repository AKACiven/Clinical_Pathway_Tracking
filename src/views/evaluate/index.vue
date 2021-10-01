<template>
  <div class="app-container">
    <el-form label-width="90px">
      <el-form-item label="阶段">
        <el-tag :type="success">{{ stage }}</el-tag>
      </el-form-item>
      <el-form-item label="时间进度">
        <el-radio-group v-model="sub.proce">
          <el-radio :label="0">继续本阶段</el-radio>
          <el-radio :label="1">进入下一阶段</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="总体结果">
        <el-radio-group v-model="sub.result">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">变异</el-radio>
          <el-radio :label="2">提前完成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="sub.result === 1" label="变异原因">
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
  data() {
    return {
      sub: {
        proce: null,
        result: null,
        ground: ''
      },
      stage: ''
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
        this.stage = response.data.stage
      })
    },
    submit() {
      eValuate(this.sub).then(() => {
        this.$alert('提交成功！', '消息', {
          confirmButtonText: '确认',
          callback: action => {
            // window.location.reload()
          }
        })
      })
    }
  }
}
</script>
