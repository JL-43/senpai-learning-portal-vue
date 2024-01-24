<template>
  <div class="course-card">
    <h2>{{ course.title }}</h2>
    <a :href="course.url" target="_blank">{{ course.title }}</a>
    <input type="checkbox" :checked="course.completed" @change="$emit('toggleCompletion')">
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  props: ['course']
}
</script>

<style>
/* Styles for CourseCard */
</style>
