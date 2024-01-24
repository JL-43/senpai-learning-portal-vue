<template>
  <div class="home-page">
    <h1 class="main-header">Course Progress Overview</h1>
    <div v-for="board in progressData" :key="board.name" class="board-progress">
      <h2 class="sub-header">{{ formatBoardTitle(board.name) }}</h2>
        <ul>
          <li v-for="course in board.courses" :key="course.id" class="course-item">
            <span v-if="course.completed" class="checkmark">&#10004;</span>
            <span :class="['course-title', {'completed-course': course.completed }]">{{ course.title }}</span>
          </li>
        </ul>
      <div class="progress">
        <div class="progress-inner" :style="{ width: calculateOverallProgress(board.courses) + '%' }">
          <span class="progress-text">{{ calculateOverallProgress(board.courses) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
  name: 'HomePage',
  data() {
    return {
      progressData: []
    };
  },
  async created() {
    try {
      const boards = ['generalBoard', 'otcBoard', 'scmBoard']; // Add more boards as needed
      for (const boardName of boards) {
        const coursesCollection = collection(db, 'courses', boardName, 'items');
        const querySnapshot = await getDocs(coursesCollection);
        const courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        this.progressData.push({
          name: boardName,
          courses: courses
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    calculateOverallProgress(courses) {
      const completed = courses.filter(course => course.completed).length;
      return Math.round((completed / courses.length) * 100);
    },
    formatBoardName(name) {
      return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
    },
    formatBoardTitle(boardName) {
      const nameMap = {
        'generalBoard': 'General Learning Board',
        'otcBoard': 'EMEA S/4HANA for OTC Beginner',
        'scmBoard': 'EMEA S/4HANA for SCM Beginner'
        // Add more mappings as needed
      };
      return nameMap[boardName] || boardName; // Fallback to the original name if not found in map
    }
  }
};
</script>

<style>
.home-page {
  padding: 40px;
  /* Increase padding */
}

.main-header {
  font-size: 2em;
  margin-bottom: 20px;
  text-align: center;
  /* Center align main header */
}

.sub-header {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.board-progress {
  background-color: #fff;
  /* White background */
  border-radius: 10px;
  /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Shadow similar to CourseCard */
  padding: 20px;
  max-width: 800px;
  /* Match CourseCard width */
  margin: 20px auto;
  /* Center align the card */
}

.progress {
  background-color: #f5f5f5;
  border-radius: 10px;
  height: 20px;
  margin-top: 30px;
  position: relative;
}

.progress-inner {
  background: linear-gradient(to right, #98FB98, #32CD32);
  border-radius: 10px;
  height: 100%;
  transition: width 0.3s ease-in-out;
  display: flex;
  align-items: center; /* Align text vertically */
  justify-content: center; /* Align text horizontally */
}

.progress-text {
  color: white;
  font-weight: bold;
}

.course-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.course-title {
  flex-grow: 1;
  margin-left: 30px; /* Padding for text alignment */
}

.completed-course .course-title {
  margin-left: 0; /* Remove additional padding when completed */
}


.completed-course {
  color: green;
}

.checkmark {
  margin-right: -12px; /* Space between checkmark and text */
  color: green;
}
</style>
