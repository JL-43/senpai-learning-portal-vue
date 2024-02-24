<template>
	<div>
		<NavBar />
		<div
			class="board-view grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
		>
			<CourseCard
				v-for="course in courses"
				:key="course.id"
				:course="course"
				@changeCompletion="toggleCompletion(course.id)"
			/>
		</div>
	</div>
</template>

<script>
import { db } from '@/firebase';
import { collection, doc, updateDoc, getDocs } from 'firebase/firestore';
import CourseCard from '../components/CourseCard.vue';
import NavBar from '../components/NavBar.vue'; // Import the NavBar component

export default {
	name: 'BoardView',
	components: {
		CourseCard,
		NavBar,
	},
	props: {
		boardType: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			courses: [],
		};
	},
	watch: {
		boardType: {
			immediate: true,
			handler(newValue) {
				if (newValue) {
					this.fetchCourses(newValue);
				} else {
					console.error('Board type is undefined.');
				}
			},
		},
	},
	methods: {
		async fetchCourses(boardType) {
			try {
				const coursesCollection = collection(db, 'courses', boardType, 'items');
				const querySnapshot = await getDocs(coursesCollection);
				this.courses = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
			} catch (error) {
				console.error('Error fetching courses:', error);
			}
		},
		async toggleCompletion(courseId) {
			const courseIndex = this.courses.findIndex(
				(course) => course.id === courseId
			);
			if (courseIndex !== -1) {
				const course = this.courses[courseIndex];
				const newCompletedStatus = !course.completed;
				const completionTimestamp = newCompletedStatus ? new Date() : null; // Store current date/time or null if unmarking completion
				try {
					const courseRef = doc(
						db,
						'courses',
						this.boardType,
						'items',
						courseId
					);
					await updateDoc(courseRef, {
						completed: newCompletedStatus,
						completionTimestamp: completionTimestamp
							? completionTimestamp.toISOString()
							: null, // Convert to ISO string or store null
					});
					this.courses[courseIndex] = {
						...course,
						completed: newCompletedStatus,
						completionTimestamp, // Add to local state
					};
				} catch (error) {
					console.error('Error updating course completion status:', error);
				}
			}
		},
	},
};
</script>

<style>
/* Styles for BoardView */
.board-view {
	padding: 100px; /* Increase padding from the edges of the page */
	padding-left: 150px;
	display: grid;
	grid-template-columns: repeat(
		auto-fill,
		minmax(250px, 1fr)
	); /* Adjust minmax for consistent sizes */
	gap: 30px; /* Increase space between cards */
	justify-content: center;
	align-items: start;
}

/* Styles for CourseCard */
.course-card {
	max-width: 450px; /* Ensures consistent width across cards */
	min-height: 200px; /* Optional: Adjust based on content for consistent height */
	/* Other styles */
}
</style>
