const uploadHost = 'http://123.206.83.233:8181/'

export const uploadImgAction = uploadHost + 'common/upload'

export const getJsonValue = (data) => {
    return Number(data.value || data.duration)
}