<template>
  <div class="course-card bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col justify-between" @click="navigateToCourse">
    <h2 class="font-bold text-xl mb-2">{{ course.title }}</h2>
    <div class="mark-complete" @click.stop="emitChange">
      <div class="progress-bar-background">
        <div class="progress-bar" 
          :class="{ 'filled': course.completed, 'unfilled': !course.completed && wasFilled }"
          @animationend="animationEnded">
        </div>
        <span class="mark-complete-text" :class="{ 'hidden': course.completed }">Mark as Complete</span>
        <span class="completed-text" v-if="course.completed">Completed</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  props: ['course'],
  data() {
    return {
      wasFilled: false // To track the state change
    };
  },
  methods: {
    emitChange() {
      this.wasFilled = this.course.completed; // Before emitting the change, store the current state
      this.$emit('changeCompletion', this.course.id);
    },
    navigateToCourse() {
      window.open(this.course.url, '_blank');
    },
    animationEnded() {
      this.wasFilled = this.course.completed; // After the animation ends, update the wasFilled state
    }
  }
}
</script>

<style>
.course-card {
  max-width: 400px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.mark-complete {
  position: relative;
  text-align: center;
  margin-top: auto;
  cursor: pointer;
}

.progress-bar-background {
  position: relative;
  background-color: transparent;
  border-radius: 15px;
  overflow: hidden;
  height: 20px;
  width: 100%;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #90EE90;
  border-radius: 15px;
  transition: width 0.2s ease-in-out;
}

.filled {
  width: 100%;
  animation: fillAnimation 2.0s ease-in-out forwards;
}

.unfilled {
  animation: unfillAnimation 2.0s ease-in-out forwards;
}


@keyframes fillAnimation {
  0% { width: 0%; }
  50% { width: 100%; }
  75% { background-color: #fff; }
  100% { background-color: #90EE90; }
}

@keyframes unfillAnimation {
  0% { width: 100%; background-color: #90EE90; }
  25% { background-color: #fff; }
  100% { width: 0%; }
}

.mark-complete-text {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.completed-text {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.hidden {
  display: none;
}
</style>
