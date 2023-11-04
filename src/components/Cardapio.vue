<template>
    <v-container>
        <v-card class="mb-4">
            <Pesquisar 
            titulo="Cardapio"
            subtitulo="Pesquisar itens no Cardapio"
            @pesquisar="pesquisar"
            >
                <v-row>
                    <v-col
                    cols="12"
                    md="12"
                    >
                        <v-autocomplete
                        v-model="cardapio"
                        :items="dados"
                        item-title="produtoDesc"
                        item-value="produtoId"
                        append-inner-icon="mdi-file-search-outline"
                        label="item do Cardápio"
                        variant="outlined"
                        density="compact"
                        :loading="loadingPesquisa"
                        />
                    </v-col>
                </v-row>
            </Pesquisar>
        </v-card>    
        <v-card>
            <TabelaCardapio 
            :headers="headers"
            :items="dados"
            :title="componentTitle"
            :loading="loadingTable"
            @salvar="ajaxNovo"
            @deletar="ajaxDeletar"
            />
        </v-card>
    </v-container>
</template>

<script lang="ts" setup>
import Pesquisar from '@/components/Search/Pesquisar.vue';
import api from '@/plugins/api';
import { ref } from 'vue';
import TabelaCardapio from './Tables/TabelaCardapio.vue';
import { onMounted } from 'vue';
import { AxiosError, AxiosResponse } from 'axios';

/**
 * Data
 */
const componentTitle = ref('Cardapio');
const loadingPesquisa = ref(false);
const loadingTable = ref(false);
const cardapio = ref('');
const dados = ref([]);
const produtosCombo = ref([]);
const headers = ([
    {title: 'Categoria', key: 'categoria'},
    {title: 'Produto', key: 'produtoDesc'},
    {title: 'Valor', key: 'valorShow'},
    {title: 'Detalhes', key: 'descricao'},
    {title: 'Ações', align: 'end', key: 'actions'}
]);
const categoriaDesc = ref([]);

/**
 * Methods
 */
 const pesquisar = () => {
    loadingPesquisa.value = true;
    loadingTable.value = true;
    api.get('/restaurante/cardapio', {
        params: {
            cardapio: cardapio.value
        }
    })
    .then((response: any) => {
        dados.value = response.data;
        
    })
    .catch((error: any) => {
        console.log(error.data);
    })
    .finally(() => {
        loadingPesquisa.value = false;
        loadingTable.value = false;
    })
};

const ajaxNovo = (item: AxiosResponse) => {
    loadingTable.value = true;
  if (item.id) {
    ajaxEditar(item);
  } else {
    api.post('/restaurante/cardapio', item)
      .then((response: AxiosResponse) => {
        dados.value.push(response.data);
      })
      .catch((error: AxiosError) => {
        alert(error.data);
      }).finally(() => {
        loadingTable.value = false;
    });
  }
}

const ajaxEditar = (item: AxiosResponse) => {
    loadingTable.value = true;
  api.put(`/restaurante/cardapio/${item.id}`, item)
    .then((response: AxiosResponse) => {
      dados.value = dados.value.map((dado: any) => {
        if (dado.id === item.id) {
          dado = response.data;
        }
        return dado
      })
    })
    .catch((error: AxiosError) => {
      alert(error);
    })
    .finally(() => {
        loadingTable.value = false;
    })
}

const ajaxDeletar = (item: AxiosResponse) => {
    loadingTable.value = true;
  api.delete(`/restaurante/cardapio/${item.id}`)
    .then(() => {
      dados.value.splice(dados.value.indexOf(item), 1);
    })
    .catch((error: AxiosError) => {
      alert(error);
    })
    .finally(() => {
        loadingTable.value = false;
    })
}

/**
 * Hooks
 */
onMounted(() => {
    pesquisar();
    // getProdutos();
})

</script>