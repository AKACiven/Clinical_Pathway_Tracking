<template>
  <div class="app-container">
    <el-backtop></el-backtop>
    <el-table
      v-loading="listLoading"
      :data="list.filter(data => !search || data.patient.toLowerCase().includes(search.toLowerCase())
      || data.doctor.toLowerCase().includes(search.toLowerCase())
      || data.status.toLowerCase().includes(search.toLowerCase())
      || data.department.toLowerCase().includes(search.toLowerCase())
      || data.prescription.toLowerCase().includes(search.toLowerCase())
      || data.datetime.toLowerCase().includes(search.toLowerCase()))"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :default-sort = "{prop: 'datetime', order: 'descending'}"
    >
      <el-table-column label="ID" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.ID }}
        </template>
      </el-table-column>
      <el-table-column label="部门" width="110" prop="department" align="center">
        <template slot-scope="scope">
          {{ scope.row.department }}
        </template>
      </el-table-column>
      <el-table-column label="处方内容" prop="prescription" align="center">
        <template slot-scope="scope">
          {{ scope.row.prescription }}
        </template>
      </el-table-column>
      <el-table-column label="患者" width="110" prop="patient" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.patient }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医生" width="110" prop="doctor" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.doctor }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" prop="status" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="datetime" sortable label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.datetime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="200">
        <template slot="header" slot-scope="scope" >
          <el-input
            v-model="search"
            size="mini"
            placeholder="搜索信息"/>
        </template>
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleterow(scope.row)" type="text" size="small">删除</el-button>
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
    deleterow(row) {
      recordel(row.ID).then(() => {
        this.$alert('确认删除？', '警告', {
          confirmButtonText: '确认',
          callback: action => {
            window.location.reload()
          }
        })
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
