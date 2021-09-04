<template>
  <div class="app-container">
    <el-backtop></el-backtop>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.ID }}
        </template>
      </el-table-column>
      <el-table-column label="科室" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.department }}
        </template>
      </el-table-column>
      <el-table-column label="患者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.patient }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医生" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.doctor }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="受理时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.datetime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="110">
        <template slot-scope="scope">
          <el-button @click="deleterow(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, recordel } from '@/api/table'

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
      list: null,
      listLoading: true,
      deldata: {
        row: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.form
        this.listLoading = false
      })
    },
    deleterow(row) {
      recordel(row.ID).then(() => {
        this.$alert('确认删除？', '警告', {
          confirmButtonText: '确认',
          callback: action => {
            window.location.reload()
          }
        })
      })
    }
  }
}
</script>
