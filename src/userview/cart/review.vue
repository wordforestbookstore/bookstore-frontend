<template>
  <div>
    <v-row>
      <v-col class="pb-0">
        <v-subheader class="pl-0">选择邮寄方式</v-subheader>
        <v-radio-group class="mt-0" row v-model="choose">
          <v-radio
            v-for="item in shippingMethods"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="pt-0">
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
                <span class="red--text">¥ {{ sumPrice }}</span>
              </v-col>
            </v-row>
          </template>

        </v-data-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn block color="primary" @click="submitForm">提交订单</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { API_URL } from '../../config'

export default {
  name: 'checkout-reivew',
  props: [
    'cartlist'
  ],
  data: () => ({
    choose: 'sf-express', 
    shippingMethods: [
      {
        text: '顺丰速运', value: 'sf-express'
      },
      {
        text: '韵达速递', value: 'yundaex'
      },
      {
        text: '圆通速递', value: 'yto'
      },
      {
        text: '中通快递', value: 'zto'
      },
      {
        text: '百世快递', value: 'bestex'
      }
    ],
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
    sumNum() {
      let sum = 0;
      for (let good of this.cartlist) {
        sum += Number(good.number);
      }
      return sum;
    },
    sumPrice() {
      let sum = 0.0;
      for (let good of this.cartlist) {
        sum += Number(good.ourPrice) * Number(good.number);
      }
      return sum.toFixed(2);
    }
  },
  methods: {
    getImage(item) {
      if (!item.id) return '';
      return `${API_URL}/img/${item.id}.png`;
    },
    submitForm() {
      this.$emit('submitform');
    }
  }
}
</script>

<style>

</style>