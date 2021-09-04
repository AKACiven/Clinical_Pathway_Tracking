<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="姓名"
        width="150"
        align="center"
      />
      <el-table-column label="详细信息">
        <el-table-column
          prop="gender"
          label="性别"
          width="150"
          align="center"
        />
        <el-table-column
          prop="roles"
          label="身份"
          width="150"
          align="center"
        />
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope2">
            <el-button @click="edit(scope2.row)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getuserinfo } from '@/api/table'

export default {
  name: 'Userinfo',
  data() {
    return {
      tableData: null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getuserinfo().then(response => {
        this.tableData = [response.data]
      })
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
