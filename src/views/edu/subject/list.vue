<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;"/>
    <el-tree
      ref="tree2"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from '@/api/edu/subject'

export default {
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    getAllSubjects() {
      subject.getSubjectList().then(response =>{
        this.data = response.data.list
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.toUpperCase().indexOf(value.toUpperCase()) !== -1
    }
  },
  created() {
    this.getAllSubjects()
  }
}
</script>


