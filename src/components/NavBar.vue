<template>
  <nav class="bg-gray-800 p-4 text-white">
    <router-link to="/" class="px-2 py-1 hover:bg-gray-700">General Learning Board</router-link>
    <router-link to="/otc" class="px-2 py-1 hover:bg-gray-700">EMEA S/4HANA for OTC Beginner</router-link>
    <router-link to="/scm" class="px-2 py-1 hover:bg-gray-700">EMEA S/4HANA for SCM Beginner</router-link>
  </nav>
</template>


<script>
export default {
  name: 'NavBar'
}
</script>

<style>
/* NavBar styles */
</style>
