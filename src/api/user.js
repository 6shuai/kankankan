import { postKeyValueRequest, get, post, put, del } from '@/utils/request'

//登录
export function userLogin(data) { return postKeyValueRequest('/sign_in', data) }

//退出登录
export function userLogout(data) { return get('/logout', data) }

//注册账号
export function userRegister(data) { return post('/entry/register/', data) }

//更新用户信息
export function userDataUpdate(data) { return put('/user/', data) }

//修改密码
export function userPasswordUpdate(data) { return put('/user/password', data) }

//游戏服务器重新加载
export function serverRefresh(data) { return post('/load_global', data) }