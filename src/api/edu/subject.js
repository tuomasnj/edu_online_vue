import request from "@/utils/request";

export default {
  getSubjectList() {
    return request({
      url: `/eduService/edu-subject/getAllSubject`,
      method: 'get'
    })
  },
  querySubjectById(id){
    return request({
      url:`/eduService/edu-subject/getSubjectById/${id}`,
      method: 'get'
    })
  }
}
