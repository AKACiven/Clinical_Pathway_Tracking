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
          <el-checkbox-group v-model="checkedCities.chkcts0" @change="handleCheckedCitiesChange0">
            <el-checkbox v-for="city0 in cities.city0" :label="city0" :key="city0">{{ city0 }}
              <el-button @click="drawer = true" v-if="city0 === '北京'" type="primary" style="margin-left: 16px;">打开</el-button>
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </el-collapse-item>
      <el-collapse-item title="长期医嘱" name="2">
        <template>
          <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities.chkcts1" @change="handleCheckedCitiesChange1">
            <el-checkbox v-for="city1 in cities.city1" :label="city1" :key="city1">{{ city1 }}</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-collapse-item>
      <el-collapse-item title="临时医嘱" name="3">
        <template>
          <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities.chkcts2" @change="handleCheckedCitiesChange2">
            <el-checkbox v-for="city2 in cities.city2" :label="city2" :key="city2">{{ city2 }}</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-collapse-item>
      <el-collapse-item title="主要护理工作" name="4">
        <template>
          <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities.chkcts3" @change="handleCheckedCitiesChange3">
            <el-checkbox v-for="city3 in cities.city3" :label="city3" :key="city3">{{ city3 }}</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-collapse-item>
    </el-collapse>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="rtl"
      :before-close="handleClose">
      <span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
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
        chkcts0: [],
        chkcts1: [],
        chkcts2: [],
        chkcts3: []
      },
      cities: {
        city0: [
          '上级医师查房',
          '根据体检、各项检查结果和既往资料，进行鉴别诊断和确定诊断',
          '根据其他检查结果判断是否合并其他疾病',
          '开始治疗，需要化疗者家属签署化疗知情同意书',
          '保护重要脏器功能',
          '注意观察化疗药物的副作用，复查血常规、血生化、电解质等，并对症处理',
          '完成病程记录'
        ],
        city1: [
          '苯丁酸氮芥单用或联合利妥昔单抗, 利妥昔单抗',
          '利妥昔单抗单用',
          '氟达拉滨单用',
          'FC方案',
          'FCR方案: FC同上, 利妥昔单抗',
          '减低剂量FCR, 利妥昔单抗',
          '甲泼尼龙单用或联合利妥昔单抗',
          '伊布替尼',
          '重要脏器保护，碱化水化利尿等治疗',
          '必要时抗感染等支持治疗',
          '其他医嘱'
        ],
        city2: [
          '复查血常规',
          '复查血生化、电解质',
          '输血（有指征时）',
          '对症支持',
          '其他医嘱'
        ],
        city3: [
          '观察患者病情变化',
          '心理与生活护理',
          '化疗期间嘱患者多饮水'
        ]
      },
      isIndeterminate0: true,
      isIndeterminate1: true,
      isIndeterminate2: true,
      isIndeterminate3: true,
      activeNames: ['1', '2', '3', '4'],
      drawer: false,
      input: ''
    }
  },
  created() {
    if (!(this.$route.query.id && this.$route.query.where)) {
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
      this.checkedCities.chkcts0 = val ? this.cities.city0 : []
      this.isIndeterminate0 = false
    },
    handleCheckAllChange1(val) {
      this.checkedCities.chkcts1 = val ? this.cities.city1 : []
      this.isIndeterminate1 = false
    },
    handleCheckAllChange2(val) {
      this.checkedCities.chkcts2 = val ? this.cities.city2 : []
      this.isIndeterminate2 = false
    },
    handleCheckAllChange3(val) {
      this.checkedCities.chkcts3 = val ? this.cities.city3 : []
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
      getScan({ id: this.$route.query.id, where: this.$route.query.id }).then(response => {
        this.cities = response.data
      })
    },
    submit() {
      pathSubmit(this.checkedCities).then(() => {
        this.$alert('路径提交成功！', '消息', {
          confirmButtonText: '确认',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    handleChange(val) {
      console.log(val)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
