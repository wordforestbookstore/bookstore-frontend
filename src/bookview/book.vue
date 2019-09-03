<template>
  <v-container>
    <headpic :title="title"></headpic>
    <router-view></router-view>
  </v-container>
</template>

<script>
import headpic from '../components/headpic'
import { checkLogin, getUser } from '../common/userservice'

export default {
  name: 'book-index',
  components: {
    headpic
  },
  data: () => ({

  }),
  computed: {
    title() {
      if (checkLogin()) {
        return getUser().firstName;
      } else {
        return '所有书籍';
      }
    }
  }
}
</script>

<style>

</style>