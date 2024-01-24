<template>
  <div class="course-card">
    <h2 class="font-bold">{{ course.title }}</h2>
    <a :href="course.url" target="_blank" class="text-indigo-500 hover:text-indigo-700">Learn More</a>
    <input type="checkbox" :checked="course.completed" @change="emitChange">
    <label>Mark as Complete</label>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  props: ['course'],
  methods: {
    emitChange() {
      this.$emit('changeCompletion', this.course.id);
    }
  }
}
</script>

<style>
/* Styles for CourseCard */
</style>
