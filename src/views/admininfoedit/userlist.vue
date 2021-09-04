<template>
  <div class="app-container">
    <el-backtop></el-backtop>
    <el-table
      v-loading="listLoading"
      :data="list.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase())
      || data.birthdatetime.toLowerCase().includes(search.toLowerCase())
      || data.role.toLowerCase().includes(search.toLowerCase())
      || data.gender.toLowerCase().includes(search.toLowerCase()))"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :default-sort = "{prop: 'datetime', order: 'descending'}"
    >
      <el-table-column label="用户" width="110" prop="username" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="birthdatetime" sortable label="出生日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.birthdatetime }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="用户类型" prop="role" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.role | roleFilter">{{ scope.row.role | rolesFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110" prop="gender" align="center">
        <template slot-scope="scope">
          {{ scope.row.gender | genderFilter }}
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
            placeholder="搜索用户"/>
        </template>
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="edituser(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { getUserlist } from '@/api/user'

export default {
  filters: {
    roleFilter(role) {
      const statusMap = {
        'doctor': 'success',
        'patient': 'gray',
        'admin': 'danger'
      }
      return statusMap[role]
    },
    genderFilter(role) {
      const statusMap = {
        'Male': '男',
        'Female': '女'
      }
      return statusMap[role]
    },
    rolesFilter(role) {
      const statusMap = {
        'admin': '管理员',
        'doctor': '医生',
        'patient': '患者'
      }
      return statusMap[role]
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
      getUserlist().then(response => {
        this.list = response.data.form
        this.listLoading = false
      })
    },
    edituser(row) {
      this.$router.push({
        path: '/Adminedit/Index',
        query: {
          username: row.username
        }
      })
    }
  }
}
</script>
