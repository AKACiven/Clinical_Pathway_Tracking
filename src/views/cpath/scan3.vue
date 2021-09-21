<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click.native.prevent="submit">确认路径</el-button>
      <div style="margin: 15px 0;"></div>
    </el-row>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="主要诊疗工作" name="1">
        <template>
          <el-checkbox :indeterminate="isIndeterminate0" v-model="checkAll0" @change="handleCheckAllChange0">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities.city0" @change="handleCheckedCitiesChange0">
            <el-checkbox v-for="city0 in cities.city0" :label="city0" :key="city0">{{ city0 }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </el-collapse-item>
      <el-collapse-item title="长期医嘱" name="2">
        <template>
          <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities.city1" @change="handleCheckedCitiesChange1">
            <el-checkbox v-for="city1 in cities.city1" :label="city1" :key="city1">{{ city1 }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </el-collapse-item>
      <el-collapse-item title="临时医嘱" name="3">
        <template>
          <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities.city2" @change="handleCheckedCitiesChange2">
            <el-checkbox v-for="city2 in cities.city2" :label="city2" :key="city2">{{ city2 }}
              <el-button @click="drawer0 = true" v-if="city2.indexOf('其他医嘱') !== -1" type="text" style="margin-left: 16px;">填写</el-button>
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </el-collapse-item>
      <el-collapse-item title="主要护理工作" name="4">
        <template>
          <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities.city3" @change="handleCheckedCitiesChange3">
            <el-checkbox v-for="city3 in cities.city3" :label="city3" :key="city3">{{ city3 }}</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-collapse-item>
    </el-collapse>
    <el-drawer
      title="其他医嘱"
      :visible.sync="drawer0"
      :direction="rtl"
      :before-close="handleClose">
      <span>
        <el-input v-model="detailcities.city2.input0" placeholder="请输入医嘱内容" type="textarea" autosize></el-input>
      </span>
    </el-drawer>
  </div>
</template>

<script>

import { getScan } from '@/api/table'
import { pathSubmit } from '@/api/record'

export default {
  data() {
    return {
      checkAll0: false,
      checkAll1: false,
      checkAll2: false,
      checkAll3: false,
      checkedCities: {
        city0: [],
        city1: [],
        city2: [],
        city3: []
      },
      detailCities: {
        city0: {},
        city1: {},
        city2: {
          input0: ''
        },
        city3: {}
      },
      cities: {
        city0: [
          '上级医师查房，进行评估，确定有无并发症情况，明确是否出院',
          '完成出院记录、病案首页、出院证明书等',
          '向患者交代出院后的注意事项，如：返院复诊的时间、地点，发生紧急情况时的处理等'
        ],
        city1: [
          '出院带药',
          '定期门诊随访',
          '监测血常规'
        ],
        city2: [
          '其他医嘱'
        ],
        city3: [
          '指导患者办理出院手续'
        ] },
      isIndeterminate0: true,
      isIndeterminate1: true,
      isIndeterminate2: true,
      isIndeterminate3: true,
      activeNames: ['1', '2', '3', '4'],
      drawer0: false,
      permdata: {
        detailCities: null,
        checkedCities: null,
        id: null,
        cities: null,
        where: 3
      }
    }
  },
  created() {
    if (!this.$route.query.id && !this.$route.query.where) {
      this.$alert('请先在路径总览进行操作！', '提示', {
        confirmButtonText: '前往路径总览',
        callback: action => {
          this.$router.push({
            path: '/Path/Overall'
          })
        }
      })
    } else {
      this.fetchData()
    }
  },
  methods: {
    handleCheckAllChange0(val) {
      this.checkedCities.city0 = val ? this.cities.city0 : []
      this.isIndeterminate0 = false
    },
    handleCheckAllChange1(val) {
      this.checkedCities.city1 = val ? this.cities.city1 : []
      this.isIndeterminate1 = false
    },
    handleCheckAllChange2(val) {
      this.checkedCities.city2 = val ? this.cities.city2 : []
      this.isIndeterminate2 = false
    },
    handleCheckAllChange3(val) {
      this.checkedCities.city3 = val ? this.cities.city3 : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange0(value) {
      let checkedCount = value.length
      this.checkAll0 = checkedCount === this.cities.city0.length
      this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.cities.city0.length
    },
    handleCheckedCitiesChange1(value) {
      let checkedCount = value.length
      this.checkAll1 = checkedCount === this.cities.city1.length
      this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.cities.city1.length
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length
      this.checkAll2 = checkedCount === this.cities.city2.length
      this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.cities.city2.length
    },
    handleCheckedCitiesChange3(value) {
      let checkedCount = value.length
      this.checkAll3 = checkedCount === this.cities.city3.length
      this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.cities.city3.length
    },
    fetchData() {
      getScan({ id: this.$route.query.id, where: this.$route.query.where }).then(response => {
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
    submit() {
      this.permdata.detailCities = this.detailCities
      this.permdata.checkedCities = this.checkedCities
      this.permdata.id = this.$route.query.id
      this.permdata.cities = this.cities
      pathSubmit(this.permdata).then(() => {
        this.$alert('路径提交成功！', '消息', {
          confirmButtonText: '确认',
          callback: action => {
            // window.location.reload()
          }
        })
      })
    },
    handleChange(val) {
      console.log(val)
    },
    handleClose(done) {
      this.$confirm('确认？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
