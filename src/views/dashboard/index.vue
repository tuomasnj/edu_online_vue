<template>
  <div class="app-container">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="src in srcList" :key="src" class="el-carousel__item">
        <el-image :src = "src" :fit = "fits" class="el-image"></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-calendar>
    </el-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      srcList:["https://education-online0101.oss-cn-nanjing.aliyuncs.com/scene/0e89076ec1644278ba332c358f6a0e84.jpg",
      "https://education-online0101.oss-cn-nanjing.aliyuncs.com/scene/9a78d5497a954be18fabbd06bf6abc26.jpg",
      "https://education-online0101.oss-cn-nanjing.aliyuncs.com/scene/128e4fd995c849739d1477c4bcb37f0f.jpg",
      "https://education-online0101.oss-cn-nanjing.aliyuncs.com/scene/a9982f7441bd4e07a3b1a26af43457d9.jpg"],
      fits: "contain"
    }
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(n) {
  background-color: white;
}

.el-image {
  position: relative;
  display: inline;
  overflow: hidden;
}
</style>
