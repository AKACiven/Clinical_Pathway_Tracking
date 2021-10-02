<template>
  <div class="app-container">
    <el-form v-if="ground !== ''" label-width="90px">
      <el-form-item label="变异原因">
        <el-input
          type="textarea"
          autosize
          v-model="ground">
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getOut } from '@/api/table'

export default {
  data() {
    return {
      ground: ''
    }
  },
  created() {
    if (!this.$route.query.id) {
      this.$alert('请先在患者列表进行操作！', '提示', {
        confirmButtonText: '前往患者列表',
        callback: action => {
          this.$router.push({
            path: '/Home'
          })
        }
      })
    } else {
      this.fetchOut()
    }
  },
  methods: {
    fetchOut() {
      getOut({ id: this.$route.query.id }).then(response => {
        this.ground = response.data.ground
      })
    }
  }
}
</script>
