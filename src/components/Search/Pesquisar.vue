<template>
    <v-card
      :subtitle="subtitulo"
      :title="titulo"
    >
      <v-card-text class="pa-3">
        <slot />
        <v-divider class="" />
      </v-card-text>
      <v-card-actions class="pa-3">
        <v-btn
          class="text-capitalize"
          density="default"
          variant="tonal"
          @click="enviarDadosPequisa"
          :loading="carregando"
        >
          <v-icon left>
            mdi-magnify
          </v-icon>
          Pesquisar
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script lang="ts" setup>
  
  const props = defineProps({
    titulo: {
      type: String,
      required: true
    },
    subtitulo: {
      type: String,
      required: false
    },
    carregando: {
      type: Boolean,
      default: false,
      required: false
    },
  });
  
  const emit = defineEmits(['pesquisar']);
  const enviarDadosPequisa = () => emit('pesquisar');
  
  </script>
  
  <style scoped>
  
  </style>
  