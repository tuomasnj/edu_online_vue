<template>
  <div class="app-container">
    <el-calendar v-model="value">
    </el-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
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

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.is-selected {
  color: #1989FA;
}

</style>
