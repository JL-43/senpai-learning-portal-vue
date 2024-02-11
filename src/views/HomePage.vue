<template>
	<div class="home-page">
		<header class="main-header">
			<div class="logo">
				<img src="path/to/your/logo.png" alt="Logo" />
			</div>
			<button class="hamburger-menu">
				<span></span>
				<span></span>
				<span></span>
			</button>
		</header>

		<section class="hero-section" id="section1">
			<div class="hero-content">
				<h1 class="hero-title">SAP <span class="animated-sap">SAP</span></h1>
				<div class="rounded-lines-area"></div>
			</div>
		</section>

		<section class="learning-boards" id="section2">
			<img src="@/assets/cloud-white.png" class="cloud-image-top-left" />
			<img src="@/assets/cloud-green.png" class="cloud-image-bottom-left" />
			<h1 class="boards-title">Learning Boards</h1>
			<div class="board-grid">
				<div
					class="learning-card"
					v-for="board in progressData"
					:key="board.name"
				>
					<div class="card-header">{{ formatBoardTitle(board.name) }}</div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quod
						ipsum quam quaerat autem saepe optio ad itaque sed numquam? Saepe
						praesentium quos maxime tenetur error rerum, perspiciatis maiores
						aut.
					</p>
				</div>
			</div>
		</section>

		<section class="founders-section" id="section3">
			<div class="founders-image">
				<img src="path/to/founders-image.png" alt="Founders" />
			</div>
			<div class="founders-info"></div>
		</section>
	</div>
</template>

<script>
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
	name: 'HomePage',
	data() {
		return {
			progressData: [],
		};
	},
	async created() {
		const boards = ['generalBoard', 'otcBoard', 'scmBoard'];
		for (const boardName of boards) {
			const coursesCollection = collection(db, 'courses', boardName, 'items');
			const querySnapshot = await getDocs(coursesCollection);
			const courses = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			this.progressData.push({
				name: boardName,
				courses: courses,
			});
		}
	},
	methods: {
		calculateOverallProgress(courses) {
			const completed = courses.filter((course) => course.completed).length;
			return Math.round((completed / courses.length) * 100);
		},
		formatBoardTitle(boardName) {
			const nameMap = {
				generalBoard: 'general',
				otcBoard: 'sales',
				scmBoard: 'supply chain',
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
	},
};
</script>

<style>
/* App Level styles */
body {
	font-family: 'San Francisco', sans-serif; /* If you're using Apple's font */
	background-color: #f8f8f8;
}

/* Home Page Styles */
.home-page {
	font-size: 16px; /* Base font size */
}

:root {
	--color-white: #f1f6ef;
	--color-green: #bcd4ac;
	--color-dark: #293133;
	--color-gray: #9da1aa;
	--color-text-dark: #282828;
}

.main-header {
	background-color: var(--color-white);
	padding: 20px 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.hero-section {
	background-color: var(--color-white);
	min-height: 100vh;
	position: relative;
	display: flex;
	align-items: center;
	padding: 60px;
}

.cloud-image-top-left {
	position: absolute;
	top: -380px; /* Adjust offsets as needed */
	left: 0px;
	z-index: 1;
}

.cloud-image-bottom-left {
	position: absolute;
	bottom: -380px; /* Adjust offsets as needed */
	left: 0px;
}

.hero-title {
	color: var(--color-text-dark);
	font-size: 3rem;
	font-weight: bold;
	margin-bottom: 20px;
}

.learning-boards {
	background-color: var(--color-green);
	min-height: 100vh;
	position: relative;
}

.boards-title {
	color: var(--color-white);
}

.board-grid {
	display: grid;
	grid-template-columns: repeat(
		auto-fit,
		minmax(300px, 1fr)
	); /* Responsive layout */
	gap: 10px;
	margin: 140px 120px; /* margin from top, margin from each other */
	grid-template-columns: repeat(
		auto-fit,
		minmax(250px, 1fr)
	); /* Smaller min-width */
}

.learning-card {
	background-color: var(--color-white);
	border-radius: 40px;
	margin-left: 100px;
	margin-top: 40px;
	padding: 55px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
	min-height: 600px;
	max-height: 600px;
	min-width: 500px;
	max-width: 500px;
	font-family: 'Comfortaa', sans-serif;
	font-size: 23px;
	font-weight: 600; /* Choose a weight */
	z-index: 1;
	box-shadow: -18px 20px 10px rgba(0, 0, 0, 0.2);
}

.card-header {
	background-color: var(--color-green);
	border-radius: 40px;
	padding: 15px;
	margin-bottom: 20px;
	text-align: center;
	font-family: 'Work Sans', sans-serif;
	font-size: 2.2em;
	font-weight: 600;
	color: var(--color-text-dark);
	z-index: 2;
}

.founders-section {
	background-color: var(--color-dark);
	min-height: 100vh;
}
</style>
