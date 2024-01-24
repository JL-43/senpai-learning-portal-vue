<template>
  <div class="otc-board grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <CourseCard 
      v-for="course in courses" 
      :key="course.id" 
      :course="course"
      @changeCompletion="toggleCompletion"
    />
  </div>
</template>

<script>
import CourseCard from '../components/CourseCard.vue';
import axios from 'axios';

export default {
  name: 'otcBoard',
  components: {
    CourseCard
  },
  data() {
    return {
      courses: []
    };
  },
  created() {
    axios.get('http://localhost:3000/courses/otcBoard')
      .then(response => {
        this.courses = response.data;
      })
      .catch(error => console.error(error));
  },
  methods: {
    toggleCompletion(courseId) {
      const courseIndex = this.courses.findIndex(c => c.id === courseId);
      if (courseIndex !== -1) {
        this.courses[courseIndex].completed = !this.courses[courseIndex].completed;
        axios.put(`http://localhost:3000/courses/otcBoard/${courseId}`, this.courses[courseIndex])
          .then(response => {
            this.courses[courseIndex] = response.data;
          })
          .catch(error => console.error(error));
      }
    }
  }
}
</script>

<style>
/* Styles for otcBoard */
.otc-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px; /* Reduced gap size between cards */
  justify-content: center;
  justify-items: center;
  align-items: start;
  padding: 50px; /* Increased top padding for more space from the header */
}
</style>
