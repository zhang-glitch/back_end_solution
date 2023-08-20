<template>
  <div class="role-list">
    <el-table :data="roles">
      <el-table-column label="#" type="index" :index="1"></el-table-column>
      <el-table-column label="角色名称" prop="title"></el-table-column>
      <el-table-column label="描述" prop="describe"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="handleShowModel(row.id)"
            >分配角色权限</el-button
          ></template
        >
      </el-table-column>
    </el-table>
    <DistributePermission v-model="permissionModel" :roleId="roleId" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { roleList } from '@/api/role'
import DistributePermission from './components/distribute-permission.vue'

const roles = ref([])
const permissionModel = ref(false)
const roleId = ref('')

const getRoleList = async () => {
  const data = await roleList()
  roles.value = data
}
getRoleList()

/**
 * 展示model
 */
const handleShowModel = (id) => {
  roleId.value = id
  permissionModel.value = true
}

watch(permissionModel, (val) => {
  if (!val) {
    getRoleList()
  }
})
</script>

<style lang="scss" scoped></style>
