const Mock = require('mockjs')

const userlist = Mock.mock({
  'forms|10': [{
    'username': '@name(1, 2)',
    'gender|1': ['Male', 'Female'],
    'role|1': ['admin', 'patient', 'doctor'],
    'birthdatetime': '@date'
  }]
})

const userinfo = Mock.mock({
  'form': {
    'gender|1': ['Male', 'Female'],
    'role|1': ['admin', 'patient', 'doctor'],
    'birthdatetime': '@date'
  }
})

const tokens = {
  admin: 'admin-token',
  doctor: 'doctor-token',
  patient: 'patient-token',
  Alice: 'admin-token'
}

const users = {
  'admin-token': {
    roles: ['admin'],
    avatar: 'hospital.png',
    name: 'Admin'
  },
  'doctor-token': {
    roles: ['doctor'],
    avatar: 'doctor.png',
    name: 'Doctor'
  },
  'patient-token': {
    roles: ['patient'],
    avatar: 'patient.png',
    name: 'Patient'
  }
}

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      const role = 'admin'
      const roles = 'admin'
      const avatar = 'hospital.png'

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        // data: token,
        data: {
          token,
          role,
          roles,
          avatar
        }
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // user signin
  {
    url: '/user/register',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/user/adminmod',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },

  {
    url: '/user/adminadd',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },

  {
    url: '/adminedit/userlist',
    type: 'get',
    response: config => {
      const form = userlist.forms
      return {
        code: 20000,
        data: {
          form: form
        }
      }
    }
  },

  {
    url: 'adminedit/userdel',
    response: config => {
      return {
        code: 20000
      }
    }
  },

  {
    url: '/adminedit/userinfo',
    type: 'get',
    response: config => {
      const form = userinfo.form
      return {
        code: 20000,
        data: form
      }
    }
  }
]
