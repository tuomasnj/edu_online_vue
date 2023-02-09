<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right"
                         :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头像缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload"
                   @click="imagecropperShow=true">更换头像
        </el-button>
        <!--
           v-show：是否显示上传的弹框组件
           :key：类似于id，如果一个页面多个图片上传控件，可以做区分
           :url：后台上传的url地址
           @close：关闭上传组件
           @crop-upload-success：上传成功后的回调
        -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close()" @crop-upload-success="cropSuccess"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary"
                   @click="saveOrUpdate()">保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from "@/api/edu/teacher";
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: {ImageCropper, PanThumb},
  data() {
    return {
      teacher: {
        name: '',
        sort: 1,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      saveBtnDisabled: false, // 保存按钮是否禁用

      imagecropperShow: false,
      imagecropperKey: 1,
      BASE_API: process.env.VUE_APP_BASE_API//获取.en.development中的VUE_APP_BASE_API
    }
  },
  methods: {
    //关闭弹框
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(data) {
      //图片上传之后进行回显
      this.teacher.avatar = data.url
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },

    saveOrUpdate() {
      if (this.teacher.id) {
        this.updateDate(this.teacher.id)
      } else {
        this.saveData()
      }
      this.saveBtnDisabled = true
    },
    // 保存
    saveData() {
      teacher.saveTeacher(this.teacher).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(resposne => {
        this.$router.push({path: '/teacher/table'})
      })
    },
    //查询teacher信息
    getTeacher(id) {
      teacher.getTeacherById(id).then(response => {
        this.teacher = response.data.teacher
      })
    },
    //修改
    updateDate() {
      teacher.updateTeacher(this.teacher).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      })
      this.$router.push({path: '/teacher/table'})
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getTeacher(id)
    }
  }
}
</script>

<style>

</style>
