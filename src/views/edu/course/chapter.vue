<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>
    <el-button type="text" @click="openChapterDialog">添加章节</el-button>
    <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
      <el-form :model="chapter">
        <el-form-item label="章节标题" :label-width="formLabelWidth">
          <el-input v-model="chapter.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" :label-width="formLabelWidth">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加小节">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">收费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-exceed="handleUploadExceed"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :action="BASE_API+'/eduvod/video/upload'"
            :file-list="fileList"
            :limit="1"
            class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            &nbsp;
            <el-tooltip placement="right-end">
              <div slot="content">最大支持2G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question"/>
            </el-tooltip>
            <br>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary"
                   @click="saveOrUpdateVideo">确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 章节 -->
    <ul class="chanpterList">
      <li
        v-for="chapter in chapterVideoList"
        :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
          <el-button type="text" @click="openVideo(chapter.id)">添加小节</el-button>
          <el-button style="" type="text" @click="openEditChapterWindow(chapter.id)">编辑</el-button>
          <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
        </span>
        </p>
        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li
            v-for="video in chapter.children"
            :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
              <el-button style="" type="text" @click="openEditVideoWindow(video.id)">编辑</el-button>
              <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>
<script>
import chapter from "@/api/edu/chapter";
import video from '@/api/edu/video'

export default {
  data() {
    return {
      chapter: {
        id: "",
        courseId: "",
        title: "",
        sort: 0
      },
      video: {
        title: '',
        sort: 0,
        isFree: false,
        videoSourceId: '',
        videoOriginalName: '',
        fileName: '',
        url: ''
      },
      dialogVideoFormVisible: false,//小节弹框
      formLabelWidth: "120px",
      dialogFormVisible: false,//章节弹框
      saveBtnDisabled: false, // 保存按钮是否禁用
      saveVideoBtnDisabled: false,
      chapterVideoList: [],
      courseId: "",
      BASE_API: "http://192.168.2.3:8003"
    }
  },
  created() {
    this.init()
    this.getChapterVideo(this.courseId)
  },
  methods: {
    handleVodRemove() {
      video.deleteAliyunVideo(this.video.videoSourceId).then(response => {
        this.$message({
          type: 'success',
          message: '删除视频成功！'
        })
        this.fileList = []
        this.video.videoSourceId = ''
        this.video.videoOriginalName = ''
      })
    },
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除${file.name}?`)
    },

    //上传视频成功后回调的方法
    handleVodUploadSuccess(response, file) {
      this.video.videoSourceId = response.data.id
      this.video.videoOriginalName = file.name
    },

    //上传的文件超出数量限制后回调的方法
    handleUploadExceed() {
      this.$message.warning('想要重新上传视频请先删除已经上传的视频')
    },
    //======================================小节操作========================================================
    removeVideo(videoId) {
      this.$confirm('此操作将删除该小节，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {//点击确定执行then方法
        video.deleteVideo(videoId).then(response => {//删除成功
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.getChapterVideo(this.courseId)//刷新页面
        })
      })
    },

    //修改小节函数
    openEditVideoWindow(videoId) {
      video.getVideo(videoId).then(response => {
        this.openVideoDialog()
        this.video = response.data.video
      })
    },

    openVideoDialog() {
      this.dialogVideoFormVisible = true
      this.video.title = ''
      this.video.sort++
      this.fileList = []
    },
    updateTheVideo() {
      video.updateVideo(this.video).then(response =>{
        this.dialogVideoFormVisible = false
        this.$message({
          type: "success",
          message: "修改小节信息成功"
        })
        this.getChapterVideo(this.courseId)
        //清空Video实例的Id
        this.video.id = ""
      })
    },
    saveVideo() {
      this.video.courseId = this.courseId
      video.addVideo(this.video).then(response => {
        //关闭弹框
        this.dialogVideoFormVisible = false

        //提示信息
        this.$message({
          type: "success",
          message: "添加小节成功"
        })

        //刷新页面
        this.getChapterVideo(this.courseId)
      })
    },
    saveOrUpdateVideo() {
      if (this.video.id) {
        this.updateTheVideo()
      } else {
        this.saveVideo()
      }
    },
    openVideo(chapterId) {
      //弹框
      this.openVideoDialog()
      this.video.id = ''
      //设置章节id
      this.video.chapterId = chapterId
    },
    //======================================章节操作========================================================
    //删除章节
    removeChapter(chapterId) {
      this.$confirm('此操作将删除章节，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {//点击确定执行then方法
        chapter.deleteChapter(chapterId).then(response => {//删除成功
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.getChapterVideo(this.courseId)//刷新页面
        })
      })
      //点击取消 执行catch方法
    },

    //修改章节函数
    openEditChapterWindow(chapterId) {
      chapter.getChapter(chapterId).then(response => {
        this.openChapterDialog()
        this.chapter = response.data.chapter
      })
    },

    //弹出添加章节页面
    openChapterDialog() {
      this.dialogFormVisible = true
      this.chapter.title = ''
      this.chapter.sort++
    },
    updateChapter() {
      chapter.updateChapter(this.chapter).then(response => {
        //关闭弹框
        this.dialogFormVisible = false

        //提示信息
        this.$message({
          type: "success",
          message: "修改章节信息成功"
        })

        //刷新页面
        this.getChapterVideo(this.courseId)

        //清空chapterId
        this.chapter.id = ""
      })
    },

    saveChapter() {
      //设置chapter对象的courseId值
      this.chapter.courseId = this.courseId

      chapter.addChapter(this.chapter).then(response => {
        //关闭弹框
        this.dialogFormVisible = false

        //提示信息
        this.$message({
          type: "success",
          message: "添加章节成功"
        })

        //刷新页面
        this.getChapterVideo(this.courseId)
      })
    },

    saveOrUpdate() {
      if (this.chapter.id) {
        this.updateChapter()
      } else {
        this.saveChapter()
      }
    },

    //获取请求地址中的参数courseId值
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
      }
    },
    getChapterVideo(id) {
      chapter.getAllChapterAndVideo(id).then(response => {
        this.chapterVideoList = response.data.allChapterAndVideo
      })
    },
    previous() {
      this.$router.push({path: '/course/info/' + this.courseId})
    },
    next() {
      this.$router.push({path: '/course/publish/' + this.courseId})
    }
  }
}
</script>

<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.chanpterList li {
  position: relative;
}

.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}

.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}

.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>
