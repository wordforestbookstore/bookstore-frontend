<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-img :src="getImage"></v-img>
      </v-col>
      <v-col cols="10">
        <h3>
          <router-link :to="url">{{ book.title }}</router-link>
        </h3>
        <p class="mt-2 mb-0">{{ book.publicationDate }}</p>
        <p class="mb-2">{{ book.author }}</p>
        <p class="mb-0">{{ book.format | formatF }} {{ book.numberOfPages }} 页</p>
        <p class="mb-2">
          <span class="mr-2 headline red--text">¥ {{ book.ourPrice }}</span>
          <span><del>¥ {{ book.listPrice }}</del></span>
        </p>
        <p>
          <vue-markdown :source="description"></vue-markdown>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { KindMap, API_URL } from '../config'
import { hasOwn } from '../util'

export default {
  name: 'book-summary',
  components: {
    VueMarkdown
  },
  data: () => ({

  }),
  computed: {
    url() {
      return {
        name: 'bookinfo',
        query: {
          id: this.book.id
        },
        params: {
          redirect: this.$route.fullPath
        }
      };
    },
    getImage() {
      if (!this.book.id) return '';
      return `${API_URL}/img/${this.book.id}.png`;
    },
    description() {
      if (!this.book.description) return '';
      if (this.book.description.length <= 300) return this.book.description;
      else return this.book.description.substr(0, 300) + '...';
    }
  },
  filters: {
    kind(val) {
      if (hasOwn(KindMap, val)) return KindMap[val];
      return '';
    },
    formatF(val) {
      if (val === 'paperback') return '平装';
      if (val === 'hardback') return '精装';
      return '';
    }
  },
  props: [
    'book'
  ]
}
</script>

<style>

</style>