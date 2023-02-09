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
  }
}
