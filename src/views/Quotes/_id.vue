<template>
  <div class="container">
    <h1 class="headline">Изменение цитаты</h1>
    <form action="" @submit.prevent="editQuote">
      <div class="input-container">
        <label for="text">Цитата</label>
        <textarea id="text"
        required
        v-model="quote.text"
        placeholder="Введите цитату"
        rows="10"></textarea>
      </div>
      <div class="input-container">
        <label for="author">
          Автор
        </label>
        <input
        pattern="[a-zA-ZА-Яа-я]+$"
        title="Имя не должно содержать числа или спецсимволы"
        required
        type="text"
        id="author"
        v-model="quote.author"
        placeholder="Введите имя/псевдоним автора">
      </div>
      <div class="input-container">
        <label>Жанры</label>
        <v-select
        :disabled="loading"
        placeholder="Выберите один или несколько жанров"
        multiple
        v-model="quote.genres"
        :options="genres"
        label="name"></v-select>
      </div>
      <button :disabled="loading" class="submit-btn" type="submit">Изменить</button>
    </form>
    <loader :loading="loading"/>
    <!-- <dialog-modal title="dassda"/> -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type Quote from "@/types/Quote";
import type Genre from "@/types/Genre";
import type ResponseData from "@/types/ResponseData";
import QuoteDataService from "@/services/QuoteDataService";
import GenreDataService from "@/services/GenreDataService";
import DialogModal from '@/components/DialogModal.vue'
import Loader from '@/components/Loader.vue'

export default defineComponent({
  components: { 
    DialogModal,
    Loader
  },
  data() {
    return {
      genres: [] as Genre[],
      loading: false,
      quote: {} as Quote,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    editQuote() {
      const id: string | any = this.$route.params.id
      this.loading = true
      QuoteDataService.update(id, this.quote)
      .then((res: ResponseData) => {
        this.loading = false
        this.$router.push('/quotes')
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false
      })
    },
    getQuoteById(): Promise<any> {
      const id: string | any = this.$route.params.id
      return QuoteDataService.get(id)
    },
    getAllGenres(): Promise<any> {
      return GenreDataService.getAll()
    },
    getData() {
      this.loading = true
      Promise.all([this.getAllGenres(), this.getQuoteById()])
      .then(([genresResponse, quoteResponse]) => {
        this.genres = genresResponse.data
        this.quote = quoteResponse.data
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false
      })
    }
  },

})
</script>