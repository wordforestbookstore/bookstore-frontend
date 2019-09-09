<template>
  <div class="px-4">
    <v-data-table
      locale="zh-Hans"
      :headers="headers"
      :items="[info]"
      hide-default-footer>

      <template v-slot:item.orderdate="{ item }">
        <span>{{ item.orderdate }}</span>
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

    <h2 class="text-center mt-4 mb-2">订单细节 #{{ info.ordernumber }}</h2>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>账单地址</v-card-title>
          <v-divider></v-divider>
          <div class="px-4 pt-4 pb-2">
            <p>{{ info.billingaddressname }}</p>
            <p>{{ info.billingaddressstreet1 }} {{ info.billingaddressstreet2 }}</p>
            <p>{{ info.billingaddresscity }}</p>
            <p>{{ info.billingaddressstate }}</p>
            <p>{{ info.billintaddresszipcode }}</p>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>支付信息</v-card-title>
          <v-divider></v-divider>
          <div class="px-4 pt-4 pb-2">
            <p>{{ info.holdername }}</p>
            <p>{{ info.cardnumber }}</p>
            <p>到期时间：{{ info.year }} 年 {{ info.month }} 月</p>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>邮寄信息</v-card-title>
          <v-divider></v-divider>
          <div class="px-4 pt-4 pb-2">
            <p>{{ info.shippingaddressname }}</p>
            <p>{{ info.shippingaddressstreet1 }} {{ info.shippingaddressstreet2 }}</p>
            <p>{{ info.shippingaddresscity }}</p>
            <p>{{ info.shippingaddressstate }}</p>
            <p>{{ info.shippingaddresszipcode }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <h2 class="text-center mt-4 mb-2">订单合计</h2>

    <v-data-table
      locale="zh-Hans"
      :headers="headers2"
      :items="items"
      hide-default-footer>

      <template v-slot:item.itemprice="{ item }">
        <span>¥ {{ Number(item.itemprice).toFixed(2) }}</span>
      </template>

      <template v-slot:item.sum="{ item }">
        <span>¥ {{ (Number(item.itemprice) * Number(item.itemquantity)).toFixed(2) }}</span>
      </template>

      <template v-slot:footer>
        <v-divider></v-divider>
        <v-row justify="end" class="body-2 px-2">
          <v-col cols="2" class="text-center">
            合计 (不含运费)
          </v-col>
          <v-col cols="2" class="text-center">
            ¥ {{ sumCost }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="end" class="body-2 px-2">
          <v-col cols="2" class="text-center">
            运费
          </v-col>
          <v-col cols="2" class="text-center">
            ¥ {{ sumShip }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="end" class="body-2 px-2">
          <v-col cols="2" class="text-center">
            合计
          </v-col>
          <v-col cols="2" class="text-center">
            ¥ {{ sumAll }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </template>

    </v-data-table>

  </div>
</template>

<script>
import { hasOwn } from '../../util'
import { getOrder } from '../../common/shopservice'

export default {
  name: 'order-info',
  data: () => ({
    info: null, items: [],
    headers: [
      {
        text: '订单提交时间',
        value: 'orderdate',
        sortable: false
      },
      {
        text: '商品数量',
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
    ],
    headers2: [
      {
        text: '书籍名称',
        value: 'itemname',
        sortable: false,
      },
      {
        text: '售价',
        value: 'itemprice',
        sortable: false,
        align: 'center'
      },
      {
        text: '数量',
        value: 'itemquantity',
        sortable: false,
        align: 'center'
      },
      {
        text: '总价',
        value: 'sum',
        sortable: false,
        align: 'center',
        width: '1.0 / 6.0'
      }
    ]
  }),
  computed: {
    sumCost() {
      let sum = 0;
      for (let item of this.items) {
        sum += Number(item.itemprice) * Number(item.itemquantity);
      }
      return sum.toFixed(2);
    },
    sumShip() {
      let sum = 0;
      for (let item of this.items) {
        sum += Number(item.weight) * Number(item.itemquantity);
      }
      if (sum <= 500.0) return 10.00;
      else return (sum / 50.0).toFixed(2);
    },
    sumAll() {
      let sum1 = 0, sum2 = 0;
      for (let item of this.items) {
        sum1 += Number(item.itemprice) * Number(item.itemquantity);
      }
      for (let item of this.items) {
        sum2 += Number(item.weight) * Number(item.itemquantity);
      }
      if (sum2 <= 500.0) sum2 = 10.00;
      else sum2 = sum2 / 50.0;
      return (sum1 + sum2).toFixed(2);
    }
  },
  methods: {
    async init() {
      let res = await getOrder(this.info.orderid);
      if (hasOwn(res, 'status') && res.status === 'error') {

      } else {
        this.items = res;
      }
    }
  },
  created() {
    this.info = this.$route.params.item;
    this.init();
  }
}
</script>

<style>

</style>