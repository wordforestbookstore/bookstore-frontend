<template>
<v-container>
  <v-row>
    <v-col cols="9">
      <v-carousel cycle height="275px">
        <v-carousel-item
          v-for="(item, i) in images"
          :key="i">
          <v-img :src="item"></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col cols="3" align-self="center">
      <v-img src="../assets/logo.png" max-height="275px"></v-img>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <div class="divider"></div>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="4">
      <v-img src="../assets/bestseller.png"></v-img>
    </v-col>
    <v-col cols="4">
      <v-img src="../assets/faq.png"></v-img>
    </v-col>
    <v-col cols="4">
      <v-img src="../assets/hours.png"></v-img>
    </v-col>
  </v-row>

  <v-row class="mb-5">
    <v-col class="featured-book">
      <h2 class="text-center">
        <v-overlay absolute opacity value="true">
          <span class="d-inline-block black white--text px-4 py-2">特色书籍</span>
        </v-overlay>
      </h2>
      <div class="divider"></div>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-img src="../assets/shelf.png"></v-img>
    </v-col>
  </v-row>

</v-container>
</template>

<script>
export default {
  name: 'indexPage',
  data: () => ({
    images: [
      require('../assets/sports-q-c-1600-500-1.jpg'),
      require('../assets/sports-q-c-1600-500-2.jpg'),
      require('../assets/sports-q-c-1600-500-3.jpg')
    ],
  })
}
</script>

<style>
.divider {
  height: 0.1rem;
  width: 100%;
  background-color: black;
}
.featured-book {
  position: relative;
}
.featured-book .divider {
  position: absolute;
  top: 50%;
  width: calc(100% - 24px);
}
</style>