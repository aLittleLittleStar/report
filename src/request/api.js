import fetch from './fetch'
// 登录相关
export const login = (userInfo) => fetch('/jiti/login', userInfo, 'POST')
export const logout = () => fetch('/jiti/logout')
export const updatePwd = (userInfo) => fetch('/jiti/password', userInfo, 'POST')
export const getMenuList = () => fetch('/jiti/menu')

// 系统管理---角色列表
export const getRoleList = () => fetch('/jiti/userroles')
export const setRole = (data) => fetch('/jiti/userrole', data, 'POST')
// 权限列表
export const getAuthorList = () => fetch('/jiti/privileges')

// 录入列表
export const getDataList = (search) => fetch('/jiti/datainput'+search)
export const addData = (data) => fetch('/jiti/datainput',data,'POST')
export const delData = (data) => fetch('/jiti/datarm',data,'POST')
export const newData = (data) => fetch('/jiti/data',data,'POST')

// 批量复用
export const batchReuse = (data) => fetch('/jiti/datacopy',data,'POST')

// 计提报表
export const getReportList = (search) => fetch('/jiti/report'+search)
export const editData = (data) => fetch('/jiti/report',data,'POST')
export const editJiti = (data) => fetch('/jiti/jiti',data,'POST')

// 渠道管理
export const setChannel = (data) => fetch('/jiti/channel',data, 'POST')
export const getChannelList = (data) => fetch('/jiti/channel'+data)
// 客户管理
export const setCustomer = (data) => fetch('/jiti/customer',data, 'POST')
export const getCustomerList = (data) => fetch('/jiti/customer'+data)
// 活动管理
export const setCampaign = (data) => fetch('/jiti/campaign',data, 'POST')
export const removeCampaign = (data) => fetch('/jiti/camprm',data, 'POST')
export const getCampaignList = (data) => fetch('/jiti/campaign'+data)
// 包号管理
export const setPackage = (data) => fetch('/jiti/pkgmg',data, 'POST')
export const removePackage = (data) => fetch('/jiti/packrm',data, 'POST')
export const getPackageList = (data) => fetch('/jiti/pkgmg'+data)
export const savePkgInfo = (data) => fetch('/jiti/pkgbatch',data, 'POST')
// 员工管理
export const setStaff = (data) => fetch('/jiti/staff',data, 'POST')
export const getStaffList = (data) => fetch('/jiti/staff'+data)
// 用户管理
export const setUser = (data) => fetch('/jiti/jitiuser',data,'POST')
export const getUserList = (data) => fetch('/jiti/jitiuser'+ data)
// 修改密码 冻结 解冻
export const setPwd = (data) => fetch('/jiti/pwd',data,'POST')
export const setFreezeUser = (data) => fetch('/jiti/freeze',data,'POST')
export const setUnFreezeUser = (data) => fetch('/jiti/unfreeze',data,'POST')

