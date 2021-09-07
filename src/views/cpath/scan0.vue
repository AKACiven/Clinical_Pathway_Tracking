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
              <el-button @click="drawer0 = true" v-if="city1 === '饮食'" type="primary" style="margin-left: 16px;">填写</el-button>
              <el-button @click="drawer1 = true" v-if="city1 === '其他医嘱'" type="primary" style="margin-left: 16px;">填写</el-button>
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
              <el-button @click="drawer2 = true" v-if="city2.indexOf('常规检查') !== -1" type="primary" style="margin-left: 16px;">选择</el-button>
              <el-button @click="drawer3 = true" v-if="city2.indexOf('功能性检查') !== -1" type="primary" style="margin-left: 16px;">选择</el-button>
              <el-button @click="drawer4 = true" v-if="city2.indexOf('射线检查') !== -1" type="primary" style="margin-left: 16px;">选择</el-button>
              <el-button @click="drawer5 = true" v-if="city2.indexOf('其他医嘱') !== -1" type="primary" style="margin-left: 16px;">填写</el-button>
              <el-button @click="drawer6 = true" v-if="city2.indexOf('细化检查') !== -1" type="primary" style="margin-left: 16px;">选择</el-button>
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
      title="饮食"
      :visible.sync="drawer0"
      :direction="rtl"
      :before-close="handleClose">
      <span>
        <el-input v-model="detailcities.city1.input0" placeholder="请输入饮食医嘱" type="textarea" autosize></el-input>
      </span>
    </el-drawer>
    <el-drawer
      title="其他医嘱"
      :visible.sync="drawer1"
      :direction="rtl"
      :before-close="handleClose">
      <span>
        <el-input v-model="detailcities.city1.input1" placeholder="请输入医嘱内容" type="textarea" autosize></el-input>
      </span>
    </el-drawer>
    <el-drawer
      title="常规检查"
      :visible.sync="drawer2"
      :direction="rtl"
      :before-close="handleClose">
      <template>
        <el-checkbox-group v-model="detailcities.city2.input0">
          <el-checkbox label="血常规及分类"></el-checkbox>
          <el-checkbox label="尿常规"></el-checkbox>
          <el-checkbox label="大便常规＋隐血"></el-checkbox>
        </el-checkbox-group>
      </template>
    </el-drawer>
    <el-drawer
      title="功能性检查"
      :visible.sync="drawer3"
      :direction="rtl"
      :before-close="handleClose">
      <template>
        <el-checkbox-group v-model="detailcities.city2.input1">
          <el-checkbox label="肝肾功能"></el-checkbox>
          <el-checkbox label="电解质"></el-checkbox>
          <el-checkbox label="血沉"></el-checkbox>
          <el-checkbox label="凝血功能"></el-checkbox>
          <el-checkbox label="血型"></el-checkbox>
          <el-checkbox label="输血前检查"></el-checkbox>
          <el-checkbox label="Coombs试验"></el-checkbox>
          <el-checkbox label="心肌酶谱"></el-checkbox>
          <el-checkbox label="β2-微球蛋白"></el-checkbox>
        </el-checkbox-group>
      </template>
    </el-drawer>
    <el-drawer
      title="射线检查"
      :visible.sync="drawer4"
      :direction="rtl"
      :before-close="handleClose">
      <template>
        <el-checkbox-group v-model="detailcities.city2.input2">
          <el-checkbox label="X线胸片"></el-checkbox>
          <el-checkbox label="心电图"></el-checkbox>
          <el-checkbox label="腹部B超"></el-checkbox>
          <el-checkbox label="心脏B超"></el-checkbox>
          <el-checkbox label="增强CT"></el-checkbox>
        </el-checkbox-group>
      </template>
    </el-drawer>
    <el-drawer
      title="其他医嘱"
      :visible.sync="drawer5"
      :direction="rtl"
      :before-close="handleClose">
      <span>
        <el-input v-model="detailcities.city2.input3" placeholder="请输入医嘱内容" type="textarea" autosize></el-input>
      </span>
    </el-drawer>
    <el-drawer
      title="细化检查"
      :visible.sync="drawer6"
      :direction="rtl"
      :before-close="handleClose">
      <template>
        <el-checkbox-group v-model="detailcities.city2.input4">
          <el-checkbox label="免疫球蛋白重链可变区(IGVH)突变状态"></el-checkbox>
          <el-checkbox label="染色体核型分析"></el-checkbox>
          <el-checkbox label="FISH 检测"></el-checkbox>
          <el-checkbox label="基因突变"></el-checkbox>
        </el-checkbox-group>
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
      detailcities: {
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
          '宣教'] },
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
      permdata: {
        cities: null,
        detailcities: null,
        checkedCities: null,
        where: 0,
        id: null
      }
    }
  },
  created() {
    if (!this.$route.query.id) {
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
        this.detailcities.city0 = response.data.detailcities.city0
        this.detailcities.city1 = response.data.detailcities.city1
        this.detailcities.city2 = response.data.detailcities.city2
        this.detailcities.city3 = response.data.detailcities.city3
      })
    },
    submit() {
      this.permdata.cities = this.cities
      this.permdata.id = this.$route.query.id
      this.permdata.detailcities = this.detailcities
      this.permdata.checkedCities = this.checkedCities
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
