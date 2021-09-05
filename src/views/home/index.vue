<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部患者" name="unfiltered">
        <el-table
          v-loading="listLoading"
          :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())
      || data.id.toLowerCase().includes(search.toLowerCase())
      || data.bed.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          :default-sort = "{prop: 'bed', order: 'ascending'}"
        >
          <el-table-column label="ID" width="200" align="center">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="患者" width="200" prop="patient" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="床位" width="200" sortable prop="bed" align="center">
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
              <el-button v-if=" scope.row.status !== '未加入' " type="success" size="small" @click="edit(scope.row)" >查看详情</el-button>
              <el-button v-if=" scope.row.status === '未加入' " type="warning" size="small" @click="diagn(scope.row)" >加入路径</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="路径患者" name="filtered">
        <el-table
          v-loading="listLoading"
          :data="list2.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())
      || data.id.toLowerCase().includes(search.toLowerCase())
      || data.bed.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          :default-sort = "{prop: 'bed', order: 'ascending'}"
        >
          <el-table-column label="ID" width="200" align="center">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="患者" width="200" prop="patient" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="床位" width="200" sortable prop="bed" align="center">
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
              <el-button v-if=" scope.row.status !== '未加入' " type="success" size="small" @click="edit(scope.row)" >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getList, getList2 } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '正常结束': 'success',
        '执行中': 'primary',
        '变异': 'danger',
        '未加入': 'warning'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      list2: null,
      listLoading: true,
      search: '',
      activeName: 'filtered'
    }
  },
  created() {
    this.fetchData()
    this.fetchData2()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    fetchData2() {
      this.listLoading = true
      getList2().then(response => {
        this.list2 = response.data
        this.listLoading = false
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    edit(row) {
      this.$router.push({
        path: '/Path/Overall',
        query: {
          id: row.id
        }
      })
    },
    diagn(row) {
      this.$router.push({
        path: '',
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>
