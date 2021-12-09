
const user = {
    namespaced: true,
    state: () => ({
        //生成对象总数量
        generateTreeCount: null,

        //蓄力值加成
        accumulatorAddition: null,

        //本场得分
        roundScore: null,

        //自动交互对象总数
        autoInteractionTotal: null,

        //逻辑数据
        logicDatas: [],

        //玩家状态数据
        playerStates: []

    }),

    mutations: {
        setLogicDatas(state, data){
            var arr = Object.getOwnPropertyNames(data)
            state.logicDatas = arr.map(function(i){return data[i]})

        },

        setPlayerStates(state, data){
            var arr = Object.getOwnPropertyNames(data)
            state.playerStates = arr.map(function(i){return data[i]})
        }

    },

    actions: {
        
    }
}

export default user