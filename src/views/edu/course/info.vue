<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程"/>
      </el-form-item>
      <!-- 所属分类-->
      <el-form-item label="课程类别">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectChange">
          <el-option
            v-for="subject in subjectList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
        &nbsp;
        <el-select
          v-model="courseInfo.subjectId"
          placeholder="二级分类">
          <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">
          <!--el-option中value的值是什么，v-model就给属性绑定这个值;例如用户选择下拉框中的某一个教师名称，那data中的courseInfo.teacherId就等于被选择的教师Id-->
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right"
                         placeholder="请填写课程的总课时数"/>
      </el-form-item>
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss'"
          class="avatar-uploader">
          <img :src="courseInfo.cover" width="20%" height="20%" object-fit="contain">
        </el-upload>
      </el-form-item>

      <!--富文本编辑器-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" placeholder=""/>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder=""/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from "@/api/edu/course";
import teacher from "@/api/edu/teacher";
import subject from "@/api/edu/subject";
import tinymce from "@/components/Tinymce/index.vue";

export default {
  //声明组件
  components: {tinymce},

  data() {
    return {
      courseId: "",
      BASE_API: "http://localhost:8002",
      teacherList: [],
      subjectList: [],
      subjectNestedList: [],
      saveBtnDisabled: false,
      courseInfo: {
        subjectId: "", //二级分类
        subjectParentId: "", //一级分类
        teacherId: "",
        id: "",
        title: "",
        price: "",
        lessonNum: "",
        description: "",
        cover: "https://education-online0101.oss-cn-nanjing.aliyuncs.com/2023/02/07/d56f4ecb3234408a9f4d1d2bfd13e1e5girl08.jpg"
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getCourseInfoById(this.courseId)
    }
    this.getAllTeachers()
    this.getAllSubjects()
  },
  watch: {
    courseInfo(val) {
      this.subjectNestedList = this.getSubjectById(this.courseInfo.subjectId)
    }
  },
  methods: {
    getSubjectById(id) {
      subject.querySubjectById(id).then(response => {
        this.subjectNestedList = response.data.result
      })
    },

    //根据课程id查询信息
    getCourseInfoById(id) {
      course.getCourseById(id).then(response => {
        this.courseInfo = response.data.course
      })
    },
    handleAvatarSuccess(response) { //文件上传成功调用的方法
      this.courseInfo.cover = response.data.url
    },
    beforeAvatarUpload(file) { //上传文件之前调用的方法
      const isJPG_PNG = file.type === 'image/jpeg' || file.type === 'image' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG_PNG) {
        this.$message.error('上传的图片不是JPG或PNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传的图片大小不能超过2MB!')
      }
      return isJPG_PNG && isLt2M
    },
    subjectChange(value) {
      for (let i = 0; i < this.subjectList.length; i++) {
        if (this.subjectList[i].id === value) {
          this.subjectNestedList = this.subjectList[i].children
          this.courseInfo.subjectId = this.subjectNestedList[0].id
        }
      }
    },
    getAllTeachers() {
      teacher.getAllTeacher().then(response => {
        this.teacherList = response.data.items
      })
    },
    getAllSubjects() {
      subject.getSubjectList().then(response => {
        this.subjectList = response.data.list
      })
    },
    addCourseInfo() {
      course.saveCourse(this.courseInfo).then(response => {
        this.$message({
          type: 'success',
          message: '添加课程信息成功'
        })
        this.courseInfo.id = response.data.courseId
        this.$router.push({path: '/course/chapter/' + this.courseInfo.id})
      })
    },
    updateCourseInfo() {
      course.updateCourse(this.courseInfo).then(response => {
        this.$message({
          type: 'success',
          message: '修改课程信息成功'
        })
        this.$router.push({path: '/course/chapter/' + this.courseInfo.id})
      })
    },
    saveOrUpdate() {
      if (!this.courseInfo.id) {
        //添加课程信息
        this.addCourseInfo()
      } else {
        //更新课程信息
        this.updateCourseInfo()
      }
    }
  }
}
</script>
