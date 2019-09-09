<template>
<v-container>
  <v-row>
    <v-col cols="9">
      <v-carousel cycle hide-delimiter-background height="275px">
        <v-carousel-item
          v-for="(item, i) in images"
          :key="i">
          <v-img :src="item">
            <v-sheet color="transparent" height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <v-row justify="center">
                  <v-col cols="8" style="text-shadow:1px 1px 1px #000;">
                    <div class="mb-4 text-center display-1">机器学习</div>
                    <div class="subtitle-1">
                      机器学习是人工智能的一种应用，它使系统能够在不明确的情况下自主学习和积累经验。机器学习专注于开发可以访问数据并使用它进行学习的计算机程序。
                    </div>
                  </v-col>
                </v-row>
              </v-row>
            </v-sheet>
          </v-img>
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
        <v-overlay absolute opacity value="true" z-index="1">
          <span class="d-inline-block black white--text px-4 py-2">特色书籍</span>
        </v-overlay>
      </h2>
      <div class="divider"></div>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-img src="../assets/shelf.png">
        <v-carousel hide-delimiter-background cycle height="275px">
          <v-carousel-item
            v-for="(item, i) in images"
            :key="i">
            <v-row class="fill-height" align="center" justify="center">
              <v-col cols="8">
                <v-row class="pa-5" align="center" justify="center">
                  <v-col cols="2" class="pa-5">
                    <v-img src="../assets/book1.png"></v-img>
                  </v-col>
                  <v-col cols="2" class="pa-5">
                    <v-img src="../assets/book1.png"></v-img>
                  </v-col>
                  <v-col cols="2" class="pa-5">
                    <v-img src="../assets/book1.png"></v-img>
                  </v-col>
                  <v-col cols="2" class="pa-5">
                    <v-img src="../assets/book1.png"></v-img>
                  </v-col>
                  <v-col cols="2" class="pa-5">
                    <v-img src="../assets/book1.png"></v-img>
                  </v-col>
                  <v-col cols="2" class="pa-5">
                    <v-img src="../assets/book1.png"></v-img>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-img>
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