import { createStore } from 'vuex'
import user from './user'
import menu from './menu'
import logic from './logic'

const store = createStore({
    state () {
        return {

        }
    },
    
    actions: {
        
    },

    mutations: {
        
    },

    modules: {
        user,
        menu,
        logic
    }
})

export default store