<template>
  <div ref="table">
    <v-row no-gutters>
      <v-col cols="2">
        <v-card>
          <v-card-title class="py-5">分类</v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item-group v-model="choose">
              <v-list-item
                v-for="(item, i) in category"
                :key="i" @click="change(i)">
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="10" class="pl-4">
        <v-card flat>
          <v-card-title>
            <v-col class="py-0" cols="2">
              <v-select label="每页元素" v-model="itemsPerPage_" :items="rangList" hide-details>
              </v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="搜索"
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :loading="loading" loading-text="加载中..."
            locale="zh-Hans"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            @page-count="pageCount = $event"
            :headers="headers"
            :items="booklist"
            :search="search"
            item-key="title"
            hide-default-footer
            hide-default-header>
            <template v-slot:item.title="{ item }">
              <book-summary :book="item"></book-summary>
            </template>

            <template v-slot:footer>
              <v-container>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="3" align-self="center" class="caption">{{ getRange() }}</v-col>
                  <v-col cols="6"><v-pagination v-model="page" :length="pageCount"></v-pagination></v-col>
                </v-row>
              </v-container>
            </template>

            <template v-slot:no-results>
              <span>没有搜索到匹配的结果</span>
            </template>

            <template v-slot:no-data>
              <span>数据库中没有书籍信息</span>
            </template>

          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import bookSummary from './booksummary'
import { KindList } from '../config'
import { hasOwn } from '../util'
import { getBookList } from '../common/bookservice'

export default {
  name: 'book-list',
  components: {
    bookSummary
  },
  data: () => ({
    choose: 0,
    category: [{ text: '全部', value: null }, ...KindList],
    search: '', loading: true,
    rangList: [ 5, 10, 15, 20, '全部' ],
    page: 1, pageCount: 0, itemsPerPage: 5, itemsPerPage_: 5,
    booklist: [],
    headers: [
      {
        text: '列表', value: 'title',
        sortable: false
      }
    ]
  }),
  watch: {
    itemsPerPage_(newv) {
      if (this.rangeList.indexOf(newv) === -1) {
        this.itemsPerPage = 5;
      } else if (newv === '全部') {
        this.itemsPerPage = this.booklist.length + 1;
      } else {
        this.itemsPerPage = newv;
      }
      this.page = 1;
    },
    page(newV) {
      let query = {};
      if (this.itemsPerPage_ === '全部') {
        query.page = String(newV);
        query.perpage = 'all';
      } else {
        query.page = String(newV);
        query.perpage = String(this.itemsPerPage_);
      }
      if (query.page !== this.$route.query.page || query.perpage !== this.$route.query.perpage) {
        this.$router.push({
          path: '/book', query
        });
      }
    }
  },
  methods: {
    getRange() {
      let l = (this.page - 1) * this.itemsPerPage + 1;
      let r = this.page * this.itemsPerPage;
      if (this.booklist.length == 0) l = 0;
      return `共 ${this.booklist.length} 个元素中第 ${l} 个到第 ${Math.min(r, this.booklist.length)} 个`;
    },
    change(i) {
      this.init(this.category[i].value);
    },
    async init(category, type) {
      if (type === undefined) {
        this.$vuetify.goTo(this.$refs.table);
      }
      this.loading = true;
      let data = await getBookList(1, 100000, category);
      if (hasOwn(data, 'status') && data.status === 'error') {

      } else {
        this.booklist = data;
        this.loading = false;

        if (hasOwn(this.$route.query, 'page') && hasOwn(this.$route.query, 'perpage')) {
          if (this.$route.query.perpage === 'all') {
            this.itemsPerPage_ = '全部';
          } else {
            this.itemsPerPage_ = Number(this.$route.query.perpage);
          }
          this.page = Number(this.$route.query.page);
        }
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (hasOwn(to.query, 'search')) {
      this.search = to.query.search;
    }
    next();
  },
  created() {
    if (hasOwn(this.$route.query, 'search')) {
      this.search = this.$route.query.search;
    }
    this.init(null, true);
  },
  mounted() {
    this.$vuetify.goTo(this.$refs.table);
  }
}
</script>

<style>

</style>