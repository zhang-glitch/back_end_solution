<template>
  <div class="upload-excel">
    <!-- <el-upload
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
      accept=".xls, .xlsx"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </el-upload> -->

    <!-- 自定义拖拽或者点击上传 -->
    <!-- <div class="click-upload">
      <el-button type="primary" @click="handleClickUpload">点击上传</el-button>
    </div> -->
    <input
      type="file"
      accept=".xls, .xlsx"
      ref="inputRef"
      class="file-input"
      @change="handleChangeFile"
    />
    <div
      class="drag-upload"
      @click="handleClickUpload"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon class="upload-icon"><FolderAdd /></el-icon>
    </div>

    <div class="template">
      模板下载：<a href="../../assets/example.xlsx" download>example.xlsx</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 对于三方库没有默认导出，我们可以使用 * as 来处理
import * as XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'
import { ElLoading, ElMessage } from 'element-plus'

const props = defineProps({
  beforeUpload: Function,
  successUpload: Function
})

const inputRef = ref(null)
/**
 * 点击按钮，触发input click事件
 */
const handleClickUpload = () => {
  if (inputRef.value) {
    inputRef.value.click()
  }
}

/**
 * 获取文件对象
 */
const handleChangeFile = (e) => {
  const files = e.target.files
  if (!files.length) return

  const rawFile = files[0]
  upload(rawFile)
}

/**
 * 处理文件上传
 */
const upload = (file) => {
  if (!props.beforeUpload) {
    readerData(file)
    return
  }

  // 如果传入的beforeUpload返回true，将继续处理，否则终止处理，即停止上传
  const flag = props.beforeUpload()
  if (flag) {
    readerData(file)
  }
}

/**
 * 处理数据
 */

const readerData = (file) => {
  const loading = ElLoading.service()
  return new Promise((resolve) => {
    // 创建文件读取对象
    const readFile = new FileReader()
    // 将数据传出为二进制数组
    readFile.readAsArrayBuffer(file)
    readFile.onload = (e) => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体，将其解析成json格式
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. loading 处理
      loading.close()
      // 9. 异步完成
      resolve()
    }
  })
}

/**
 * 根据导入内容，生成数据
 */
const generateData = (excelData) => {
  props.successUpload && props.successUpload(excelData)
}

/**
 * 拖拽文本释放时触发
 */
const handleDrop = (e) => {
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return false
  }
  // 触发上传事件
  upload(rawFile)
}

/**
 * 拖拽悬停时触发
 */
const handleDragover = (e) => {
  // 在新位置生成源项的副本,目的是让其可以拿到文件对象
  e.dataTransfer.dropEffect = 'copy'
}
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .file-input {
    display: none;
    z-index: -9999;
  }

  .drag-upload {
    /* font-size:  */
    width: 150px;
    height: 150px;
    border: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    .upload-icon {
      font-size: 60px;
    }
  }

  .template {
    margin-top: 20px;
    font-size: 18px;
  }
}
</style>
