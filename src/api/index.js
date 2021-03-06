import axios from 'axios'
import Qs from 'qs'
import router from "../router"
import { Message } from "element-ui"
import baseURL from '../../config/setBaseUrl'
import Cookies from 'js-cookie'

// 设置基准路径
const URL = baseURL.axios_base_url
axios.defaults.baseURL = URL
axios.defaults.withCredentials = true
// 设置请求超时
// axios.defaults.timeout = 10000

//请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // 登录过就不拦截
  // var token = localStorage.getItem('adminToken')
  // if (token) {
  //   config.headers['Authorization'] = token
  // }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log('响应拦截器',response.data)
  //未登录或登录过期，跳到登录登录页
  if (response.data && response.data.code == '9001') {
    Message.error({
      message:response.data.message,
      duration:3000
    })
    router.push('/login')
    Cookies.remove('isLogin')
    localStorage.removeItem('accessRouteList')
    return Promise.reject(response.data)
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
});


// 登录接口
const checkLogin = (params) => {
  return axios.post('/jtds/Admin_login/denglu', Qs.stringify(params)).then(res => res)
}

// 登出接口
const checkLogout = (params) => {
  return axios.post('/jtds/Admin_login/logut', Qs.stringify(params)).then(res => res)
}

// 忘记密码接口
const forgetPsd = (params) => {
  return axios.post('/jtds/Admin_login/editpswd', Qs.stringify(params)).then(res => res)
}

// 检查短信验证码接口
const checkMsg = (params) => {
  return axios.post('/jtds/Admin_login/verifysms', Qs.stringify(params)).then(res => res)
}

// 发送短信接口
const sendMsg = (params) => {
  return axios.post('/jtds/Admin_captcha/sendsms', Qs.stringify(params)).then(res => res)
}

// 发送图片验证码接口
const sendImg = (params) => {
  return axios.get('/jtds/Admin_captcha/createCode', {params: Qs.stringify(params)}).then(res => res)
}

// 邀请码接口：
// 获取邀请码列表
const getYqm = (params) => {
  return axios.post('/jtds/Admin_InviteCode/codeList', Qs.stringify(params)).then(res => res.data)
}
// 创建邀请码
const creatYqm = (params) => {
  return axios.post('/jtds/Admin_InviteCode/addCode', Qs.stringify(params)).then(res => res.data)
}

// 编辑邀请码
const editYqm = (params) => {
  return axios.post('/jtds/Admin_InviteCode/editCode', Qs.stringify(params)).then(res => res.data)
}

// 删除邀请码
const delYqm = (params) => {
  return axios.post('/jtds/Admin_InviteCode/delCode', Qs.stringify(params)).then(res => res.data)
}

// 发送邀请码
const sendYqm = (params) => {
  return axios.post('/jtds/Admin_Invitecode/sendCode', Qs.stringify(params)).then(res => res.data)
}

// 发送优惠券
const sendCoupon = (params) => {
  return axios.post('/jtds/Admin_InviteCode/sendCoupon', Qs.stringify(params)).then(res => res.data)
}

// 商品接口
// 添加新商品
const addGood = (params) => {
  return axios.post('/jtds/Admin_Goods/addGoods', Qs.stringify(params)).then(res => res.data)
}

// 编辑商品
const editGood = (params) => {
  return axios.post('/jtds/Admin_Goods/editGoods', Qs.stringify(params)).then(res => res.data)
}

// 获取商品
const getGoodList = (params) => {
  return axios.post('/jtds/Admin_Goods/goodsList', Qs.stringify(params)).then(res => res.data)
}

// 删除商品
const delGood = (params) => {
  return axios.post('/jtds/Admin_Goods/delGoods', Qs.stringify(params)).then(res => res.data)
}

// 添加商品详情
const addGoodDesc = (params) => {
  return axios.post('/jtds/Admin_Goods/addGoodsDetail', Qs.stringify(params)).then(res => res.data)
}

// 编辑商品详情
const editGoodDesc = (params) => {
  return axios.post('/jtds/Admin_Goods/editGoodsDetail', Qs.stringify(params)).then(res => res.data)
}

// 删除商品详情
const delGoodDesc = (params) => {
  return axios.post('/jtds/Admin_Goods/delGoodsDetail', Qs.stringify(params)).then(res => res.data)
}

// 获取商品详情列表
const getGoodDescList = (params) => {
  return axios.post('/jtds/Admin_Goods/goodsDetailList', Qs.stringify(params)).then(res => res.data)
}

// 订单管理-获取订单列表
const getOrderList = (params) => {
  return axios.post('/jtds/Admin_Order/orderList', Qs.stringify(params)).then(res => res.data)
}

// 订单管理-获取对应订单信息
const getOrderDetail = (params) => {
  return axios.post('/jtds/Admin_Order/orderDetail', Qs.stringify(params)).then(res => res.data)
}

// 订单管理-删除订单
const delOrder = (params) => {
  return axios.post('/jtds/Admin_Order/delOrder', Qs.stringify(params)).then(res => res.data)
}

//订单管理-导出订单
const exportOrder = (params) => {
  return axios.post('/jtds/Admin_Order/export', Qs.stringify(params)).then(res => res.data)
}

// 物流信息-添加物流信息
const addExpress = (params) => {
  return axios.post('/jtds/Admin_Express/addExpress', Qs.stringify(params)).then(res => res.data)
}

// 物流信息-修改物流信息
const editExpress = (params) => {
  return axios.post('/jtds/Admin_Express/editExpress', Qs.stringify(params)).then(res => res.data)
}

// 库存-导入excel
const importExcel = (params) => {
  return axios.post('/jtds/Admin_Storage/import', params).then(res => res.data)
}

// 库存-导出excel
const exporttExcel = (params) => {
  return axios.post('/jtds/Admin_Storage/export', Qs.stringify(params)).then(res => res.data)
}

// 库存-获取库存列表
const getStorageList = (params) => {
  return axios.post('/jtds/Admin_Storage/storageList', Qs.stringify(params)).then(res => res.data)
}

// 商品管理-查看库存信息
const getGoodsStorage = (params) => {
  return axios.post('/jtds/Admin_Goods/getGoodsStorage', Qs.stringify(params)).then(res => res.data)
}

// 设置-账号列表
const getUserAccountList = (params) => {
  return axios.post('/jtds/Admin_Account/accountList', Qs.stringify(params)).then(res => res.data)
}

// 设置-添加账号
const addUserAccount = (params) => {
  return axios.post('/jtds/Admin_Account/addAccount', Qs.stringify(params)).then(res => res.data)
}

// 设置-编辑账号
const editUserAccount = (params) => {
  return axios.post('/jtds/Admin_Account/editAccount', Qs.stringify(params)).then(res => res.data)
}

// 设置-删除账号
const delUserAccount = (params) => {
  return axios.post('/jtds/Admin_Account/delAccount', Qs.stringify(params)).then(res => res.data)
}

// 设置-账号详情
const getUserAccountDetail = (params) => {
  return axios.post('/jtds/Admin_Account/accountDetail', Qs.stringify(params)).then(res => res.data)
}

// 拉取当前账号的权限
const getUserAccountAuth = (params) => {
  return axios.post('/jtds/Admin_Account/accountAuth', Qs.stringify(params)).then(res => res.data)
}

//拉取用户列表
const getUserList = (params) => {
  return axios.post('/jtds/Admin_User/userList', Qs.stringify(params)).then(res => res.data)
}

//拉取修改记录列表
const getRecordList = (params) => {
  return axios.post('/jtds/Admin_Logs/loglist', Qs.stringify(params)).then(res => res.data)
}


// get请求
// const queryUserData = (obj) => {
//   return axios.get('users', {params: obj}).then(res => res.data)
// }

export default {
  checkLogin,
  checkLogout,
  forgetPsd,
  checkMsg,
  sendMsg,
  sendImg,
  getYqm,
  creatYqm,
  editYqm,
  delYqm,
  sendYqm,
  sendCoupon,
  addGood,
  editGood,
  getGoodList,
  delGood,
  addGoodDesc,
  editGoodDesc,
  delGoodDesc,
  getGoodDescList,
  getOrderList,
  getOrderDetail,
  delOrder,
  exportOrder,
  editExpress,
  addExpress,
  importExcel,
  exporttExcel,
  getStorageList,
  getGoodsStorage,
  getUserAccountList,
  addUserAccount,
  editUserAccount,
  delUserAccount,
  getUserAccountDetail,
  getUserAccountAuth,
  getUserList,
  getRecordList
}
