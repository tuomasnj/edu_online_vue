import request from "@/utils/request";

export default {
  addVideo(video) {
    return request({
      url: '/eduService/edu-video/addVideo',
      method: 'post',
      data: video
    })
  },

  updateVideo(video) {
    return request({
      url: '/eduService/edu-video/updateVideo',
      method: 'post',
      data: video
    })
  },

  //删除章节
  deleteVideo(videoId) {
    return request({
      url: `eduService/edu-video/${videoId}`,
      method: 'delete'
    })
  },

  getVideo(videoId) {
    return request({
      url:`eduService/edu-video/getVideo/${videoId}`,
      method: 'get'
    })
  }
}
