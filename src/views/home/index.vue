<template>
  <div class="app-container">
    <el-button type="primary" @click="addpat" >添加患者</el-button>
<!--    <template>{{ fulltime }}</template>-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部患者" name="unfiltered">
        <el-table
          v-loading="listLoading"
          :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())
      || data.id.toLowerCase().includes(search.toLowerCase())
      || data.date.toLowerCase().includes(search.toLowerCase())
      || data.bed.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          :default-sort = "{prop: 'bed', order: 'ascending'}"
        >
          <el-table-column label="ID" width="300" align="center">
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
<!--          <el-table-column label="入院时间" width="200" sortable prop="date" align="center">-->
<!--            <template slot-scope="scope">-->
<!--              {{ scope.row.date + "  " + scope.row.time }}-->
<!--            </template>-->
<!--          </el-table-column>-->
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
      || data.date.toLowerCase().includes(search.toLowerCase())
      || data.bed.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          :default-sort = "{prop: 'bed', order: 'ascending'}"
        >
          <el-table-column label="ID" width="300" align="center">
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
          <el-table-column label="入院时间" width="200" sortable prop="date" align="center">
            <template slot-scope="scope">
              {{ scope.row.date + "  " + scope.row.time }}
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
              <el-button v-if=" scope.row.status === '变异' " type="warning" size="small" @click="dialog1 = true; ground2(scope.row)" >变异原因</el-button>
<!--              <el-button v-if=" scope.row.status === '变异' " type="warning" size="small" @click="ground1(scope.row)" >变异原因</el-button>-->
<!--              <el-button v-if=" scope.row.status === '执行中' " type="warning" size="small" @click="evaluate1(scope.row)" >评估</el-button>-->
              <el-button v-if=" scope.row.status === '执行中' " type="warning" size="small" @click="dialog2 = true; evaluate2(scope.row)" >评估</el-button>
              <el-button v-if=" scope.row.status !== '未加入' " type="success" size="small" @click="edit(scope.row)" >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="变异原因" :visible.sync="dialog1">
      <el-form v-if="ground !== ''" label-width="90px">
        <el-form-item label="变异原因">
          <el-input
            type="textarea"
            autosize
            v-model="ground">
          </el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="评估" :visible.sync="dialog2">
      <el-form label-width="90px">
        <el-form-item label="阶段">
          <el-tag :type="success">{{ stage | statusFilter2}}</el-tag>
        </el-form-item>
        <el-form-item label="时间进度">
          <el-radio-group v-model="sub.proce">
            <el-radio :label="0">继续本阶段</el-radio>
            <el-radio v-if="stage !== 3" :label="1">进入下一阶段</el-radio>
            <el-radio :label="2">变异</el-radio>
            <el-radio :label="3">完成路径</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="sub.proce === 2" label="变异原因">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入变异原因"
            v-model="sub.ground">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="submit2(); dialog2 = false">完成</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getList2, getOut, getProcess } from '@/api/table'
import {addtoPath, eValuate} from '@/api/record'
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
    },
    statusFilter2(status) {
      const statusMap = {
        '0': '阶段1',
        '1': '阶段2',
        '2': '阶段3',
        '3': '阶段4'
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
      activeName: 'filtered',
      atpitem: {
        id: null,
        date: null,
        time: null,
        checkedCities: {
          city0: [],
          city1: [],
          city2: [],
          city3: []
        },
        detailCities: {
          city0: {},
          city1: {
            input0: '',
            input1: ''
          },
          city2: {
            input0: [],
            input1: [],
            input2: [],
            input3: '',
            input4: []
          },
          city3: {}
        },
        cities: {
          city0: [
            '询问病史及体格检查',
            '完成病历书写',
            '开实验室检查单',
            '对症支持治疗',
            '病情告知，必要时向患者家属告病重或病危通知，并签署病重或病危通知书',
            '患者家属签署各种必要的知情同意书'
          ],
          city1: [
            '血液病护理常规',
            '二级护理',
            '饮食',
            '视病情通知病重或病危',
            '其他医嘱'
          ],
          city2: [
            '常规检查',
            '功能性检查',
            '乙肝二对半',
            '射线检查',
            '输血（有指征时）等支持对症治疗',
            '其他医嘱',
            '细化检查'
          ],
          city3: [
            '介绍病房环境、设施和设备',
            '入院护理评估',
            '宣教'] }
      },
      date: null,
      time: null,
      fulltime: new Date(),
      dialog1: false,
      dialog2: false,
      ground: null,
      sub: {
        proce: null,
        ground: '',
        stage: '',
        date: null,
        time: null,
        id: null
      },
      stage: '',
      temid: null
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.fulltime = new Date()
      var d = new Date()
      var year = d.getFullYear()
      // var month = d.getMonth() + 1
      var month = ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
      var day = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate())
      var hour = (d.getHours() < 10 ? '0' + (d.getHours()) : d.getHours())
      var minute = (d.getMinutes() < 10 ? '0' + (d.getMinutes()) : d.getMinutes())
      var second = (d.getSeconds() < 10 ? '0' + (d.getSeconds()) : d.getSeconds())
      this.date = year + '-' + month + '-' + day
      this.time = hour + ':' + minute + ':' + second
      this.sub.date = year + '-' + month + '-' + day
      this.sub.time = hour + ':' + minute + ':' + second
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
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
      if (this.$route.query.switch) {
        this.activeName = 'unfiltered'
      }
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
    evaluate1(row) {
      this.$router.push({
        path: '/Evaluate/Index',
        query: {
          id: row.id
        }
      })
    },
    evaluate2(row) {
      getProcess({ id: row.id }).then(response => {
        this.stage = response.data.process
        this.temid = row.id
      })
    },
    ground1(row) {
      this.$router.push({
        path: '/Evaluate/Ground',
        query: {
          id: row.id
        }
      })
    },
    ground2(row) {
      getOut({ id: row.id }).then(response => {
        this.ground = response.data.ground
      })
    },
    submit2() {
      this.sub.stage = this.stage
      this.sub.id = this.temid
      eValuate(this.sub).then(() => {
        this.$alert('提交成功！', '消息', {
          confirmButtonText: '确认',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    diagn(row) {
      this.atpitem.id = row.id
      this.atpitem.date = this.date
      this.atpitem.time = this.time
      addtoPath(this.atpitem).then(() => {
        this.$alert('添加到路径！', '消息', {
          confirmButtonText: '确认',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    addpat() {
      this.$router.push({
        path: '/AddPatient'
      })
    }
  }
}
</script>
