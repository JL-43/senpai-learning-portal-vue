<template>
  <div class="general-board">
    <CourseCard 
      v-for="course in courses" 
      :key="course.id" 
      :course="course"
      @changeCompletion="toggleCompletion"
    />
  </div>
</template>

<script>
import CourseCard from '../components/CourseCard.vue'

export default {
  name: 'GeneralBoard',
  components: {
    CourseCard
  },
  data() {
    return {
      courses: [
        // Your courses data
      ]
    }
  },
  methods: {
    toggleCompletion(courseId) {
      const course = this.courses.find(c => c.id === courseId);
      if (course) {
        course.completed = !course.completed;
        // Additional logic here if needed
      }
    }
  }
}
</script>

<style>
/* Styles for GeneralBoard */
</style>
