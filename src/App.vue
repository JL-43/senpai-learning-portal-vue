<template>
  <div id="app">
    <NavBar />
    <router-view/>
        <button @click="toggleAmogus" :style="toggleButtonStyle" class="toggle-amogus">Toggle Amogus</button>
    <img v-for="amogus in amoguses" :key="amogus.id" :src="amogus.src" :class="amogus.class" :style="amogus.style">
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import amogusImage from '@/assets/transparent-angel-amogus-small.png';

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      amoguses: [],
      showAmogus: false
    };
  },
  computed: {
    toggleButtonStyle() {
      return {
        backgroundColor: this.showAmogus ? '#00D7C4' : 'grey',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'fixed',
        bottom: '20px',
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
    toggleAmogus() {
      this.showAmogus = !this.showAmogus;
      this.amoguses = this.showAmogus ? Array.from({ length: 5 }, this.createAmogus) : [];
    }
  }
}
</script>

<style>
.amogus {
  position: fixed;
  max-height: 200px;
}

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
  /* Style your button as needed */
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

</style>

