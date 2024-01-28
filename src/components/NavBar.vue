<template>
  <nav class="custom-navbar p-6 text-white flex justify">
    <router-link to="/" class="px-4 hover:bg-gray-700 py-2 rounded">Home</router-link>
    <router-link to="/general-board" class="px-4 hover:bg-gray-700 py-2 rounded">General Learning Board</router-link>
    <router-link to="/otc" class="px-4 hover:bg-gray-700 py-2 rounded">EMEA S/4HANA for OTC Beginner</router-link>
    <router-link to="/scm" class="px-4 hover:bg-gray-700 py-2 rounded">EMEA S/4HANA for SCM Beginner</router-link>
  </nav>
</template>

<style>
nav.custom-navbar {
  background-color: #0f4f07;
  font-family: 'Roboto', sans-serif;
}
</style>
