<template>
	<div class="home-page">
		<header class="main-header">
			<div class="logo-container">
				<img
					class="logo"
					src="@/assets/LOGO-greenonlyfr.png"
					alt="Logo"
					width="385"
					height="325"
				/>
			</div>
			<button class="hamburger-menu" @click="toggleMenu">
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
			</button>
		</header>

		<section class="hero-section" id="section1">
			<div class="hero-content">
				<div class="text-with-border">
					<div class="text-content">
						<h1>become a SAP master!</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat.
						</p>
					</div>
				</div>
			</div>
			<div class="sap-logo-background"></div>
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

:root {
	--color-white: #f1f6ef;
	--color-green: #bcd4ac;
	--color-dark: #293133;
	--color-gray: #9da1aa;
	--color-text-dark: #282828;
}

body {
	font-family: 'San Francisco', sans-serif; /* If you're using Apple's font */
	background-color: #f8f8f8;
}

body,
button,
a {
	/* Use the custom cursor for the body, buttons, and anchor tags */
	cursor: url('@/assets/custom-cursor-small.png') 16 16, auto;
	/* 16 16 is the coordinate of the cursor's hot spot (the point that actually "clicks" on links/buttons) */
}

/* Home Page Styles */
.home-page {
	font-size: 16px; /* Base font size */
}

.logo-container {
	position: absolute;
	top: 20px; /* Adjust these values as needed */
	left: 30px; /* Adjust these values as needed */
	z-index: 10; /* Ensure it's above other content */
}

.logo {
	max-width: 100%; /* Make sure it scales within the container */
	height: auto; /* Maintain aspect ratio */
}

.main-header {
	position: relative; /* Add this */
	background-color: var(--color-white);
	padding: 20px 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.hero-section {
	position: relative;
	background-color: var(--color-white);
	min-height: 100vh;
	padding: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column; /* Align items vertically */
}

.text-with-border {
	position: absolute;
	top: 55%;
	left: 50%;
	width: 90vw; /* Adjust based on the size of your logo */
	min-height: 100vh; /* Adjust based on the size of your logo */
	transform: translate(-56%, -50%);
	background: url('@/assets/section-text-border.png') no-repeat center center;
	background-size: contain;
	padding: 50px; /* Adjust the padding to fit your text inside the image's space */
	text-align: left;
	font-family: 'Work Sans', sans-serif; /* Apply custom font */
	z-index: 10;
}

.text-content {
	position: relative;
	top: 30px; /* text inside the shapes */
	left: -17%; /* text margin from left of page */
	transform: translate(50%, 50%); /* Center the text within the image */
	max-width: 600px; /* Set a max-width for the text content */
	z-index: 10;
}

.text-content h1 {
	font-family: 'Work Sans', sans-serif;
	font-size: 3em;
	font-weight: 900;
	color: var(--color-text-dark);
	margin-bottom: 20px;
}

.text-content p {
	margin: 10;
	color: #000;
	font-family: 'Comfortaa', sans-serif;
	font-size: 29px;
	font-weight: 600; /* Choose a weight */
	/* Apply additional styling as needed */
}

.sap-logo-background {
	position: absolute;
	bottom: 0;
	right: 0;
	width: auto; /* Adjust as needed */
	height: auto; /* Adjust as needed */
	width: 55vw; /* Adjust based on the size of your logo */
	height: 80vh; /* Adjust based on the size of your logo */
	background: url('@/assets/sap-ok.png') center/cover no-repeat;
	background-position: right bottom; /* Adjust to prevent cut-off */
	background-size: contain; /* Change to 'contain' to fit the image within the div */
	z-index: 10;
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

.hamburger-menu {
	position: absolute;
	top: 78px; /* Adjust as needed */
	right: 70px; /* Adjust as needed */
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 90px; /* width of hamburger lines */
	height: 75px; /* compression of hamburger lines */
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 0;
	z-index: 11;
}

.hamburger-line {
	display: block;
	width: 100%;
	height: 19px; /* thickness of the lines */
	background: var(--color-dark);
	border-radius: 10px;
	transition: all 0.3s ease-in-out;
}
</style>
