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
      srcList:["@/"],
      fits: "scale-down"
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
