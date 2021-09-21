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
              <el-button @click="drawer1 = true" v-if="city1 === '其他医嘱'" type="text" style="margin-left: 16px;">填写</el-button>
              <el-button @click="drawer2 = true" v-if="city1.indexOf('苯丁酸氮芥') !== -1" type="text" style="margin-left: 16px;">剂量</el-button>
              <el-button @click="drawer3 = true" v-if="city1.indexOf('利妥昔单抗') !== -1" type="text" style="margin-left: 16px;">剂量</el-button>
              <el-button @click="drawer4 = true" v-if="city1.indexOf('氟达拉滨') !== -1" type="text" style="margin-left: 16px;">剂量</el-button>
              <el-button @click="drawer5 = true" v-if="city1.indexOf('环磷酰胺') !== -1" type="text" style="margin-left: 16px;">剂量</el-button>
              <el-button @click="drawer6 = true" v-if="city1.indexOf('甲泼尼龙') !== -1" type="text" style="margin-left: 16px;">剂量</el-button>
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
    <el-drawer
      title="其他医嘱"
      :visible.sync="drawer1"
      :direction="rtl"
      :before-close="handleClose">
      <span>
        <el-input v-model="detailcities.city1.input0" placeholder="请输入医嘱内容" type="textarea" autosize></el-input>
      </span>
    </el-drawer>
    <el-drawer
      title="苯丁酸氮芥10mg/(m^2*d)"
      :visible.sync="drawer2"
      :direction="rtl"
      :before-close="handleClose">
      <template>
        <el-input-number v-model="detailcities.city1.input1" :min="1" :max="7" label="描述文字"></el-input-number>
        <span>天数</span>
      </template>
    </el-drawer>
    <el-drawer
      title="利妥昔单抗"
      :visible.sync="drawer3"
      :direction="rtl"
      :before-close="handleClose">
      <template>
        <el-input-number v-model="detailcities.city1.input2" :min="375" :max="500" label="描述文字"></el-input-number>
        <span>mg/m2，  1天</span>
      </template>
    </el-drawer>
    <el-drawer
      title="氟达拉滨"
      :visible.sync="drawer4"
      :direction="rtl"
      :before-close="handleClose">
      <el-row>
        <el-input-number v-model="detailcities.city1.input3" :min="375" :max="500" label="描述文字"></el-input-number>
        <span>mg/(m^2*d)</span>
      </el-row>
      <el-row>
        <div style="margin: 15px 0;"></div>
      </el-row>
      <el-row>
        <el-input-number v-model="detailcities.city1.input4" :min="1" :max="5" label="描述文字"></el-input-number>
        <span>天</span>
      </el-row>
    </el-drawer>
    <el-drawer
      title="环磷酰胺"
      :visible.sync="drawer5"
      :direction="rtl"
      :before-close="handleClose">
      <el-row>
        <el-input-number v-model="detailcities.city1.input5" :min="20" :max="25" label="描述文字"></el-input-number>
        <span>mg/(m^2*d)</span>
      </el-row>
      <el-row>
        <div style="margin: 15px 0;"></div>
      </el-row>
      <el-row>
        <el-input-number v-model="detailcities.city1.input6" :min="1" :max="3" label="描述文字"></el-input-number>
        <span>天数</span>
      </el-row>
    </el-drawer>
    <el-drawer
      title="甲泼尼龙1g/(m^2*d)"
      :visible.sync="drawer6"
      :direction="rtl"
      :before-close="handleClose">
      <template>
        <el-input-number v-model="detailcities.city1.input7" :min="1" :max="5" label="描述文字"></el-input-number>
        <span>天数</span>
      </template>
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
        city1: {
          input0: '',
          input1: null,
          input2: null,
          input3: null,
          input4: null,
          input5: null,
          input6: null,
          input7: null
        },
        city2: {
          input0: ''
        },
        city3: {}
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
          '苯丁酸氮芥10mg/(m^2*d)',
          '利妥昔单抗',
          '氟达拉滨',
          '环磷酰胺',
          '甲泼尼龙1g/(m^2*d)',
          '伊布替尼420mg/d',
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
        ] },
      isIndeterminate0: true,
      isIndeterminate1: true,
      isIndeterminate2: true,
      isIndeterminate3: true,
      activeNames: ['1', '2', '3', '4'],
      drawer0: false,
      drawer1: false,
      drawer2: false,
      drawer3: false,
      drawer4: false,
      drawer5: false,
      drawer6: false,
      drawer7: false,
      permdata: {
        detailCities: null,
        checkedCities: null,
        where: 2,
        id: null,
        cities: null
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
