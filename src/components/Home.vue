<template>
    <v-container>
        <v-row  class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4">
          <v-col cols="12" md="6">
            <v-card @click="irParaPage('categoria')">
              <v-card-title>Categoria</v-card-title>
              <v-img
                height="200"
                src="@/assets/image/categoria.jpg"
                cover
                class="text-white"
              />
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card @click="irParaPage('produtos')">
              <v-card-title>Produtos</v-card-title>
              <v-img
                height="200"
                src="@/assets/image/produtos.jpg"
                cover
                class="text-white"
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row  class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4">
          <v-col cols="12" md="6">
            <v-card @click="irParaPage('cardapio')">
              <v-card-title>Cardápio</v-card-title>
              <v-img
                height="200"
                src="@/assets/image/menu.jpg"
                cover
                class="text-white"
              />
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card @click="irParaPage('clientes')">
              <v-card-title>Clientes</v-card-title>
              <v-img
                height="200"
                src="@/assets/image/clientes.jpg"
                cover
                class="text-white"
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row  class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4">
          <v-col cols="12" md="6">
            <v-card @click="irParaPage('pedidos')">
              <v-card-title>Pedidos</v-card-title>
              <v-img
                height="200"
                src="@/assets/image/pedidos.jpg"
                cover
                class="text-white"
              />
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card @click="irParaPage('transacoes')">
              <v-card-title>Transações</v-card-title>
              <v-img
                height="200"
                src="@/assets/image/transacoes.jpg"
                cover
                class="text-white"
              />
            </v-card>
          </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import router from '@/router';

/**
 * Imports
 */

/**
 * Data
 */

/**
 * Methods
 */
const irParaPage = (v: string) => {
  switch (v) {
    case 'categoria':
      router.push('/categoria');
      break;
    case 'produtos':
      router.push('/produtos');
      break;
    case 'cardapio':
    router.push('/cardapio');
      break;
    case 'clientes':
      console.log('clientes');
      break;
    case 'pedidos':
      console.log('pedidos');
      break;
    case 'transacoes':
      console.log('transacoes');
      break;
  }
}


/**
 * Hooks
 */

</script>