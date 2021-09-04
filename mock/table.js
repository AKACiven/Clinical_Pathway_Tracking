const Mock = require('mockjs')

const records = Mock.mock({
  'forms|10': [{
    id: '@id',
    ID: '@integer(1000000000, 1999999999)',
    'department|1': ['眼科', '骨科', '儿科'],
    'prescription': '@sentence(10, 20)',
    'opinion': '@sentence(10, 15)',
    'status|1': ['处理中', '等待确认', '处方结束'],
    'doctor|1': ['王二狗', '黄大丫', '刘小刚'],
    'patient|1': ['徐一狗', '何小丫', '张大刚'],
    'datetime': '@datetime',
    'docfirm|1': [true, false],
    'patfirm|1': [true, false]
  }]
})

const userinfo = {
  age: '23',
  roles: 'patient',
  username: '王小虎',
  gender: 'Male'
}

module.exports = [
  {
    url: '/record/all',
    type: 'get',
    response: config => {
      const form = records.forms
      return {
        code: 20000,
        data: {
          form: form
        }
      }
    }
  },

  {
    url: '/record/dep',
    type: 'get',
    response: config => {
      const form = records.forms
      return {
        code: 20000,
        data: {
          form: form
        }
      }
    }
  },
  {
    url: '/record/pat',
    type: 'get',
    response: config => {
      const form = records.forms
      return {
        code: 20000,
        data: {
          form: form
        }
      }
    }
  },
  {
    url: '/record/delete',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  {
    url: '/table/userinfo',
    type: 'post',
    response: config => {
      const userinfos = userinfo
      return {
        code: 20000,
        data: {
          age: userinfos.age,
          gender: userinfos.gender,
          roles: userinfos.roles,
          username: userinfos.username
        }
      }
    }
  }]

