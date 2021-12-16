import { ElMessage } from "element-plus"

const uploadHost = 'http://123.206.83.233:8181/'

export const uploadImgAction = uploadHost + 'common/upload'

export const getJsonValue = (data) => {
    return Number(data.value || data.duration)
}

let timeout = null
//input 搜索防抖
export const debounce = (fn, delay = 300) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        fn.apply()
    }, delay);
}


//input输入框 是否可以输入正整数
export const BlurText = (e, valueType) => {
    if(valueType != 1) return
    let boolean = new RegExp('^[1-9][0-9]*$').test(e.target.value)
    if(!boolean){
        ElMessage.error('请输入正整数~')
        e.target.value = ''
    }
}