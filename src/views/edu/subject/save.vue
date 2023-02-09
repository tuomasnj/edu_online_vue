<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">点击下载模板查看上传数据的格式要求</el-tag>
        <br/>
        <el-tag>
          <i class="el-icon-download"/>
          <a
            :href="OSS_PATH + '/excel/%25E8%25AF%25BE%25E7%25A8%258B%25E5%2588%2586%25E7%25B1%25BB%25E5%2588%2597%25E8%25A1%25A8%25E6%25A8%25A1%25E6%259D%25BF.xlsx'">下载模版</a>
        </el-tag>
      </el-form-item>
      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/eduService/edu-subject/addSubject'"
          name="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">{{ fileUploadBtnText }}
          </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      OSS_PATH: "https://education-online0101.oss-cn-nanjing.aliyuncs.com",
      fileUploadBtnText: "上传到服务器",
      loading: false,
      importBtnDisabled: false
    }
  },
  methods: {
    submitUpload() {
      this.importBtnDisabled = true
      this.loading = true
      this.$refs.upload.submit()
    },
    fileUploadSuccess(response) {
      this.fileUploadBtnText = '上传成功'
      this.loading = false
      this.$message({
        type: 'success',
        message: response.message
      })
      //跳转到树状图页面
      this.$router.push({path: '/subject/tree'})
    },
    fileUploadError(response) {
      this.fileUploadBtnText = '上传失败'
      this.loading = false
      this.$message({
        type: 'error',
        message: response.message
      })
    }
  },
  created() {

  }
}
</script>

