<template>
  <div class="general-board grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <CourseCard 
      v-for="course in courses" 
      :key="course.id" 
      :course="course"
      @changeCompletion="toggleCompletion"
    />
  </div>
</template>

<script>
import { db } from '@/firebase'; // Import the Firebase instance
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import CourseCard from '../components/CourseCard.vue';

export default {
  name: 'GeneralBoard',
  components: {
    CourseCard
  },
  data() {
    return {
      courses: []
    };
  },
  async created() {
    try {
      const coursesCollection = collection(db, 'courses', 'generalBoard', 'items');
      const querySnapshot = await getDocs(coursesCollection);
      this.courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  },
  methods: {
    async toggleCompletion(courseId) {
      const courseIndex = this.courses.findIndex(c => c.id === courseId);
      if (courseIndex !== -1) {
        const course = this.courses[courseIndex];
        course.completed = !course.completed;
        
        try {
          const courseRef = doc(db, 'courses', 'generalBoard', 'items', courseId);
          await updateDoc(courseRef, { completed: course.completed });
          this.courses[courseIndex] = { ...course }; // Update the local array
        } catch (error) {
          console.error('Error updating course:', error);
        }
      }
    }
  }
}
</script>

<style>
/* Styles for GeneralBoard */
.general-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  justify-content: center;
  justify-items: center;
  align-items: start;
  padding: 50px;
}
</style>
