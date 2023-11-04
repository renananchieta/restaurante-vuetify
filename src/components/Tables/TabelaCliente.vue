<template>
    <v-data-table
      :headers="headers? [headers] : []"
      :items="dados"
      item-selectable
      class="elevation-1"
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-card-title>{{ title }}</v-card-title>
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="750px"
          >
            <template #activator="{ props }">
              <v-btn
                class="text-capitalize"
                density="default"
                v-bind="props"
                variant="tonal"
              >
                <v-icon left>
                  mdi-plus
                </v-icon>
                Novo
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-form @submit.prevent="setSalvar">
                    <v-row >
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedItem.nome"
                          label="Nome"
                          :loading="loadingProdutos"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedItem.telefone"
                          label="Telefone"
                          placeholder="(91)00000-0000"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col 
                       cols="12" 
                       md="6"
                      >
                        <v-text-field 
                         v-model="editedItem.identificacao"
                         label="Identificação"
                        />
                      </v-col>
                      <v-col 
                       cols="12" 
                       md="6"
                      >
                        <v-text-field 
                         v-model="editedItem.saldo"
                         label="Saldo (R$)"
                         type="number"
                        />
                      </v-col>
                    </v-row>
                </v-form>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="setSalvar"
                >
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogDelete"
            max-width="505px"
          >
            <v-card>
              <v-card-title class="text-h5">
                Tem certeza que deseja remover este item?
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="closeDelete"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
                >
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="me-2"
          color="purple-lighten-2"
          size="small"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          color="red-lighten-2"
          size="small"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </template>

<script lang="ts" setup>
import api from "@/plugins/api";
import { onMounted } from "vue";
import {computed, nextTick, ref, watch} from "vue";

const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
    required: true
  },
  dados: {
    type: Array,
    default: () => [],
    required: true
  },
  title: {
    type: String,
    default: '',
    required: true,
  }
});

const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({
  nome: '',
  telefone: '',
  identificacao: null,
  saldo: null,
});
const defaultItem = ref({
  nome: '',
  telefone: null,
  identificacao: null,
  saldo: null,
});
const loadingProdutos = ref(false);
const produtosCombo = ref([]);

const formTitle = computed(() => editedIndex.value === -1 ? 'Novo' : 'Edição');

watch(() => dialogDelete, (value) => {
    return value || closeDelete();
});
watch(() => dialog, (val) => {
    return val || close();
});

const emit = defineEmits(['salvar', 'editar', 'deletar']);
const setSalvar = () => {
  emit('salvar', editedItem.value);
  close();
};

const editItem = (item: any) => {
  emit('editar', item);
  editedIndex.value = 1;
  editedItem.value = Object.assign({}, item)
  dialog.value = true
};

let itemASerDeletado = {};
const deleteItem = (item: any) => {
  itemASerDeletado = item;
  dialogDelete.value = true;
};

const close = () => {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
};

const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
};

const deleteItemConfirm = () => {
  emit('deletar', itemASerDeletado);
  closeDelete();
};

</script>