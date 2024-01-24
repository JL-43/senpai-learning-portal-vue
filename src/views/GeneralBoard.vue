<template>
  <div class="general-board">
    <CourseCard 
      v-for="course in courses" 
      :key="course.id" 
      :course="course" 
      @toggleCompletion="toggleCompletion(course)"
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
    toggleCompletion(course) {
      course.completed = !course.completed;
      // Handle completion change
    }
  }
}
</script>

<style>
/* Styles for GeneralBoard */
</style>
