<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list.filter(data => !search || data.stage.toLowerCase().includes(search.toLowerCase()))"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="阶段" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.stage }}
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
          <el-button @click="edit(scope.row)" type="primary" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { getPath } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '已完成': 'primary',
        '正在进行': 'success',
        '准备进行': 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      search: '',
      id: ''
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
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPath({ id: this.$route.query.id }).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    edit(row) {
      this.$router.push({
        path: '/Path/Scan',
        query: {
          id: this.$route.query.id,
          where: row.where
        }
      })
    }
  }
}
</script>
