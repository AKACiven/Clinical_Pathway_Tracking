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
              <el-button @click="drawer0 = true" v-if="city1 === '其他医嘱'" type="primary" style="margin-left: 16px;">填写</el-button>
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
              <el-button @click="drawer1 = true" v-if="city2.indexOf('其他医嘱') !== -1" type="primary" style="margin-left: 16px;">填写</el-button>
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
        <el-input v-model="detailcities.city1.input0" placeholder="请输入医嘱内容" type="textarea" autosize></el-input>
      </span>
    </el-drawer>
    <el-drawer
      title="其他医嘱"
      :visible.sync="drawer1"
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
      detailcities: {
        city0: {},
        city1: {
          input0: ''
        },
        city2: {
          input0: ''
        },
        city3: {}
      },
      cities: {
        city0: [
          '上级医师查房',
          '完成入院检查',
          '继续对症支持治疗',
          '完成必要的相关科室会诊',
          '完成上级医师查房记录等病历书写',
          '向患者及家属交待病情及其注意事项'
        ],
        city1: [
          '患者既往基础用药',
          '其他医嘱'
        ],
        city2: [
          '骨髓穿刺和骨髓活检（必要时）',
          '骨髓形态学、病理、免疫组化（必要时）',
          '外周血免疫表型',
          '外周血细胞(CpG刺激)/分子遗传学',
          '分子生物学检测TP53基因突变及IGHV突变状态',
          '自身免疫系统疾病筛查',
          '输血（有指征时）',
          '其他医嘱'
        ],
        city3: [
          '观察患者病情变化'] },
      isIndeterminate0: true,
      isIndeterminate1: true,
      isIndeterminate2: true,
      isIndeterminate3: true,
      activeNames: ['1', '2', '3', '4'],
      drawer0: false,
      drawer1: false,
      permdata: {
        detailcities: null,
        checkedCities: null,
        where: 1
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
        this.checkedCities.chkcts0 = response.data.checkedCities.chkcts0
        this.checkedCities.chkcts1 = response.data.checkedCities.chkcts1
        this.checkedCities.chkcts2 = response.data.checkedCities.chkcts2
        this.checkedCities.chkcts3 = response.data.checkedCities.chkcts3
        this.detailcities.dtcts0 = response.data.detailcities.dtcts0
        this.detailcities.dtcts1 = response.data.detailcities.dtcts1
        this.detailcities.dtcts2 = response.data.detailcities.dtcts2
        this.detailcities.dtcts3 = response.data.detailcities.dtcts3
      })
    },
    submit() {
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
