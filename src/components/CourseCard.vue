<template>
  <div class="course-card bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
    <h2 class="font-bold text-xl mb-2">{{ course.title }}</h2>
    <a :href="course.url" target="_blank" class="text-blue-500 hover:text-blue-700 mb-3 block">Learn More</a>
    <div class="flex items-center">
      <input type="checkbox" :checked="course.completed" @change="emitChange">
      <label class="ml-2">Mark as Complete</label>
    </div>
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
/* Styles specific to CourseCard */
.course-card {
  max-width: 400px;
}
</style>

