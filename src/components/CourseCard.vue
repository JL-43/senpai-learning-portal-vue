<template>
	<div class="course-card" @click="navigateToCourse">
		<h2 class="course-title">{{ course.title }}</h2>
		<div v-if="course.completed">
			{{ formatDate(course.completionTimestamp) }}
			<br /><br />
			<!-- <button class="button revert-button" @click.stop="revertCompletion">
				Revert Completion
			</button> -->
		</div>
		<div class="mark-complete" @click.stop="emitChange">
			<div class="progress-bar-background">
				<div class="progress-bar" :class="{ filled: course.completed }"></div>
			</div>
			<button
				class="button mark-complete-button"
				@click.stop="emitChange"
				v-if="!course.completed"
			>
				Mark as Complete
			</button>
			<div v-if="course.completed" class="completed-button">Completed</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CourseCard',
	props: ['course'],
	data() {
		return {
			wasFilled: false, // To track the state change
		};
	},
	methods: {
		emitChange() {
			const lastTimestamp = this.course.completed
				? Date.now()
				: this.course.lastCompletionTimestamp || null;
			this.$emit('changeCompletion', {
				courseId: this.course.id,
				completed: !this.course.completed,
				lastCompletionTimestamp: lastTimestamp,
			});
		},
		navigateToCourse() {
			window.open(this.course.url, '_blank');
		},
		formatDate(timestamp) {
			if (!timestamp) return '';

			const amsterdamTimeZone = 'Europe/Amsterdam';
			const philippineTimeZone = 'Asia/Manila';

			const amsterdamTime = new Date(timestamp).toLocaleString('en-US', {
				timeZone: amsterdamTimeZone,
			});
			const philippineTime = new Date(timestamp).toLocaleString('en-US', {
				timeZone: philippineTimeZone,
			});

			return `Amsterdam Time: ${amsterdamTime}, ------- Philippine Time: ${philippineTime}`;
		},
		revertCompletion() {
			if (!this.course.lastCompletionTimestamp) return; // Guard clause

			this.$emit('changeCompletion', {
				courseId: this.course.id,
				completed: false, // Set to incomplete
				revertToTimestamp: this.course.lastCompletionTimestamp,
			});
		},
	},
};
</script>

<style scoped>
.course-card {
	background-color: var(--color-white);
	border-radius: 15px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	padding: 20px;
	margin-bottom: 20px;
	transition: box-shadow 0.3s ease;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.course-card:hover {
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.course-title {
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 15px;
}

.mark-complete {
	display: flex;
	align-items: center;
}

.progress-bar-background {
	flex-grow: 1;
	height: 10px;
	background-color: #e0e0e0;
	border-radius: 5px;
	overflow: hidden;
	margin-right: 10px;
}

.progress-bar {
	height: 100%;
	width: 0%;
	background-color: var(--color-green);
	border-radius: 5px;
	transition: width 0.5s ease;
}

.filled {
	width: 100%;
}

.button {
	padding: 8px 16px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-family: 'Comfortaa', cursive;
	font-size: 14px;
	transition: background-color 0.3s ease;
	margin-top: 10px;
}

.mark-complete-button {
	background-color: var(--color-green);
	color: var(--color-white);
}

.completed-button {
	background-color: #90ee90; /* A light green background to indicate completion */
	color: var(--color-white); /* White text for contrast */
	padding: 8px 16px;
	border-radius: 4px;
	font-family: 'Comfortaa', cursive;
	font-size: 14px;
	text-align: center;
	cursor: default; /* Indicates it's not clickable */
	margin-top: 10px; /* Consistent spacing */
	display: inline-block; /* Allows for better control over padding and margins */
}

.revert-button {
	background-color: var(--color-dark);
	color: var(--color-white);
}
</style>
