<template>
  <nav class="custom-navbar">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link :to="{ name: 'board', params: { boardType: 'generalBoard' } }" class="nav-link">General Learning Board</router-link>
    <router-link :to="{ name: 'board', params: { boardType: 'otcBoard' } }" class="nav-link">EMEA S/4HANA for OTC Beginner</router-link>
    <router-link :to="{ name: 'board', params: { boardType: 'scmBoard' } }" class="nav-link">EMEA S/4HANA for SCM Beginner</router-link>
  </nav>
</template>

<style scoped>
nav.custom-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-dark);
  padding: 20px 40px;
  font-family: 'Comfortaa', cursive;
}

.nav-link {
  color: var(--color-white);
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: var(--color-green);
  color: var(--color-dark);
}
</style>
