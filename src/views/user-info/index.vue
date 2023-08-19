<template>
  <div class="user-info">
    <el-card>
      <el-button type="primary" :loading="printLoading" v-print="printObj"
        >打印</el-button
      >
    </el-card>
    <!-- 打印区域 -->
    <div id="userInfoBox">
      <el-descriptions
        title="员工信息"
        direction="horizontal"
        :column="3"
        :size="size"
        border
      >
        <el-descriptions-item label="姓名">{{
          userInfo.username
        }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{
          userInfo.gender
        }}</el-descriptions-item>
        <el-descriptions-item label="" :span="3">
          <img :src="userInfo.avatar" alt="" />
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions direction="horizontal" :column="3" :size="size" border>
        <el-descriptions-item label="民族"
          >{{ userInfo.nationality }}
        </el-descriptions-item>
        <el-descriptions-item label="手机号">
          {{ userInfo.mobile }}
        </el-descriptions-item>
        <el-descriptions-item label="居住地">
          {{ userInfo.address }}
        </el-descriptions-item>
        <el-descriptions-item label="入职时间">
          {{ $timeFormat(userInfo.openTime) }}
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          <template v-if="userInfo.remark && userInfo.remark.length">
            <el-tag
              v-for="(item, index) in userInfo.remark"
              :key="index"
              style="margin-right: 10px"
              >{{ item }}
            </el-tag>
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">
          {{ userInfo.address }}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions border title="" :column="1" direction="vertical">
        <el-descriptions-item label="经历">
          <el-table :data="userInfo.experience" :border="false">
            <el-table-column label="时间段">
              <template v-slot="{ row }">
                {{ $timeFormat(row.startTime) }} --
                {{ $timeFormat(row.endTime) }}
              </template>
            </el-table-column>
            <el-table-column label="公司 / 平台" prop="title"></el-table-column>
            <el-table-column label="介绍" prop="desc"></el-table-column>
          </el-table>
        </el-descriptions-item>
        <el-descriptions-item label="专业">{{
          userInfo.major
        }}</el-descriptions-item>
        <el-descriptions-item label="荣耀">{{
          userInfo.glory
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userDetail } from '@/api/user-manager'
import { useRoute } from 'vue-router'

const route = useRoute()
const { id } = route.query
const userInfo = ref({})

const getUserInfo = async () => {
  const data = await userDetail(id)
  userInfo.value = data
}

getUserInfo()

/**
 * 打印
 */
const printLoading = ref(false)
const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: '成员信息',
  // 打印前
  beforeOpenCallback(vue) {
    printLoading.value = true
  },
  // 执行打印
  openCallback(vue) {
    printLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  ::v-deep(.el-descriptions__header) {
    display: flex;
    justify-content: center;
  }
}
</style>
