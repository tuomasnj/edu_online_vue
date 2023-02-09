import request from '@/utils/request'

export default {
  //1 讲师列表(条件分页查询)
  //current表示当前页 limit表示每页记录数 teacherQuery表示条件对象
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      //url:'/eduService/edu-teacher/pageConditionTeacher/'+current+'/'+limit
      url: `/eduService/edu-teacher/pageConditionTeacher/${current}/${limit}`,
      method: 'post',
      //teacherQuery是条件对象，因为后端使用RequestBody获取数据
      //data把对象转换为json数据格式进行传输
      data: teacherQuery
    })
  },

  //获取所有讲师
 getAllTeacher(){
    return request(({
      url: `/eduService/edu-teacher/findAll`,
      method: 'get'
    }))
 },
  //讲师删除
  deleteTeacherById(id) {
    return request({
      url: `/eduService/edu-teacher/delete/${id}`,
      method: 'delete'
    })
  },

  //讲师保存
  saveTeacher(teacher){
    return request({
      url: `/eduService/edu-teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },

  //讲师修改
  updateTeacher(teacher){
    return request({
      url: `/eduService/edu-teacher/update/${teacher.id}`,
      method: 'post',
      data: teacher
    })
  },

  //根据id查询
  getTeacherById(id){
    return request({
      url: `/eduService/edu-teacher/getTeacher/${id}`,
      method: 'get'
    })
  }
}
