<script setup>
    import { Plus, InfoFilled } from '@element-plus/icons'
    import { ElMessage } from 'element-plus'
    import { onMounted } from 'vue'
    import { gameConfigList, gameConfigDelete } from '@/api/gameConfig'
    import { debounce } from '@/utils/index'
    import CreateConfig from './components/CreateConfig.vue'

    onMounted(() => {
        getConfigList()  
    })

    //列表总条数
    let total = $ref(0)

    //配置搜索参数
    let params = $ref({
        pageNo: 1,
        pageSize: 40
    })

    //配置列表
    let tableData = $ref([])
    let tableLoading = $ref(false)
    const getConfigList = () => {
        tableLoading = true
        gameConfigList(params).then(res => {
            tableLoading = false
            if(res.result){
                let { list, totalRecords } = res.obj
                tableData = list
                total = totalRecords
            }
        })
    }

    //分页
    const handleChangePage = (page) => {
        params.pageNo = page
        getConfigList()
    }

    //搜索
    const handleSearch = () => {
        params.pageNo = 1
        debounce(getConfigList)
        // getConfigList()
    }


    //显示创建窗口
    let createConfig = $ref(null)
    const handleShowDialog = () => {
        createConfig.showDialog()
    }

    //编辑
    const handleEdit = (id) => {
        createConfig.showDialog(id)
    }

    //创建成功
    const createdSuccess = () => {
        getConfigList()
    }

    //删除配置
    const handleConfirmDelete = (id) => {
        gameConfigDelete(id).then(res => {
            if(res.result){
                ElMessage.success('删除成功~')
                getConfigList()
            }
        })
    }

</script>

<template>
    <el-card>
        <template #header>游戏配置</template>
        <div class="game_config">
            <el-button 
                type="primary"
                :icon="Plus"
                @click="handleShowDialog"
            >新建配置</el-button>

            <el-input 
                clearable
                v-model="params.displayName"
                placeholder="输入关键字按下回车搜索"
                @keyup.enter="handleSearch"
                @input="handleSearch"
            ></el-input>

            <el-table 
                :loading="tableLoading"
                stripe
                border
                :data="tableData"
            >
                <el-table-column prop="displayName" label="配置名称" min-width="180" />
                <el-table-column prop="description" label="配置描述" min-width="250" />
                <el-table-column prop="description" label="操作" width="150">
                    <template #default="scope">

                        <el-button
                            type="primary"
                            size="small"
                            @click="handleEdit(scope.row.id)"
                        >
                            编辑
                        </el-button>

                        <el-popconfirm
                            confirm-button-text="确定"
                            cancel-button-text="取消"
                            :icon="InfoFilled"
                            icon-color="red"
                            title="确定要删除此配置吗?"
                            @confirm="handleConfirmDelete(scope.row.id)"
                        >
                            <template #reference>
                                <el-button
                                    size="small"
                                    type="danger"
                                    plain
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>

            <el-pagination 
                background 
                :hide-on-single-page="true"
                layout="prev, pager, next" 
                :total="total"
                :current-page="params.pageNo"
                :page-size="params.pageSize"
                @current-change="handleChangePage"
            >
            </el-pagination>

        </div>

        <!-- 创建配置 -->
        <create-config
            ref="createConfig"
            @createdSuccess="createdSuccess"
        ></create-config>

    </el-card>
</template>

<style lang="less" scoped>
    .game_config{

        .el-input{
            width: 250px;
            margin-left: 20px;
        }

        .el-table{
            margin-top: 20px;
        }

        .el-pagination{
            text-align: right;
            padding-top: 20px;
        }
    }
</style>