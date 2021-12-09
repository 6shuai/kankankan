import { postKeyValueRequest, get, post, put, del } from '@/utils/request'

//组织列表
export function organizationList(data) { return get('/organization/', data) }

//项目列表
export function projectList(data) { return get('/project/', data) }

//添加项目
export function projectCreate(data) { return post('/project/', data) }

//删除项目
export function projectDelete(data) { return del(`/project/?id=${data}`) }

//项目详情
export function projectDetail(data) { return get('/project/details', data) }
