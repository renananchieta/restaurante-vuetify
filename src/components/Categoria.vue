<template>
    <v-container>
        <v-card class="mb-4">
            <Pesquisar 
            subtitulo="Pesquisar Categorias"
            titulo="Categorias"
            @pesquisar="pesquisar"
            >
                <v-row>
                    <v-col
                    cols="12"
                    md="12"
                    >
                        <v-text-field
                        v-model="categoria"
                        append-inner-icon="mdi-file-search-outline"
                        label="Categoria"
                        variant="outlined"
                        density="compact"
                        :loading="loadingCategoria"
                        />
                    </v-col>
                </v-row>
            </Pesquisar>
        </v-card>
        <v-card>
            <TabelaCategoria
            :headers="headers"
            :items="dados"
            :title="componentTitle"
            :loading="loadingTableCategoria"
            @salvar="ajaxNovo"
            @deletar="ajaxDeletar"
            />
        </v-card>
    </v-container>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import api from "@/plugins/api";
import TabelaCategoria from '@/components/Tables/TabelaCategoria.vue';
import Pesquisar from '@/components/Search/Pesquisar.vue';
import { AxiosError, AxiosResponse } from 'axios';


/**
 * Data
 */
const categoria = ref('');
const componentTitle = ref('Categorias');
 const headers = ([
    // {title: 'ID', key:'id'},
    {title: 'Categoria', key: 'categoria'},
    {title: 'Ações', align: 'end', key: 'actions'}
]);
const dados = ref([]);
const loadingCategoria = ref(false);
const loadingTableCategoria = ref(false);


/**
 * Methods
 */

const pesquisar = () => {
    loadingCategoria.value = true;
    api.get('/restaurante/categorias', {
        params:{
            categoria: categoria.value
        }
    }).then((response: any) => {
        dados.value = response.data;
    })
    .catch((error: any) => {
        console.log(error.data);
    })
    .finally(() => {
        loadingCategoria.value = false;
    })
};

const ajaxNovo = (item: AxiosResponse) => {
  loadingTableCategoria.value = true;
  if (item.id) {
    ajaxEditar(item);
  } else {
    api.post('/restaurante/categorias/store', item)
      .then((response: AxiosResponse) => {
        dados.value.push(response.data);
      })
      .catch((error: AxiosError) => {
        alert(error);
      }).finally(() => {
        loadingTableCategoria.value = false;
    });
  }
}

const ajaxEditar = (item: AxiosResponse) => {
  loadingTableCategoria.value = true;
  api.put(`/restaurante/categorias/update/${item.id}`, item)
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
        loadingTableCategoria.value = false;
    })
}

const ajaxDeletar = (item: AxiosResponse) => {
loadingTableCategoria.value = true;
  api.delete(`/restaurante/categorias/delete/${item.id}`)
    .then((response: AxiosResponse) => {
      dados.value.splice(dados.value.indexOf(item), 1);
    })
    .catch((error: AxiosError) => {
      alert(error);
    })
    .finally(() => {
        loadingTableCategoria.value = false;
    })
}

/**
 * Hooks
 */
onMounted(() => {
    pesquisar();
})

</script>