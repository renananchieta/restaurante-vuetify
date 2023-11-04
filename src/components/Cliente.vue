<template>
    <v-container>
        <v-card class="mb-4">
            <Pesquisar 
            titulo="Cliente"
            subtitulo="Pesquisar Cliente"
            @pesquisar="pesquisar"
            >
                <v-row>
                    <v-col
                    cols="12"
                    md="12"
                    >
                        <v-autocomplete
                        v-model="cliente"
                        :items="dados"
                        item-title="nome"
                        item-value="id"
                        append-inner-icon="mdi-file-search-outline"
                        label="Cliente"
                        variant="outlined"
                        density="compact"
                        :loading="loadingPesquisa"
                        />
                    </v-col>
                </v-row>
            </Pesquisar>
        </v-card>
        <v-card>
            <TabelaCliente
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

<script setup lang="ts">
import Pesquisar from '@/components/Search/Pesquisar.vue';
import api from '@/plugins/api';
import { onMounted } from 'vue';
import { ref } from 'vue';
import TabelaCliente from './Tables/TabelaCliente.vue';
import { AxiosError, AxiosResponse } from 'axios';

/**
 * Data
 */
 const loadingPesquisa = ref(false);
 const loadingTable = ref(false);
 const cliente = ref(null);
 const dados = ref([]);
 const headers = ([
    {title: 'Nome', key: 'nome'},
    {title: 'Telefone', key: 'telefone'},
    {title: 'Identificação', key: 'identificacao'},
    {title: 'Saldo (R$)', key: 'saldoShow'},
    {title: 'Ações', key: 'actions'},
 ]);
 const componentTitle = ref('Clientes');

/**
 * Methods
 */
 const pesquisar = () => {
    loadingPesquisa.value = true;
    loadingTable.value = true;
    api.get('/restaurante/clientes', {
        params: {
            cliente: cliente.value
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
    api.post('/restaurante/clientes', item)
      .then((response: AxiosResponse) => {
        dados.value.push(response.data);
      })
      .catch((error: AxiosError) => {
        alert(error.data);
      }).finally(() => {
        loadingTable.value = false;
    });
  }
};

const ajaxEditar = (item: AxiosResponse) => {
    loadingTable.value = true;
  api.put(`/restaurante/clientes/${item.id}`, item)
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
};

const ajaxDeletar = (item: AxiosResponse) => {
    loadingTable.value = true;
  api.delete(`/restaurante/clientes/${item.id}`)
    .then(() => {
      dados.value.splice(dados.value.indexOf(item), 1);
    })
    .catch((error: AxiosError) => {
      alert(error);
    })
    .finally(() => {
        loadingTable.value = false;
    })
};

/**
 * Hooks
 */
onMounted(() => {
    pesquisar();
})
</script>