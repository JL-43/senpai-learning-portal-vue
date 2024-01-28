<template>
  <div id="app">
    <div class="custom-background" :style="{ backgroundImage: 'url(' + sarinaImageUrl + ')' }"></div>
    <NavBar />
    <router-view/>

    <button @click="toggleFriendster" :style="toggleFriendsterButtonStyle" class="toggle-friendster">Toggle Friendster</button>
    <button @click="toggleAmogus" :style="toggleAmogusButtonStyle" class="toggle-amogus">Toggle Amogus</button>
    <img v-for="confetti in confettis" :key="confetti.id" :src="confetti.src" :class="confetti.class" :style="confetti.style">
    <img v-for="amogus in amoguses" :key="amogus.id" :src="amogus.src" :class="amogus.class" :style="amogus.style">
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import amogusImage from '@/assets/transparent-angel-amogus-small.png';
import sarinaImage from '@/assets/sarina.png';
import confettiImage from '@/assets/confetti.gif';

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      amoguses: [],
      confettis: [],
      sarinaImageUrl: sarinaImage,
      showAmogus: false,
      friendsterMode: false,
      songs: [
        require('@/assets/music/yourguardianangel.mp3'),
        require('@/assets/music/catandmouse.mp3'),
        require('@/assets/music/idontloveyou.mp3'),
      ],
      currentAudio: null,
    };
  },
  computed: {
    toggleAmogusButtonStyle() {
      return {
        backgroundColor: this.showAmogus ? '#00D7C4' : 'grey',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'fixed',
        bottom: '20px',
        right: '25px'
      };
    },
    toggleFriendsterButtonStyle() {
      return {
        backgroundColor: this.friendsterMode ? '#2DA11E' : 'grey',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'fixed',
        bottom: '80px',
        right: '20px'
      };
    }
  },
  methods: {
    createAmogus() {
      const id = Math.random().toString(36).substr(2, 9);
      const speed = Math.random() * (20 - 5) + 5; // Speed between 5 and 20 seconds
      const side = Math.random() < 0.5 ? 'left' : 'right'; // Randomly choose starting side
      const bottom = Math.random() * (window.innerHeight - 100);
      return {
        id,
        src: amogusImage, // Replace with actual path or import
        class: 'amogus',
        style: {
          animation: `moveAmogusFrom${side.charAt(0).toUpperCase() + side.slice(1)} ${speed}s linear infinite`,
          bottom: `${bottom}px`,
          [side]: '-100px' // Start from left or right
        }
      };
    },
    createConfetti() {
      return {
        src: confettiImage, // Your imported confetti image
        class: 'confetti',
        style: {
          position: 'fixed',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          zIndex: 10 // Make sure it's above the background but below interactive elements
        }
      };
    },
    toggleAmogus() {
      this.showAmogus = !this.showAmogus;
      this.amoguses = this.showAmogus ? Array.from({ length: 5 }, this.createAmogus) : [];
    },
    toggleFriendster() {
      this.friendsterMode = !this.friendsterMode;
      this.showConfetti = this.friendsterMode;

      this.confettis = this.friendsterMode ? Array.from({ length: 20 }, this.createConfetti) : [];

      if (this.friendsterMode) {
        if (this.currentAudio) {
          this.currentAudio.pause();
        }
        const randomSong = this.songs[Math.floor(Math.random() * this.songs.length)];
        this.currentAudio = new Audio(randomSong);
        this.currentAudio.play();
      } else if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      }
    }
  }
}
</script>

<style>
.amogus {
  position: fixed;
  max-height: 200px;
}

@keyframes scrollBackground {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: 0 0;
  }
}

.custom-background {
  position: fixed;
  width: 400px;
  height: 400px;
  background-size: cover;
  background-repeat: no-repeat;
  margin: auto;
  z-index: -1;
}

/* .custom-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/sarina.png');
  background-size: 1000px 1000px;
  animation: scrollBackground 18s linear infinite;
  z-index: -1;
} */

/* .custom-background::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background-image: url('@/assets/sarina.png');
  background-size: 1000px 1000px;
  background-repeat: repeat-x;
  animation: scrollBackground 18s linear infinite;
} */

@keyframes moveAmogusFromLeft {
  to {
    transform: translateX(100vw);
  }
}

@keyframes moveAmogusFromRight {
  to {
    transform: translateX(-100vw);
  }
}

.toggle-amogus {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1;
}

.toggle-friendster {
  position: fixed;
  bottom: 60px; /*Adjust position so it doesn't overlap with the Amogus button*/
  right: 20px;
  z-index: 1;
}

.confetti-gif {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
}

.confetti {
  max-width: 1000px;
  pointer-events: none;
  z-index: -1;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

</style>

