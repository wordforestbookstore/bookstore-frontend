<template>
  <div>
    <v-btn large color="primary" to="/book">返回所有书籍</v-btn>
    <v-card class="mt-5" :loading="loading" min-height="300px">
      <v-container>
        <v-alert dismissible transition="scale-transition"
          v-model="alert.show"
          :type="alert.type">{{ alert.text }}</v-alert>
        <v-row>
          <v-col cols="2">
            <v-img :src="getImage"></v-img>
          </v-col>
          <v-col v-if="info" cols="10">
            <h3 class="mb-3">{{ info.title }}</h3>

            <v-row>
              <v-col cols="7">
                <p class="mb-2"><span class="font-weight-bold">作者</span>  {{ info.author }}</p>
                <p class="mb-2"><span class="font-weight-bold">出版社</span>  {{ info.publisher }}</p>
                <p class="mb-2"><span class="font-weight-bold">出版日期</span>  {{ info.publicationDate }}</p>
                <p class="mb-2"><span class="font-weight-bold">语言</span>  {{ info.language | lang }}</p>
                <p class="mb-2"><span class="font-weight-bold">分类</span>  {{ info.category | kind }}</p>
                <p class="mb-2"><span class="font-weight-bold">{{ info.format | formatF }}</span>  {{ info.numberOfPages }} 页</p>
                <p class="mb-2"><span class="font-weight-bold">ISBN</span>  {{ info.ISBN }}</p>
                <p class="mb-3"><span class="font-weight-bold">邮寄重量</span>  {{ info.shippingWeight }} 克</p>
              </v-col>
              <v-col cols="5">
                <v-card>
                  <v-container>
                    <v-row>
                      <v-col>
                        <p class="mb-2 title">
                          <v-row no-gutters>
                            <v-col cols="5" class="font-weight-bold mr-2">售价</v-col>
                            <v-col class="red--text">¥ {{ info.ourPrice }}</v-col>
                          </v-row>
                        </p>
                        <p class="mb-2">
                          <v-row no-gutters>
                            <v-col cols="5" class="font-weight-bold mr-2">原价</v-col>
                            <v-col><del>¥ {{ info.listPrice }}</del></v-col>
                          </v-row>
                        </p>
                        <p class="mb-2">
                          <v-row no-gutters>
                            <v-col cols="5" class="font-weight-bold mr-2">已节省</v-col>
                            <v-col>¥ {{ (info.listPrice - info.ourPrice).toFixed(2) }}</v-col>
                          </v-row>
                        </p>
                        <p class="mb-0">
                          <v-row no-gutters>
                            <v-col align-self="center" cols="5" class="font-weight-bold mr-2">数量</v-col>
                            <v-col>
                              <v-select class="mt-0 pt-0"
                                single-line hide-details flat
                                v-model="num"
                                :items="[1,2,3,4,5,6,7,8,9]"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </p>
                      </v-col>
                      <v-col offset-md="1" align-self="center">
                        <div class="mb-1">
                          <span class="success--text" v-if="info.inStockNumber > 0">
                            <v-icon color="success">done</v-icon> 有货
                          </span>
                          <span class="error--text" v-else>
                            <v-icon color="error">clear</v-icon> 缺货
                          </span>
                        </div>
                        <div>
                          <v-btn @click="addCart"
                            :disabled="info.inStockNumber <= 0"
                            color="orange" class="d-inline-block">
                            <v-icon>add_shopping_cart</v-icon>加入购物车
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            
            <v-divider></v-divider>
            <vue-markdown class="mt-5" :source="info.description"></vue-markdown>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { getBookInfo } from '../common/bookservice'
import { checkLogin } from '../common/userservice'
import { addShoppingCart } from '../common/shopservice'
import { KindMap, API_URL } from '../config'
import { hasOwn } from '../util'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'book-info',
  components: {
    VueMarkdown
  },
  data: () => ({
    num: 1,
    loading: true,
    info: null,
    alert: {
      show: false, type: 'success', text: ''
    },
  }),
  computed: {
    getImage() {
      if (!this.info) return '';
      return `${API_URL}/img/${this.info.id}.png`;
    },
  },
  methods: {
    async init(id) {
      this.loading = true;
      let res = await getBookInfo(id);
      if (hasOwn(res, 'status') && res.status === 'error') {

      } else {
        this.info = res;
        this.loading = false;
      }
    },
    async addCart() {
      this.alert.show = false;
      if (!checkLogin()) {
        this.$router.push({
          path: '/user/login',
          query: {
            redirect: this.$route.fullPath
          }
        });
        return ;
      }
      let res = await addShoppingCart(this.info.id, this.num);
      if (hasOwn(res, 'status') && res.status === 'error') {
        this.alert.type = 'error';
        this.alert.text = res.message;
      } else {
        this.alert.type = 'success';
        this.alert.text = '添加购物车成功';
      }
      this.alert.show = true;
    }
  },
  filters: {
    kind(val) {
      if (hasOwn(KindMap, val)) return KindMap[val];
      return '';
    },
    lang(val) {
      if (val === 'en' || val === 'english') return '英语';
      if (val === 'cn' || val === 'chinese') return '中文';
      return '';
    },
    formatF(val) {
      if (val === 'paperback') return '软装';
      if (val === 'hardback') return '精装';
      return '';
    }
  },
  created() {
    this.init(this.$route.query.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to.query.id);
    next();
  }
}
</script>

<style>
@import '~github-markdown-css';
</style>