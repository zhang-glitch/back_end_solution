<template>
  <div class="distribute-permission">
    <el-dialog v-model="dialogVisible" @close="handleClose">
      <el-tree
        ref="treeRef"
        :data="permissions"
        show-checkbox
        check-strictly
        node-key="id"
        :props="defaultProps"
      />
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="handleEnsure" type="primary">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { distributePermission, rolePermission } from '@/api/role'
import { permissionList } from '@/api/permission'

const defaultProps = {
  children: 'children',
  label: 'permissionName',
  disabled: 'disabled'
}

const props = defineProps({
  modelValue: {
    type: Boolean
  },
  roleId: {
    type: [String, Number],
    required: true
  }
})

const dialogVisible = ref(props.modelValue)
const permissions = ref([])

watch([() => props.modelValue, () => props.roleId], ([modelValue, roleId]) => {
  dialogVisible.value = modelValue
  if (modelValue && roleId) {
    // 获取已存在的权限
    getExistPermissions()
  }
})

const emits = defineEmits(['update:modelValue'])

/**
 * 点击确定
 */
const handleEnsure = async () => {
  // 修改角色权限
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  dialogVisible.value = false
  emits('update:modelValue', false)
}
/**
 * 关闭
 *
 * 主动关闭并不会改变dialogVisible的值为false
 */
const handleClose = () => {
  emits('update:modelValue', false)
}

/**
 * 获取所有权限
 */
const getPermissions = async () => {
  const data = await permissionList()
  permissions.value = data
}
getPermissions()

/**
 * 获取当前角色已有权限
 */
const treeRef = ref(null)
const getExistPermissions = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}
</script>

<style scoped></style>
