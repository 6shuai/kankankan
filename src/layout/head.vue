<!--
 * @Author: liushuai
 * @Date: 2021-12-02 15:40:06
 * @LastEditors: liushuai
 * @LastEditTime: 2021-12-02 15:48:29
 * @Description: file content
 * @FilePath: \echarts\apiAdmin\src\layout\head.vue
-->
<script setup>
    import { serverRefresh } from '@/api/user'
    import { ElMessage } from 'element-plus'
    import { ArrowDown, Refresh } from '@element-plus/icons'
    import { useRouter, useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    import { computed } from 'vue'

    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    
    //用户信息
    const userData = computed(() => store.state.user.loginData)

    if(localStorage.loginData) store.state.user.loginData = JSON.parse(localStorage.loginData)

    // 游戏服务器重新加载改动过的数据
    let refreshLoading = $ref(false)
    const handleRefresh = () => {
        refreshLoading = true
        serverRefresh().then(res => {
            refreshLoading = false   
            if(res.result){
                ElMessage.success('加载成功~')         
            }
        })
    }

</script>

<template>
    <div class="page-head">
        <div class="right">
            <el-button
                type="primary"
                size="mini"
                class="refresh_btn"
                :loading="refreshLoading"
                @click="handleRefresh"
                :icon="Refresh"
            >  
                服务器重新加载
            </el-button>
            <el-image 
                v-if="userData.avatar"
                fit="cover" 
                :src="userData.avatar"
            ></el-image>
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ userData.nickname || userData.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="router.push('/setting')">个人中心</el-dropdown-item>
                    <el-dropdown-item @click="store.commit('user/logout')">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<style lang="less">
    .page-head{
        width: calc(100% - 220px);
        height: 50px;
        background: #fff;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 99;
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);


        .right{
            float: right;
            height: 100%;
            padding-right: 10px;

            .refresh_btn{
                margin-right: 20px;
            }

            .el-image{
                width: 35px;
                height: 35px;
                border-radius: 50%;
                vertical-align: middle;
            }

            .el-dropdown{
                padding-left: 10px;
                color: #666;
                line-height: 50px;
            }
        }
    }
</style>