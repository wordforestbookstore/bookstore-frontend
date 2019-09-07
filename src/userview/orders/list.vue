<template>
  <v-data-table
    class="px-4"
    :loading="loading" loading-text="加载中..."
    locale="zh-Hans"
    :headers="headers"
    :items="orderlist"
    hide-default-footer>

    <template v-slot:item.orderdate="{ item }">
      <router-link :to="getUrl(item)">{{ item.orderdate }}</router-link>
    </template>

    <template v-slot:item.ordertotal="{ item }">
      <span>¥ {{ item.ordertotal }}</span>
    </template>

    <template v-slot:item.orderstatus="{ item }">
      <v-icon color="success">done</v-icon>
    </template>

    <template v-slot:footer>
      <v-divider></v-divider>
    </template>

    <template v-slot:no-data>
      <span>您暂时尚未提交过订单</span>
    </template>

  </v-data-table>
</template>

<script>
import { hasOwn } from '../../util'
import { getOrdersList } from '../../common/shopservice'

export default {
  name: '',
  data: () => ({
    loading: false,
    orderlist: [],
    headers: [
      {
        text: '订单提交时间',
        value: 'orderdate',
        sortable: false
      },
      {
        text: '订单编号',
        value: 'ordernumber',
        sortable: false,
        align: 'center',
        width: '10%'
      },
      {
        text: '合计',
        value: 'ordertotal',
        sortable: false,
        align: 'center',
        width: '20%'
      },
      {
        text: '订单状态',
        value: 'orderstatus',
        sortable: false,
        align: 'center',
        width: '10%'
      }
    ]
  }),
  methods: {
    getDate(v) {
      let d = new Date(v);
      console.log(d);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    },
    getUrl(item) {
      return {
        name: 'orderinfo',
        query: { id: item.orderid },
        params: {
          item
        }
      };
    },
    async init() {
      this.loading = true;
      let res = await getOrdersList();
      if (hasOwn(res, 'status') && res.status === 'error') {

      } else {
        this.orderlist = res;
        this.loading = false;
      }
    }
  },
  created() {
    this.init();
  }
}
</script>

<style>

</style>