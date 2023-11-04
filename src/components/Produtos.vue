<template>
    <v-container>
        <v-card class="mb-4">
            <Pesquisar 
            titulo="Produtos"
            subtitulo="Pesquisar Produtos"
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
                        label="Produtos"
                        variant="outlined"
                        density="compact"
                        :loading="loading"
                        />
                    </v-col>
                </v-row>
            </Pesquisar>
        </v-card>
        <v-card>
            <TabelaPaginada
            :headers="headers"
            :items="dados"
            :title="componentTitle"
            :loading="loadingTableProduto"
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
import TabelaPaginada from '@/components/Tables/TabelaPaginada.vue';
import Pesquisar from '@/components/Search/Pesquisar.vue';
import { AxiosError, AxiosResponse } from 'axios';


/**
 * Data
 */
const categoria = ref('');
const componentTitle = ref('Produtos');
const headers = ([
    // {title: 'ID', key:'id'},
    {title: 'Categoria', key: 'categoriaDesc'},
    {title: 'Produto', key: 'produto'},
    {title: 'Ações', align: 'end', key: 'actions'}
]);
const dados = ref([]);
const loading = ref(false);
const loadingTableProduto = ref(false);

/**
 * Methods
 */

const pesquisar = () => {
  loading.value = true;
    api.get('/restaurante/produtos', {
        params:{
            produto: categoria.value
        }
    }).then((response: any) => {
        dados.value = response.data;
    })
    .catch((error: any) => {
        console.log(error.data);
    })
    .finally(() => {
      loading.value = false;
    })
};

const ajaxNovo = (item: AxiosResponse) => {
  loadingTableProduto.value = true;
  if (item.id) {
    ajaxEditar(item);
  } else {
    api.post('/restaurante/produtos', item)
      .then((response: AxiosResponse) => {
        dados.value.push(response.data);
      })
      .catch((error: AxiosError) => {
        alert(error.data);
      }).finally(() => {
        loadingTableProduto.value = false;
    });
  }
}

const ajaxEditar = (item: AxiosResponse) => {
  loadingTableProduto.value = true;
  api.put(`/restaurante/produtos/${item.id}`, item)
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
        loadingTableProduto.value = false;
    })
}

const ajaxDeletar = (item: AxiosResponse) => {
loadingTableProduto.value = true;
  api.delete(`/restaurante/produtos/${item.id}`)
    .then(() => {
      dados.value.splice(dados.value.indexOf(item), 1);
    })
    .catch((error: AxiosError) => {
      alert(error);
    })
    .finally(() => {
        loadingTableProduto.value = false;
    })
}



/**
 * Hooks
 */
onMounted(() => {
    pesquisar();
})

</script>