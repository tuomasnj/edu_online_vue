import request from "@/utils/request";

export default {
  getAllChapterAndVideo(courseId) {
    return request({
      url: `/eduService/edu-chapter/getChapterVideo/${courseId}`,
      method: 'get'
    })
  }
}
