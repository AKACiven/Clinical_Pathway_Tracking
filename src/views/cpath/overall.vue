<template>
  <div class="app-container">
<!--    <template>{{ fulltime }}</template>-->
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
      <el-table-column label="开始时间" width="200" sortable prop="date" align="center">
        <template slot-scope="scope">
          {{ scope.row.beginDate + "  " + scope.row.beginTime }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="200" sortable prop="date" align="center">
        <template slot-scope="scope">
          {{ scope.row.endDate + "  " + scope.row.endTime }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" prop="status" width="300" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
          <el-button v-if="scope.row.status !== '准备进行'"  @click="fetchPrint(scope.row)" type="success" size="small">查看</el-button>
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
          <el-button v-if="scope.row.beginDate !== '---'"  @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template v-if="printnum === 0">
      <div class="text-wrapper">{{ "第1阶段诊疗单" }}</div>
      <div class="text-wrapper">{{ "*****************************主要诊疗工作****************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city0"><div v-if="item != null">{{ item }}</div></div>
      <div class="text-wrapper">{{ "******************************长期医嘱******************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city1"><div v-if="item != null">{{ item }}</div>
        <div v-if="item === '饮食'">{{ " ：" + detailCities.city1.input0 }}</div>
        <div v-if="item === '其他医嘱'">{{ " ：" + detailCities.city1.input1 }}</div>
      </div>
      <div class="text-wrapper">{{ "******************************临时医嘱******************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city2"><div v-if="item != null">{{ item }}</div>
        <div v-if="item === '常规检查'">
          <div v-for="(item2) in detailCities.city2.input0">{{ " ：" + item2 + " " }}</div>
        </div>
        <div v-if="item === '功能性检查'">
          <div v-for="(item2) in detailCities.city2.input1">{{ " ：" + item2 + " " }}</div>
        </div>
        <div v-if="item === '射线检查'">
          <div v-for="(item2) in detailCities.city2.input2">{{ " ：" + item2 + " " }}</div>
        </div>
        <div v-if="item === '其他医嘱'">{{ " ：" + detailCities.city2.input3 }}</div>
        <div v-if="item === '细化检查'">
          <div v-for="(item2) in detailCities.city2.input4">{{ " ：" + item2 + " " }}</div>
        </div>
      </div>
      <div class="text-wrapper">{{ "*****************************主要护理工作****************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city3"><div v-if="item != null">{{ item }}</div></div>
    </template>
    <template v-if="printnum === 1">
      <div class="text-wrapper">{{ "第2阶段诊疗单" }}</div>
      <div class="text-wrapper">{{ "*****************************主要诊疗工作****************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city0"><div v-if="item != null">{{ item }}</div></div>
      <div class="text-wrapper">{{ "******************************长期医嘱******************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city1"><div v-if="item != null">{{ item }}</div>
        <div v-if="item === '其他医嘱'">{{ " ：" + detailCities.city1.input0 }}</div>
      </div>
      <div class="text-wrapper">{{ "******************************临时医嘱******************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city2">
        <div v-if="item != null">{{ item }}</div>
        <div v-if="item === '其他医嘱'">{{ " ：" + detailCities.city2.input0 }}</div>
      </div>
      <div class="text-wrapper">{{ "*****************************主要护理工作****************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city3"><div v-if="item != null">{{ item }}</div></div>
    </template>
    <template v-if="printnum === 2">
      <div class="text-wrapper">{{ "第3阶段诊疗单" }}</div>
      <div class="text-wrapper">{{ "*****************************主要诊疗工作****************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city0"><div v-if="item != null">{{ item }}</div></div>
      <div class="text-wrapper">{{ "******************************长期医嘱******************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city1"><div v-if="item != null">{{ item }}</div>
        <div v-if="item === '苯丁酸氮芥10mg/(m^2*d)'">{{ " ：" + detailCities.city1.input1 + "天" }}</div>
        <div v-if="item === '其他医嘱'">{{ " ：" + detailCities.city1.input0 }}</div>
        <div v-if="item === '利妥昔单抗'">{{ " ：" + detailCities.city1.input2 + "mg/m2，1天" }}</div>
        <div v-if="item === '氟达拉滨'">{{ " ：" + detailCities.city1.input3 + "mg/(m^2*d)" + " " + detailCities.city1.input4 + "天" }}</div>
        <div v-if="item === '环磷酰胺'">{{ " ：" + detailCities.city1.input5 + "mg/(m^2*d)" + " " + detailCities.city1.input6 + "天" }}</div>
        <div v-if="item === '甲泼尼龙1g/(m^2*d)'">{{ " ：" + detailCities.city1.input7 + "天" }}</div>
      </div>
      <div class="text-wrapper">{{ "******************************临时医嘱******************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city2"><div v-if="item != null">{{ item }}</div></div>
      <div class="text-wrapper">{{ "*****************************主要护理工作****************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city3"><div v-if="item != null">{{ item }}</div></div>
    </template>
    <template v-if="printnum === 3">
      <div class="text-wrapper">{{ "第4阶段诊疗单" }}</div>
      <div class="text-wrapper">{{ "*****************************主要诊疗工作****************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city0"><div v-if="item != null">{{ item }}</div></div>
      <div class="text-wrapper">{{ "******************************长期医嘱******************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city1"><div v-if="item != null">{{ item }}</div></div>
      <div class="text-wrapper">{{ "******************************临时医嘱******************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city2"><div v-if="item != null">{{ item }}</div>
        <div v-if="item === '其他医嘱'">{{ " ：" + detailCities.city2.input0 }}</div>
      </div>
      <div class="text-wrapper">{{ "*****************************主要护理工作****************************" }}</div>
      <div class="text-wrapper" v-for="(item) in checkedCities.city3"><div v-if="item != null">{{ item }}</div></div>
    </template>
  </div>
</template>

<script>

import { getPath, getScan } from '@/api/table'

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
      id: '',
      date: null,
      fulltime: new Date(),
      ground: '',
      print: null,
      checkedCities: {
        city0: [1, 2, 3, 4, 5, 6],
        city1: [],
        city2: [],
        city3: []
      },
      detailCities: {
        city0: {},
        city1: {},
        city2: {},
        city3: {}
      },
      printnum: null
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.fulltime = new Date()
      var d = new Date()
      var year = d.getFullYear()
      var month = d.getMonth() + 1
      var day = d.getDate()
      this.date = year + '-' + month + '-' + day
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
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
        for (var i = 0; i < 4; i++) {
          if (this.list[i].beginDate === 'null' || this.list[i].beginDate === null) {
            this.list[i].beginDate = '---'
            this.list[i].beginTime = '---'
          }
          if (this.list[i].endDate === 'null' || this.list[i].endDate === null) {
            this.list[i].endDate = '---'
            this.list[i].endTime = '---'
          }
        }
      })
    },
    fetchPrint(row) {
      getScan({ id: this.$route.query.id, where: row.where }).then(response => {
        this.printnum = row.where
        this.checkedCities.city0 = response.data.checkedCities.city0
        this.checkedCities.city1 = response.data.checkedCities.city1
        this.checkedCities.city2 = response.data.checkedCities.city2
        this.checkedCities.city3 = response.data.checkedCities.city3
        this.detailCities.city0 = response.data.detailCities.city0
        this.detailCities.city1 = response.data.detailCities.city1
        this.detailCities.city2 = response.data.detailCities.city2
        this.detailCities.city3 = response.data.detailCities.city3
      })
    },
    edit(row) {
      this.$router.push({
        path: '/Path/Scan' + row.where,
        query: {
          id: this.$route.query.id,
          where: row.where
        }
      })
    }
  }
}
</script>

<style lang="scss">
.text-wrapper {
  white-space: pre-wrap;
}
.element-wrapper {
  white-space: nowrap;
}
</style>
