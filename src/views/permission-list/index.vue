<template>
  <div class="permission-list">
    <el-table
      :data="permissions"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- <el-table-column type="expand" label="#">
        <template #default="{ row }">
          <template v-if="row.children && row.children.length">
            <template v-for="item in row.children" :key="item.id">
              <el-table-column :prop="item.permissionName"></el-table-column>
              <el-table-column :prop="item.permissionDesc"></el-table-column>
              <el-table-column :prop="item.permissionMark"></el-table-column>
            </template>
          </template>
        </template>
      </el-table-column> -->
      <el-table-column label="权限名称" prop="permissionName">
      </el-table-column>
      <el-table-column label="权限描述" prop="permissionDesc">
      </el-table-column>
      <el-table-column label="权限标识" prop="permissionMark">
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { permissionList } from '@/api/permission'

const permissions = ref([])

const getPermissions = async () => {
  const data = await permissionList()
  // console.log('darta', data)
  // const _data = data.map((item) => {
  //   if (item.children && item.children.length) {
  //     item.hasChildren = true
  //   } else {
  //     item.hasChildren = false
  //   }
  //   return item
  // })
  // permissions.value = _data
  permissions.value = data
}

getPermissions()
</script>

<style lang="scss" scoped></style>
