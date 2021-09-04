<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list.filter(data => !search || data.patient.toLowerCase().includes(search.toLowerCase())
      || data.status.toLowerCase().includes(search.toLowerCase())
      || data.ID.toLowerCase().includes(search.toLowerCase())
      || data.bed.toLowerCase().includes(search.toLowerCase()))"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :default-sort = "{prop: 'bed', order: 'descending'}"
    >
      <el-table-column label="ID" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.ID }}
        </template>
      </el-table-column>
      <el-table-column label="患者" width="200" prop="patient" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.patient }}</span>
        </template>
      </el-table-column>
      <el-table-column label="床位" width="200" prop="department" align="center">
        <template slot-scope="scope">
          {{ scope.row.bed }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" prop="status" width="300" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="300">
        <template slot="header" slot-scope="scope" >
          <el-input
            v-model="search"
            size="mini"
            placeholder="搜索信息"/>
        </template>
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="danger" size="small">诊断</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '正常结束': 'success',
        '执行中': 'primary',
        '变异': 'danger',
        '不符合': 'warning'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      search: ''
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
    edit(row) {
      this.$router.push({
        path: '/Record/Recordetail',
        query: {
          ID: row.ID
        }
      })
    }
  }
}
</script>
