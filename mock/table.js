const records = ({
  'forms': [
    {
      'id': '7856100',
      'name': '黄平如',
      'bed': '7',
      'status': '执行中',
      'date': '2021-9-5'
    },
    {
      'id': '7856106',
      'name': '李子照',
      'bed': '6',
      'status': '变异',
      'date': '2021-9-5'
    },
    {
      'id': '7856109',
      'name': '李红',
      'bed': '9',
      'status': '正常结束',
      'date': '2021-9-5'
    },
    {
      'id': '7856108',
      'name': '刘铭',
      'bed': '8',
      'status': '未加入',
      'date': ''
    }
  ]
})

const scan = ({
  'forms': ['上海', '北京', '广州', '深圳', '武汉']
})

const path = ({
  'forms': [
    {
      'stage': '第1天（入院日）',
      'status': '已完成',
      'where': '0'
    },
    {
      'stage': '第2天',
      'status': '正在进行',
      'where': '1'
    },
    {
      'stage': '第3~13天',
      'status': '准备进行',
      'where': '2'
    },
    {
      'stage': '第14天（出院日）',
      'status': '准备进行',
      'where': '3'
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
        data: form
      }
    }
  },
  { // 总看路径
    url: '/path/overall',
    type: 'get',
    response: config => {
      const form = path.forms
      return {
        code: 20000,
        data: form
      }
    }
  },
  {
    url: '/path/scan',
    type: 'get',
    response: config => {
      const scan = scan.forms
      return {
        code: 20000,
        data: scan
      }
    }
  }
]

