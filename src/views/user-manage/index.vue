<template>
  <div class="user-manager">
    <!-- 选换判断动态渲染插槽，会出现问题。 Cannot read properties of undefined (reading 'type') -->
    <!-- <el-table :data="userList">
      <template v-for="column in tableColumn" :key="column.prop">
        <template v-if="column?.prop === 'avatar'">
          <el-table-column :label="column.label">
            <template #default="{ row }">
              <el-avatar :size="25" :src="row.avatar"></el-avatar>
            </template>
          </el-table-column>
        </template>
        <template v-if="column?.prop === 'role'">
          <el-table-column :label="column.label">
            <template>
              <template #default="{ row }">
                <el-tag v-for="tagItem in row?.role" :key="tagItem?.id">
                  {{ tagItem.title }}
                </el-tag>
              </template>
            </template>
          </el-table-column></template
        >
        <el-table-column v-else :label="column.label" :prop="column.prop">
        </el-table-column>
      </template>
    </el-table> -->
    <el-card>
      <el-button
        type="primary"
        @click="handleImportExcel"
        v-permission="'importUser'"
        >导入</el-button
      >
      <el-button type="success" @click="handleExportExcel">导出</el-button>
    </el-card>
    <el-table :data="userList">
      <el-table-column label="#" type="index" index="1" />
      <el-table-column label="头像">
        <template #default="{ row }">
          <el-avatar :size="25" :src="row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username"> </el-table-column>

      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column label="角色">
        <template #default="{ row }">
          <template v-if="row.role && row.role.length">
            <el-tag v-for="tagItem in row?.role" :key="tagItem?.id">
              {{ tagItem.title }}
            </el-tag>
          </template>
          <el-tag v-else>未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template #default="{ row }">
          {{ $timeFormat(row.openTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="260">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="default"
            @click="handleShowClick(row._id)"
            >{{ $t('msg.excel.show') }}</el-button
          >
          <el-button
            type="info"
            size="default"
            @click="handleShowRoleClick(row)"
            v-permission="['distributeRole']"
            >{{ $t('msg.excel.showRole') }}</el-button
          >
          <el-popconfirm
            title="你确定要删除该用户?"
            @confirm="handleEnsureDelete(row)"
          >
            <template #reference>
              <el-button
                type="danger"
                size="default"
                v-permission="['removeUser']"
                >{{ $t('msg.excel.remove') }}</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      v-model:current-page="reqParams.page"
      :page-sizes="[2, 5, 10, 20]"
      v-model:page-size="reqParams.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <!-- 导入 -->
    <el-dialog v-model="dialogVisible" title="导入" width="40%">
      <upload-excel :successUpload="successUpload"></upload-excel>
    </el-dialog>
    <!-- 导出 -->
    <el-dialog v-model="exportDialogVisible" title="导出" width="40%">
      <download-excel v-model:templateValue="templateValue"></download-excel>
      <template #footer>
        <el-button @click="exportDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEnsureExport"> 确认 </el-button>
      </template>
    </el-dialog>
    <!-- 分配角色 -->
    <DistributeRole v-model="roleDialog" :roleId="roleId" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
// import { tableColumn } from './data'
import {
  getUserList,
  userBatchImport,
  deleteUser,
  getUserManageAllList
} from '@/api/user-manager'
import UploadExcel from '@/components/upload-excel/index.vue'
import DownloadExcel from '@/components/download-excel/index.vue'
import { ElMessage } from 'element-plus'
import { USER_RELATIONS, formatDate } from './data'
// eslint-disable-next-line camelcase
import { export_json_to_excel } from '@/utils/Export2Excel'
import { $timeFormat } from '@/utils/filter'
import { useRouter } from 'vue-router'
import DistributeRole from './components/distribute-role.vue'

const router = useRouter()
const reqParams = ref({
  page: 1,
  size: 5
})

const userTotal = ref(0)
const userList = ref([])
const dialogVisible = ref(false)
const exportDialogVisible = ref(false)
const templateValue = ref('')
const roleDialog = ref(false)
const roleId = ref('')
// const globalProperties = getCurrentInstance().appContext.config.globalProperties

/**
 * 获取员工列表
 */
const fetchUserList = async () => {
  const { total, list } = await getUserList(reqParams.value)
  userTotal.value = total
  userList.value = list
}
fetchUserList()
console.log('router.getRoutes()', router.getRoutes())
/**
 * 查看详情
 */
const handleShowClick = (id) => {
  router.push(`/user/info?id=${id}`)
}
/**
 * 查看角色
 */
const handleShowRoleClick = (row) => {
  roleId.value = row._id
  roleDialog.value = true
}
watch(roleDialog, (val) => {
  if (!val) {
    fetchUserList()
  }
})
/**
 * 删除
 */
const handleEnsureDelete = async (userInfo) => {
  await deleteUser(userInfo._id)
  await fetchUserList()
}

/**
 * 页数量改变
 * 其实最新的语法，size, page都是双向绑定。我们可以在改变时，直接请求即可。
 */
const handleSizeChange = () => {
  fetchUserList()
}

/**
 * 切换当前页时触发
 */
const handleCurrentChange = () => {
  fetchUserList()
}

/**
 * 导入
 */
const handleImportExcel = () => {
  dialogVisible.value = true
}

/**
 * 导出
 */
const handleExportExcel = async () => {
  exportDialogVisible.value = true
}

/**
 * 筛选数据
 */
const generateData = (results) => {
  const arr = []
  console.log('results', results)
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}

/**
 * 成功处理数据后的回调, 批量导入
 */
const successUpload = async (data) => {
  const _data = generateData(data.results)
  try {
    await userBatchImport(_data)
    // ElMessage.success('导入成功')
    // 重新刷新
    fetchUserList()
  } catch (error) {
    ElMessage.error('导入失败')
  } finally {
    dialogVisible.value = false
  }
}

/**
 * 确认导出
 */
const handleEnsureExport = async () => {
  // 获取当前所有用户
  const { list } = await getUserManageAllList()
  if (list && list.length) {
    // 转换数据
    const headers = Object.keys(USER_RELATIONS)
    const data = transformData(list)
    console.log('data', data)
    export_json_to_excel({
      header: headers,
      // 二维数组
      data,
      // 文件名称
      filename: templateValue.value,
      // 是否自动列宽
      autoWidth: true,
      // 文件类型
      bookType: 'xlsx'
    })
  }
  exportDialogVisible.value = false
}

const transformData = (data) => {
  // [{ username: '张三', roles: [{title: '主管'}], openTime: "2023-8-19"},{},{}]
  //  => [[['张三', ['主管', '员工'], "2023-8-19"]],[],[]]
  // key 表示对应excel表头汉字。这里返回格式 ['张三', ['主管', '员工'], "2023-8-19"]
  return data.map((item) => {
    return Object.keys(USER_RELATIONS).map((key) => {
      const header = USER_RELATIONS[key]
      // 处理roles
      if (header === 'role') {
        return JSON.stringify(item.role.map((roleItem) => roleItem.title))
      }
      // 处理时间
      if (USER_RELATIONS[key] === 'openTime') {
        return $timeFormat(item[header])
      }
      return item[header]
    })
  })
}
</script>

<style lang="scss" scoped>
.user-manager {
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
