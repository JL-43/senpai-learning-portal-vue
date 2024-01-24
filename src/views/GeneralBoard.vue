<template>
  <div class="general-board grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Course Cards -->
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
        {
          id: 'course1',
          title: 'User Experience with SAP S/4HANA',
          url: 'https://open.sap.com/courses/s4h18',
          completed: false
        },
        {
          id: 'course2',
          title: 'Discovering SAP Business Technology Platform',
          url: 'https://learning.sap.com/learning-journey/discover-sap-business-technology-platform',
          completed: false
        },
        {
          id: 'course3',
          title: 'Learning the Basics of SAP Fiori',
          url: 'https://learning.sap.com/learning-journey/learn-the-basics-of-sap-fiori',
          completed: false
        },
        {
          id: 'course4',
          title: 'Exploring Data Modeling with SAP Solutions',
          url: 'https://learning.sap.com/learning-journey/discovering-the-basics-of-sap-s-4hana-manufacturing',
          completed: false
        },
        {
          id: 'course5',
          title: 'Discovering End-to-End Business Processes for the Intelligent Enterprise',
          url: 'https://learning.sap.com/learning-journey/discovering-end-to-end-business-processes-for-the-intelligent-enterprise',
          completed: false
        },
        {
          id: 'course6',
          title: 'Designing Business Processes with SAP Signavio Solutions',
          url: 'https://learning.sap.com/learning-journey/design-business-processes-with-sap-signavio-solutions',
          completed: false
        }
      ]
    }
  },
  methods: {
    toggleCompletion(courseId) {
      const course = this.courses.find(c => c.id === courseId);
      course.completed = !course.completed;
      // Add logic to handle saving state, etc.
    }
  }
}
</script>

<style>
/* Styles for GeneralBoard */
.general-board {
  padding: 40px;
}
</style>
