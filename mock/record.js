
const tail = ({
  'forms': [
    {
      'id': '7856100',
      'name': '黄平如',
      'bed': '0',
      'status': '执行中'
    },
    {
      'id': '7856106',
      'name': '李子照',
      'bed': '6',
      'status': '变异'
    },
    {
      'id': '7856109',
      'name': '李红',
      'bed': '9',
      'status': '正常结束'
    }
  ]
})

module.exports = [
  {
    url: '/path/submit',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  { // 首页展示的患2
    url: '/home/listf',
    type: 'get',
    response: config => {
      const form2 = tail.forms
      return {
        code: 20000,
        data: form2
      }
    }
  },
  {
    url: '/path/tail',
    type: 'get',
    response: config => {
      const form = tail.forms
      return {
        code: 20000,
        data: form
      }
    }
  }
]
