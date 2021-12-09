import { postKeyValueRequest, get, post, put, del } from '@/utils/request'

//查询所有逻辑数据
export function logicData(data) { return get('/logicData/', data) }

//保存数据
export function logicDataEdit(data) { return put('/logicData/', data) }