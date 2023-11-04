<template>
   <v-app-bar 
    flat 
    permanent
    color="grey-darken-4"
    class="border-b"
   >
    <v-btn icon="mdi mdi-food-fork-drink" @click="homePage()"/>
    <v-app-bar-title>Restaurante</v-app-bar-title>
  </v-app-bar>
  <v-main>
    <router-view/>
  </v-main>
</template>

<script lang="ts" setup>
/**
 * Imports
 */
import router from '@/router';
import { ref } from 'vue';

/**
 * Data
 */

/**
 * Methods
 */
const homePage = () => {
  router.push('/');
}

</script>
