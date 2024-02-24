<template>
	<div class="home-page">
		<div class="top-notice"></div>
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
						<h1>become an SAP master!</h1>
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
					@click="
						() => {
							console.log(board.name + ' clicked');
							navigateToBoard(board.name);
						}
					"
				>
					<div class="card-header">{{ formatBoardTitle(board.name) }}</div>
					<p>Click the cards! (Description coming soon!)</p>
				</div>
			</div>
		</section>

		<section class="founders-section" id="section3">
			<h1 class="section-title">the founders</h1>
			<div class="founders-content">
				<div class="founders-cards">
					<!-- Founder 1 Card -->
					<div class="founder-card">
						<img
							src="@/assets/cza-founder.png"
							alt="cza"
							class="founder-image"
						/>
						<div class="founder-info">
							<h2>czarina basa</h2>
							<p>siya yung pinaka magaling</p>
						</div>
					</div>
					<!-- Founder 2 Card -->
					<div class="founder-card">
						<img src="@/assets/jl-founder.png" alt="jl" class="founder-image" />
						<div class="founder-info">
							<h2>jose luis reyes</h2>
							<p>siya yung nag code</p>
						</div>
					</div>
				</div>
				<div class="large-image-container">
					<img
						src="@/assets/section-3-amogus.png"
						alt="Section 3 Large Image"
						class="large-image"
					/>
				</div>
			</div>
		</section>
		<transition name="fade">
			<div class="overlay" v-if="isMenuOpen"></div>
		</transition>
		<footer class="site-footer">
			<img src="@/assets/plants.png" alt="Footer Image" class="footer-image" />
			<div class="footer-content">
				<div class="footer-text">🐼 all rights reserved © 2024 🐼</div>
				<div class="additional-text">di ko na alam lalagay</div>
			</div>
		</footer>
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
			isMenuOpen: false,
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
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
		},
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
			console.log(boardName + ' was clicked');
			this.$router.push({ name: 'board', params: { boardType: boardName } });
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
	--color-green: #b7cfa8;
	--color-dark: #293133;
	--color-gray: #9da1aa;
	--color-text-dark: #282828;
	--color-footer: #282828;
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
	z-index: 2;
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
	margin: 140px 200px; /* margin from top, margin from each other */
	grid-template-columns: repeat(
		auto-fit,
		minmax(250px, 1fr)
	); /* Smaller min-width */
}

.learning-card {
	background-color: var(--color-white);
	border-radius: 40px;
	margin-left: 100px;
	margin-top: 90px;
	padding: 55px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
	min-height: 500px;
	max-height: 500px;
	min-width: 450px;
	max-width: 450px;
	font-family: 'Comfortaa', sans-serif;
	font-size: 18px;
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

body.menu-open .overlay {
	display: block;
	opacity: 1;
	visibility: visible;
}

.hamburger-menu {
	position: absolute;
	top: 78px; /* Adjust as needed */
	right: 70px; /* Adjust as needed */
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 78px; /* width of hamburger lines */
	height: 72px; /* compression of hamburger lines */
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 0;
	z-index: 30;
}

.hamburger-line {
	display: block;
	width: 100%;
	height: 15px; /* thickness of the lines */
	background: var(--color-dark);
	border-radius: 10px;
	transition: all 0.3s ease-in-out;
}

.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 20;
	opacity: 1; /* Set default opacity to 0 for transition */
}

.fade-enter-active {
	transition: opacity 1s ease; /* not working for some reason */
}
.fade-leave-active {
	transition: opacity 1s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
	opacity: 0;
}

.founders-section {
	background-color: var(--color-dark); /* Adjust if necessary */
	min-height: 100vh;
	padding: 60px;
	position: relative; /* Needed for absolute positioning of the large image */
	color: var(--color-white); /* Ensures text is white */
	z-index: 2; /* Adjust as necessary to stack correctly */
	overflow-x: hidden; /* Prevent horizontal overflow */
}

.section-title {
	color: var(--color-white);
	margin-top: -40px;
	margin-bottom: 25px;
	font-size: 6.5em;
	font-family: 'Work Sans', sans-serif; /* Your custom font */
	font-weight: 600;
	padding-left: 150px;
	position: relative;
	z-index: 3;
}

.founder-info h1 {
	font-family: 'Work Sans', sans-serif;
	font-size: 2.2em;
	font-weight: 600;
	color: var(--color-text-dark);
}

.founders-content {
	display: flex;
	justify-content: space-between;
	align-items: start; /* Align items at the top */
}

.founders-cards {
	display: flex;
	flex-direction: column;
	gap: 20px;
	z-index: 2; /* Ensure it's above the large image */
}

.founder-card {
	background-color: transparent; /* Transparent background */
	display: flex;
	align-items: center;
	gap: 50px; /* gap between image and titles */
	padding: 10px; /* padding between founder cards */
	padding-left: 230px;
}

.founder-image {
	width: 270px; /* Adjust as needed */
	height: 270px; /* Adjust as needed */
	object-fit: cover;
}

.founder-info h2 {
	/* font-family: 'Work Sans', sans-serif; */
	font-family: 'Comfortaa', sans-serif;
	font-size: 2.2em;
	font-weight: 600;
	color: var(--color-text-white);
}

.founder-info p {
	margin: 0;
	font-family: 'Work Sans Italic', sans-serif;
	font-size: 1.2em;
	font-weight: 200;
	color: var(--color-text-white);
}

.large-image-container {
	position: absolute;
	right: 0; /* Align to the right edge */
	top: -175px; /* Adjust for seeping into Section 2, increase/decrease for more/less overlap */
	width: 50%; /* Adjust based on desired coverage */
	height: calc(100% + 175px); /* Increase height to cover the shifted part */
	z-index: 1; /* Below the text and cloud images */
	overflow: hidden; /* Hide parts of the image that overflow the container */
}

.large-image {
	width: 100%; /* Ensure the image fills the container's width */
	height: 100%; /* Cover the adjusted container height */
	object-fit: cover; /* Ensure the image covers the container */
	object-position: right top; /* Adjust the focus of the image */
}

/* Footer styles */
.site-footer {
	background-color: var(--color-footer);
	color: white; /* Adjust as needed */
	padding: 20px 40px; /* Adjust padding as needed */
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.footer-image {
	position: absolute;
	bottom: 50px; /* Adjusted to sit at the bottom of the footer */
	left: 0;
	width: 52%; /* Stretches the image across the footer */
	max-height: 1500px; /* Limit the height of the image */
	object-fit: cover; /* Ensures the image covers the area properly */
	z-index: 10; /* Ensure it doesn't overlap content */
}

.footer-content {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.footer-text,
.additional-text {
	font-family: 'Comfortaa', sans-serif; /* Match the learning card text font */
	font-size: 23px; /* Match the learning card text size */
	font-weight: 600; /* Match the learning card text weight */
}

.additional-text {
	text-align: right; /* Aligns the text to the right */
}

.top-marquee {
	width: 100%;
	background-color: var(
		--color-dark
	); /* Or any other color that fits the theme */
	color: white;
	padding: 5px 0;
	font-size: 12px; /* Keep the font size small */
	text-align: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100; /* Ensure it stays on top */
}

@keyframes marquee {
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(100%);
	}
}

.top-notice {
	width: 100%;
	color: black; /* Adjust the color as needed */
	background-color: transparent; /* Or any subtle color that fits your design */
	padding: 2px 0;
	font-size: 12px; /* Keep it small */
	text-align: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100; /* High enough to be on top */
}

.top-notice::before {
	content: '(pls view in 1920x1080p for now)'; /* Your message */
	animation: marquee 40s linear infinite; /* Adjust timing as needed */
	display: block;
}
</style>
