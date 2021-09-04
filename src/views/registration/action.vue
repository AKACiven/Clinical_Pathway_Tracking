<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="挂号科室" style="width: 40%;">
        <el-autocomplete
          v-model="form.department"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="预约时间">
        <el-date-picker
          v-model="form.datetime"
          type="datetime"
          style="width: 40%;"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmit">挂号</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { submitregi } from '@/api/record'

export default {
  data() {
    return {
      form: {
        department: '',
        datetime: '',
      },
    }
  },
  methods: {
    onSubmit() {
      this.form.docfirm = 'true'
      if (this.form.department && this.form.datetime) {
        this.$refs.form.validate(valid => {
          if (valid) {
            submitregi(this.form).then(() => {
              this.$alert('挂号成功！请前往对应的科室', '消息', {
                confirmButtonText: '确认',
                callback: action => {
                  window.location.reload()
                }
              });
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        if (!this.form.datetime) {
          this.$alert('请选择时间！', '提示', {
            confirmButtonText: '确认',
          });
        }
        if (!this.form.department) {
          this.$alert('请选择科室！', '提示', {
            confirmButtonText: '确认',
          });
        }
      }
    },
    loadAll() {
      return[
        { "value": "眼科" },
        { "value": "骨科" },
        { "value": "儿科" },
        { "value": "泌尿科" },
        { "value": "消化道科" },
        { "value": "口腔科" },
        { "value": "牙科" },
        { "value": "皮肤科" },
        ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

