import request from "@/utils/request";

export default {
  getAllChapterAndVideo(courseId) {
    return request({
      url: `/eduService/edu-chapter/getChapterVideo/${courseId}`,
      method: 'get'
    })
  },

  //根据id查询章节
  getChapter(chapterId) {
    return request({
      url: `/eduService/edu-chapter/getChapterInfo/${chapterId}`,
      method: 'get'
    })
  },

  //添加章节
  addChapter(chapter){
    return request({
      url: '/eduService/edu-chapter/addChapter',
      method: 'post',
      data: chapter
    })
  },

  updateChapter(chapter){
    return request({
      url: '/eduService/edu-chapter/updateChapter',
      method: 'post',
      data: chapter
    })
  },

  //删除章节
  deleteChapter(chapterId){
    return request({
      url: `eduService/edu-chapter/delete/${chapterId}`,
      method: 'delete'
    })
  }
}
