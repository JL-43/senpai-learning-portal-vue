<template>
  <div class="home-page">
    <h1 class="main-header">Course Progress Overview</h1>
    <div v-for="board in progressData" :key="board.name" class="board-progress">
      <h2 class="sub-header">{{ formatBoardName(board.name) }}</h2>
      <div class="progress">
        <div class="progress-inner" :style="{ width: calculateOverallProgress(board.courses) + '%' }"></div>
      </div>
      <ul>
        <li v-for="course in board.courses" :key="course.id" class="course-item">
          <span :class="{ 'completed-course': course.completed }">{{ course.title }}</span>
          <span v-if="course.completed" class="checkmark">&#10004;</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      progressData: []
    };
  },
  created() {
    axios.get('http://localhost:3000/courses')
      .then(response => {
        this.progressData = Object.keys(response.data).map(key => ({
          name: key,
          courses: response.data[key]
        }));
      })
      .catch(error => console.error(error));
  },
  methods: {
    calculateOverallProgress(courses) {
      const completed = courses.filter(course => course.completed).length;
      return Math.round((completed / courses.length) * 100);
    },
    formatBoardName(name) {
      return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
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
  margin-bottom: 30px;
  max-width: 800px;
  /* Match CourseCard width */
  margin: 20px auto;
  /* Center align the card */
}

.progress {
  background-color: #f5f5f5;
  /* Light grey background */
  border-radius: 10px;
  /* Rounded corners */
  height: 20px;
  /* Increased height */
  margin-top: 10px;
  /* Spacing above the progress bar */
}

.progress-inner {
  background: linear-gradient(to right, #98FB98, #32CD32);
  /* Gradient green */
  border-radius: 10px;
  /* Rounded corners */
  height: 100%;
  transition: width 0.3s ease-in-out;
  /* Smooth width transition */
}

.course-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.completed-course {
  color: green;
}

.checkmark {
  margin-left: 10px;
  color: green;
}
</style>
