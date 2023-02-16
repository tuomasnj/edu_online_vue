import request from "@/utils/request";

export default {
  saveCourse(courseInfo) {
    return request({
      url: `/eduService/edu-course/addCourseInfo`,
      method: 'post',
      data:courseInfo
    })
  },
  getCourseById(id){
    return request({
      url: `/eduService/edu-course/getCourseInfo/${id}`,
      method: 'get'
    })
  },
  updateCourse(courseInfo){
    return request({
      url: `/eduService/edu-course/updateCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  getCoursePublishInfo(id){
    return request({
      url: `/eduService/edu-course/queryCourseDetailInfo/${id}`,
      method:"get"
    })
  },
  getCourseListPage(current, limit, courseQuery) {
    return request({
      url: `/eduService/edu-course/pageCourse/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },

  publishCourse(id){
    return request({
      url: `/eduService/edu-course/publishCourse/${id}`,
      method:"post"
    })
  },

  deleteCourse(courseId){
    return request({
      url: '/eduService/edu-course/deleteCourse/'+ courseId,
      method: 'delete'
    })
  }
}
