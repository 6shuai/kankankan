import { userLogout } from '@/api/user'
import router from '@/router/index'

const user = {
    namespaced: true,
    state: () => ({
        //登录用户数据
        loginData: {}
    }),

    mutations: {
        logout(state){
            userLogout().then(res => {
                localStorage.loginData = ''
                state.loginData = {}
                router.push('/login')
                location.reload() 
            })
        }
    },

    actions: {
        
    }
}

export default user