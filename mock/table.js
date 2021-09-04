
const records = ({
  'forms': [
    {
      'ID': '7856100',
      'patient': '黄平如',
      'bed': '0',
      'status': '执行中'
    },
    {
      'ID': '7856106',
      'patient': '李子照',
      'bed': '6',
      'status': '变异'
    },
    {
      'ID': '7856109',
      'patient': '李红',
      'bed': '9',
      'status': '正常结束'
    },
    {
      'ID': '7856108',
      'patient': '刘铭',
      'bed': '8',
      'status': '不符合'
    }
  ]
})

module.exports = [
  { // 首页展示的患者
    url: '/home/list',
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
  }
]

