const Mock = require('mockjs')

const record = Mock.mock({
  'form': {
    id: '@id',
    'department|1': ['眼科', '骨科', '儿科'],
    'prescription': '@sentence(10, 20)',
    'opinion': '@sentence(10, 15)',
    'status|1': ['处理中', '等待确认', '处方结束'],
    'doctor|1': ['王二狗', '黄大丫', '刘小刚'],
    'patient|1': ['徐一狗', '何小丫', '张大刚'],
    datetime: '@datetime',
    'docfirm|1': [true, false],
    'patfirm|1': [true, false]
  }
})

module.exports = [
  {
    url: '/recorder/docsubmit',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  {
    url: '/registration/submit',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  {
    url: '/recorder/detail',
    type: 'get',
    response: config => {
      const form = record.form
      return {
        code: 20000,
        data: form
      }
    }
  }
]
