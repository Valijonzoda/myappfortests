<template>
  <EasyDataTable
    :headers="headers"
    :items="quotes"
    :loading="loading"
    empty-message="Нет данных"
  >
  <template #item-genres="item">
    <span v-for="(genre, index) in item.genres" :key="'quote-' + item.id + 'genre-' + genre.id">
      {{ genre.name }}<span v-if="index + 1 !== item.genres.length">, </span>
    </span>
  </template>
  <template #item-actions="item">
    <div class="action-wrapper">
      <router-link :to="`/quotes/${item.id}`">
        <edit-icon />
      </router-link>
      <delete-icon />
    </div>
  </template>
  </EasyDataTable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import deleteIcon from '@/components/icons/deleteIcon.vue'
import editIcon from '@/components/icons/editIcon.vue'
import QuoteDataService from "@/services/QuoteDataService";
import type ResponseData from "@/types/ResponseData";
import type Quote from "@/types/Quote";

export default defineComponent({
  name: "Quotes",
  components: {
    'edit-icon': editIcon,
    'delete-icon': deleteIcon
  },
  data() {
    return {
      headers:[
        { text: "ID", value: "id" },
        { text: "Текст", value: "text" },
        { text: "Автор", value: "author" },
        { text: "Жанры", value: "genres" },
        { text: "Действия", value: "actions" },
      ],
      loading: false,
      quotes: [] as Quote[]
    }
  },
  mounted() {
    this.retrieveQuotes()
  },
  methods: {
    retrieveQuotes() {
      this.loading = true
      QuoteDataService.getAll()
        .then((response: ResponseData) => {
          this.quotes = response.data
        })
        .catch((e: Error) => {
          console.log(e);
        })
        .finally(() => {
          this.loading = false
        })
    },
  }
})

</script>