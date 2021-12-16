import { postKeyValueRequest, get, post, put, del } from '@/utils/request'

//查询机器人进入顺序
export function robotLevelData(data) { return get('/robot/level', data) }

//编辑机器人等级
export function robotLevelUpdate(data) { return put('/robot/level', data) }

//查询所有机器人数据
export function robotData(data) { return get('/robot/data', data) }

//编辑机器人数据
export function robotDataUpdate(data) { return put('/robot/data', data) }

