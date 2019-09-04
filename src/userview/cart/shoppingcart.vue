<template>
  <v-container>
    <headpic :title="user.firstName"></headpic>
    
    <v-btn class="mb-2" large color="primary" to="/book">返回所有书籍</v-btn>

    <v-data-table
      :loading="loading" loading-text="加载中..."
      locale="zh-Hans"
      :headers="headers"
      :items="cartlist"
      v-model="selected"
      item-key="title"
      show-select
      hide-default-footer>

      <template v-slot:item.product="{ item }">
        <v-img class="my-2" :src="getImage(item)" max-width="100px"></v-img>
      </template>
      
      <template v-slot:item.title="{ item }">
        <div class="mb-1 subtitle-1">
          <router-link :to="`/book/bookInfo?id=${item.id}`">{{ item.title }}</router-link>
        </div>
        <div class="subtitle-1">
          <span class="success--text" v-if="item.inStockNumber > 0">
            <v-icon color="success">done</v-icon> <span>有货</span>
          </span>
          <span class="error--text" v-else>
            <v-icon color="error">clear</v-icon> <span>缺货</span>
          </span>
        </div>
      </template>

      <template v-slot:item.price="{ item }">
        <span class="subtitle-1 red--text">¥ {{ item.ourPrice }}</span>
      </template>

      <template v-slot:item.number="{ item }">
        <v-btn class="subtitle-1" icon 
          @click="subItem(item)"
          :disabled="item.number <= 1">
          <v-icon>remove</v-icon>
        </v-btn>
        <span class="subtitle-1 mx-1">{{ item.number }}</span>
        <v-btn class="subtitle-1" icon 
          @click="addItem(item)"
          :disabled="item.number >= 9 || item.number >= Number(item.inStockNumber)">
          <v-icon>add</v-icon>
        </v-btn>
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn icon @click.stop="goDelete(item)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>

      <template v-slot:footer>
        <v-divider></v-divider>
        <v-container>
          <v-row>
            <v-col class="title">
              <span class="font-weight-bold">合计 ( {{ sumNum }} 件 ) : </span> 
              <span class="red--text">¥ {{ sumPrice }}</span>
            </v-col>
            <v-col class="text-right">
              <v-btn large color="primary" @click="checkout"
                :disabled="selected.length <= 0">结算</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:no-data>
        <span>购物车为空</span>
      </template>

    </v-data-table>

    <v-dialog v-model="dialog" width="300">
      <v-card>
        <v-card-title class="title" primary-title>确认删除？</v-card-title>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" text @click="confirmDelete">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import { getUser } from '../../common/userservice'
import { getShoppingCartList, addShoppingCart, delShoppingCart } from '../../common/shopservice'
import headpic from '../../components/headpic'
import { hasOwn } from '../../util'
import { API_URL } from '../../config'

export default {
  name: 'shopping-cart',
  components: {
    headpic
  },
  data: () => ({
    dialog: false, totDelete: null,
    loading: false,
    user: null,
    selected: [],
    cartlist: [],
    headers: [
      {
        text: '商品', value: 'product',
        sortable: false, width: '100px',
        align: 'center',
        class: 'title'
      },
      {
        text: '', value: 'title',
        sortable: false,
      },
      {
        text: '价格', value: 'price',
        sortable: false,
        align: 'center',
        width: '15%',
        class: 'title'
      },
      {
        text: '数量', value: 'number',
        sortable: false,
        align: 'center',
        width: '10%',
        class: 'title'
      },
      { 
        text: '操作', value: 'action', 
        sortable: false,
        align: 'center',
        width: '8%',
        class: 'title'
      },
    ]
  }),
  computed: {
    sumNum() {
      let sum = 0;
      for (let good of this.selected) {
        sum += Number(good.number);
      }
      return sum;
    },
    sumPrice() {
      let sum = 0.0;
      for (let good of this.selected) {
        sum += Number(good.ourPrice) * Number(good.number);
      }
      return sum.toFixed(2);
    }
  },
  methods: {
    subItem(item) {
      const id = this.cartlist.indexOf(item);
      if (id !== -1 && this.cartlist[id].number > 1) {
        this.cartlist[id].number--;
        delShoppingCart(item.id, 1);
      }
    },
    addItem(item) {
      const id = this.cartlist.indexOf(item);
      if (id !== -1 && this.cartlist[id].number < 9) {
        this.cartlist[id].number++;
        addShoppingCart(item.id, 1);
      }
    },
    goDelete(item) {
      this.totDelete = item;
      this.dialog = true;
    },
    confirmDelete() {
      delShoppingCart(this.totDelete.id, this.totDelete.number);
      let id = this.cartlist.indexOf(this.totDelete);
      if (id !== -1) {
        this.cartlist.splice(id, 1);
      }
      id = this.selected.indexOf(this.totDelete);
      if (id !== -1) {
        this.selected.splice(id, 1);
      }
      this.dialog = false;
    },
    getImage(item) {
      if (!item.id) return '';
      return `${API_URL}/img/${item.id}.png`;
    },
    checkout() {
      this.$router.push({
        name: 'checkout',
        params: {
          items: this.selected
        }
      });
    }
  },
  async created() {
    document.title = '购物车 - 辞林书店';
    this.loading = true;
    this.user = getUser();
    let data = await getShoppingCartList();
    if (hasOwn(data, 'status') && data.status === 'error') {
    
    } else {
      this.cartlist = data;
      this.selected = data;
      this.loading = false;
    }
  }
}
</script>

<style>

</style>