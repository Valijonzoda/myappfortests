<template>
  <div class="container">
    <h1 class="headline">Создание цитаты</h1>
    <form action="" @submit.prevent="createQuote">
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
      <button :disabled="loading" class="submit-btn" type="submit">Создать</button>
    </form>
    <Loader :loading="loading"/>
  </div>
</template>
<script lang="ts">
import Loader from '@/components/Loader.vue'
import { defineComponent } from "vue";
import QuoteDataService from "@/services/QuoteDataService";
import GenreDataService from "@/services/GenreDataService";
import type Quote from "@/types/Quote";
import type Genre from "@/types/Genre";
import type ResponseData from "@/types/ResponseData";
export default defineComponent({
  name: 'QuoteCreate',
  components: { Loader },
  data() {
    return {
      quote: {} as Quote,
      genres: [] as Genre[],
      loading: false
    }
  },
  mounted() {
    this.retrieveGenres()
  },
  methods: {
    createQuote(){
      this.loading = true
      QuoteDataService.create(this.quote)
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
    retrieveGenres() {
      this.loading = true
      GenreDataService.getAll()
      .then((res: ResponseData) => {
        this.genres = res.data
      })
      .finally(() => {
        this.loading = false
      })
    }
  }
})
</script>

