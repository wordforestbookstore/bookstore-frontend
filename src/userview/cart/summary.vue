<template>
  <div>
    <v-alert transition="scale-transition" type="success" v-model="show">
      <div>感谢，您的订单已经被成功提交！</div>
      <div>预计发货时间为 {{ deliveryDay }}</div>
    </v-alert>

    <v-data-table
      locale="zh-Hans"
      :headers="headers"
      :items="cartlist"
      item-key="title"
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

      <template v-slot:footer>
        <v-divider></v-divider>
        <v-row>
          <v-col class="pb-0 title text-right">
            <span class="font-weight-bold">合计 ( {{ sumNum }} 件 ) : </span> 
            <span class="red--text">¥ {{ sumAll }}</span>
          </v-col>
        </v-row>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import { API_URL } from '../../config'

export default {
  name: 'order-summary',
  props: [
    'cartlist'
  ],
  data: () => ({
    show: true,
    headers: [
      {
        text: '商品', value: 'product',
        sortable: false, width: '100px',
        align: 'center',
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
      },
      {
        text: '数量', value: 'number',
        sortable: false,
        align: 'center',
        width: '10%',
      }
    ]
  }),
  computed: {
    deliveryDay() {
      let d = new Date();
      return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate() + 1} 日`;
    },
    sumNum() {
      let sum = 0;
      for (let good of this.cartlist) {
        sum += Number(good.number);
      }
      return sum;
    },
    sumAll() {
      let sum1 = 0, sum2 = 0;
      for (let item of this.cartlist) {
        sum1 += Number(item.ourPrice) * Number(item.number);
      }
      for (let item of this.cartlist) {
        sum2 += Number(item.weight) * Number(item.number);
      }
      if (sum2 <= 500.0) sum2 = 10.00;
      else sum2 = sum2 / 50.0;
      return (sum1 + sum2).toFixed(2);
    }
  },
  methods: {
    getImage(item) {
      if (!item.id) return '';
      return `${API_URL}/img/${item.id}.png`;
    },
  }
}
</script>

<style>

</style>