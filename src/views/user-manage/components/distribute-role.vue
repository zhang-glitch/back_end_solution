<template>
  <div class="distribute-permission">
    <el-dialog v-model="dialogVisible" @close="handleClose">
      <el-checkbox-group v-model="existRoleList">
        <el-checkbox :label="item.title" v-for="item in roles" :key="item.id" />
      </el-checkbox-group>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="handleEnsure" type="primary">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { roleList } from '@/api/role'
import { userRoles, updateRole } from '@/api/user-manager'

const roles = ref([])
const existRoleList = ref([])

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

watch([() => props.modelValue, () => props.roleId], ([modelValue, roleId]) => {
  dialogVisible.value = modelValue
  if (modelValue && roleId) {
    // 获取当前用户的角色列表
    getExistRoleList()
  }
})

const emits = defineEmits(['update:modelValue'])

/**
 * 点击确定
 */
const handleEnsure = async () => {
  await updateRole({
    roles: roles.value.filter((item) => {
      return existRoleList.value.includes(item.title)
    }),
    id: props.roleId
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
 * 获取所有角色
 */
const getRoleList = async () => {
  const data = await roleList()
  roles.value = data
}
getRoleList()

/**
 * 获取当前用户已经存在的列表数据
 */
const getExistRoleList = async () => {
  const data = await userRoles(props.roleId)
  existRoleList.value = data?.role?.map((item) => item?.title)
}
</script>

<style scoped></style>
