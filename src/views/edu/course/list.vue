<template>
  <div class="app-container">
    <!-- 输入查询条件的表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程发布状态">
          <!--这里value之前不需要加冒号-->
          <el-option value='Normal' label="已发布"/>
          <el-option value='Draft' label="未发布"/>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData">清空</el-button>
    </el-form>
    <el-table
      :data="courseData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column align="center" prop="title" label="课程名称" width="420"></el-table-column>
      <el-table-column align="center" prop="price" label="价格" width="120"></el-table-column>
      <el-table-column align="center" prop="lessonNum" label="课时数" width="120"></el-table-column>
      <el-table-column align="center" prop="status" label="课程状态" width="120">
        <template v-slot="scope">
          {{ scope.row.status === 'Normal' ? '已发布' : '未发布' }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="viewCount" label="浏览量" width="120"></el-table-column>
      <el-table-column align="center" prop="gmtCreate" label="创建时间" width="160"></el-table-column>
      <el-table-column align="center" label="操作" width="600">
        <template v-slot="scope">
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>
          &nbsp;<router-link :to="'/course/chapter/' + scope.row.id">
          <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
        </router-link>
          &nbsp;
          <el-button type="danger" size="mini" icon="el-icon-delete"
                     @click="removeDataById(scope.row.id)">删除课程信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import course from "@/api/edu/course";

export default {
  methods: {
    removeDataById(id) {
      this.$confirm('此操作将永久删除该课程记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        course.deleteCourse(id)
          .then(response => {
            //提示信息
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            //查列表数据的方法必须在then内部执行，否则数据会有问题
            this.getList()
          })
      }).catch(() =>{
        //执行取消的逻辑
      })
    },
    getList(page = 1) {
      this.page = page
      course.getCourseListPage(this.page, this.limit, this.courseQuery)
        .then(response => {
          this.total = response.data.total
          this.courseData = response.data.rows
        })
    },
    resetData() {
      this.courseQuery.title = ''
      this.courseQuery.status = ''
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 4 === 1) {
        return 'success-row';
      } else if (rowIndex % 4 === 3) {
        return 'warning-row';
      }
      return '';
    }
  }
  ,
  created() {
    this.getList()
  }
  ,
  data() {
    return {
      total: 0,
      limit: 12,
      page: 0,
      courseQuery: {},
      courseData: []
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-button--danger:focus {
  background: #F56C6C;
  border-color: #F56C6C;
  color: #FFF;
}
</style>
