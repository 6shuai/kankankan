import { postKeyValueRequest, get, post, put, del } from '@/utils/request'

//游戏状态列表
export function gameStateList(data) { return get('/gameConfig/gameState', data) }

//游戏配置列表
export function gameConfigList(data) { return get('/gameConfig/', data) }

//新建游戏配置
export function gameConfigCreate(data) { return post('/gameConfig/', data) }

//查询游戏配置详情
export function gameConfigDetail(data) { return get('/gameConfig/details', data) }

//删除游戏配置
export function gameConfigDelete(data) { return del(`/gameConfig/?id=${data}`) }

