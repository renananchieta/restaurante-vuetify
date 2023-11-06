<template>
    <v-container>
        <v-card>
            <v-card-title class="text-h6 ">Extrato</v-card-title>
            <v-row>
                <v-col>
                    <v-card-text class="text-subtitle-2">Cliente: {{ nomeCliente }}</v-card-text>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                    <v-card-text> 
                        Saldo atual: 
                        <v-chip color="green">
                            R$ {{ saldo }}
                        </v-chip>
                    </v-card-text>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-title>Histórico de transações</v-card-title>
            <v-list lines="two">
                <v-list-item
                    v-for="extrato in historico"
                    :key="extrato"
                >
                <v-list-item-title>{{ extrato.data }}</v-list-item-title>
                <v-list-item-subtitle>
                    {{extrato.observacao}}  R$ {{ extrato.valor }}
                </v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-card>
    </v-container>
</template>

<script lang="ts" setup>
import api from '@/plugins/api';
import router from '@/router';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

/**
 * Data
 */
const route = useRoute();
const nomeCliente = ref('');
const saldo = ref(null);
const historico = ref([]);

/**
 * Methods
 */
const getCliente = () => {
    api.get(`/restaurante/clientes/${route.params.id}`)
    .then((response) => {
        nomeCliente.value = response.data.nome;
        saldo.value = response.data.saldoShow;
    })
    .catch((error) => {
        console.log(error.data);
    })
};

const getExtratoCliente = () => {
    api.get(`/restaurante/cliente/${route.params.id}/extrato`)
    .then((response) =>{
        historico.value = response.data;
    })
    .catch((error) => {
        console.log(error.data);
    });
}

/**
 * Hooks
 */
onMounted(() => {
    getCliente();
    getExtratoCliente();
})
</script>