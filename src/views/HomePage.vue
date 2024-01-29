<template>
  <div class="home-page">
    <h1 class="main-header">Course Progress Overview</h1>
    <div v-for="board in progressData" :key="board.name" class="board-progress" @click="navigateToBoard(board.name)">
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
      <div class="badge-container">
        <img :src="getBadgeImage(board.name, calculateOverallProgress(board.courses))" class="badge-image" alt="Board Badge" />
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
    const boards = ['generalBoard', 'otcBoard', 'scmBoard'];
    for (const boardName of boards) {
      const coursesCollection = collection(db, 'courses', boardName, 'items');
      const querySnapshot = await getDocs(coursesCollection);
      const courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.progressData.push({
        name: boardName,
        courses: courses
      });
    }
  },
  methods: {
    calculateOverallProgress(courses) {
      const completed = courses.filter(course => course.completed).length;
      return Math.round((completed / courses.length) * 100);
    },
    formatBoardTitle(boardName) {
      const nameMap = {
        'generalBoard': 'General Learning Board',
        'otcBoard': 'EMEA S/4HANA for OTC Beginner',
        'scmBoard': 'EMEA S/4HANA for SCM Beginner'
      };
      return nameMap[boardName] || boardName;
    },
    navigateToBoard(boardName) {
      this.$router.push({ name: boardName });
    },
    getBadgeImage(boardName, progress) {
      const lowerCaseBoardName = boardName.toLowerCase();
      try {
        if (progress === 100) {
          return require(`@/assets/${lowerCaseBoardName}.png`);
        } else {
          return require(`@/assets/${lowerCaseBoardName}_blackwhite.png`);
        }
      } catch (e) {
        console.error(`Error loading badge image for ${boardName}:`, e);
        return ''; // Fallback image or empty string
      }
    },
  }
};
</script>

<style>
.home-page {
  padding: 40px;
}

.main-header {
  font-size: 2em;
  margin-bottom: 20px;
  text-align: center;
}

.sub-header {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.board-progress {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  cursor: pointer;
  position: relative;
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
  align-items: center;
  justify-content: center;
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
  margin-left: 30px;
}

.completed-course {
  color: green;
}

.checkmark {
  color: green;
  margin-right: -12px;
}

.badge-container {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 200px;
  height: 225px;
  overflow: hidden;
}

.badge-image {
  width: 100%;
  height: auto;
}
</style>
