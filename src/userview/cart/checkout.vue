<template>
  <v-container>
    <headpic :title="user.firstName"></headpic>

    <v-row>
      <v-col cols="3">
        <v-card>
          <v-row class="px-2">
            <v-col>
              <v-btn block color="primary" @click="submitForm">提交订单</v-btn>
            </v-col>
          </v-row>
          <v-subheader class="mb-2">提交订单会表明您已经同意辞林书店的隐私条款和使用限制。</v-subheader>

          <v-divider></v-divider>

          <v-row class="px-2 mb-0">
            <v-col>
              <h2>订单摘要</h2>
            </v-col>
          </v-row>

          <v-row class="px-2">
            <v-col>
              合计 (不含运费)
            </v-col>
            <v-col class="text-right">
              ¥ {{ sumCost }}
            </v-col>
          </v-row>

          <v-row class="px-2">
            <v-col>
              运费
            </v-col>
            <v-col class="text-right">
              ¥ {{ sumShip }}
            </v-col>
          </v-row>

          <v-row class="px-2 title red--text">
            <v-col>
              合计
            </v-col>
            <v-col class="text-right">
              ¥ {{ sumAll }}
            </v-col>
          </v-row>

        </v-card>
      </v-col>
      <v-col cols="9">
        <v-row>
          <v-expansion-panels accordion multiple 
            v-model="panel">
            <v-expansion-panel key="address" ref="address">
              <v-expansion-panel-header>邮寄地址</v-expansion-panel-header>
              <v-expansion-panel-content ref="addressParent">
                <address-view @nextstep="onNextStep" @addressupdate="onAddressuUpdate"></address-view>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel key="payment" ref="payment">
              <v-expansion-panel-header>支付方式</v-expansion-panel-header>
              <v-expansion-panel-content ref="paymentParent">
                <payment :address="address" @nextstep="onNextStep"></payment>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel key="review" ref="review">
              <v-expansion-panel-header>确认订单信息</v-expansion-panel-header>
              <v-expansion-panel-content>
                <review :cartlist="items" @submitform="submitForm"></review>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import headpic from '../../components/headpic'
import addressView from './address'
import payment from './payment'
import review from './review'
import { getUser } from '../../common/userservice'
import { userCheckout } from '../../common/shopservice'

export default {
  name: 'checkout',
  components: {
    headpic, addressView, payment, review
  },
  data: () => ({
    user: null,
    items: [], panel: [], address: null
  }),
  computed: {
    sumCost() {
      let sum = 0;
      for (let item of this.items) {
        sum += Number(item.ourPrice) * Number(item.number);
      }
      return sum.toFixed(2);
    },
    sumShip() {
      let sum = 0;
      for (let item of this.items) {
        sum += Number(item.weight) * Number(item.number);
      }
      if (sum <= 500.0) return 10.00;
      else return (sum / 50.0).toFixed(2);
    },
    sumAll() {
      let sum1 = 0, sum2 = 0;
      for (let item of this.items) {
        sum1 += Number(item.ourPrice) * Number(item.number);
      }
      for (let item of this.items) {
        sum2 += Number(item.weight) * Number(item.number);
      }
      if (sum2 <= 500.0) sum2 = 10.00;
      else sum2 = sum2 / 50.0;
      return (sum1 + sum2).toFixed(2);
    }
  },
  methods: {
    submitForm() {
      let address = null, payment = null, flag = 0;
      if (this.$refs.addressParent.$children.length > 0) {
        address = this.$refs.addressParent.$children[0];
      } else {
        this.openPanel(0); flag++;
      }
      if (this.$refs.paymentParent.$children.length > 0) {
        payment = this.$refs.paymentParent.$children[0];
      } else {
        this.openPanel(1); flag++;
      }
      if (flag) return ;
      if (!address.checkValid()) {
        this.openPanel(0); flag++;
      }
      if (!payment.checkValid()) {
        this.openPanel(1); flag++;
      }
      if (flag) return ;

      let data = { ...address.getData(), ...payment.getData() };
      // console.log(data);
    },
    openPanel(item) {
      if (this.panel.indexOf(item) === -1) {
        this.panel.push(item);
      }
    },
    onNextStep(item) {
      this.openPanel(item);
      if (item === 1) {
        this.$nextTick(() => {
          this.$vuetify.goTo(this.$refs.payment);
        });
      } else if (item === 2) {
        this.$nextTick(() => {
          this.$vuetify.goTo(this.$refs.review);
        });
      }
    },
    onAddressuUpdate(newV) {
      this.address = newV;
      if (this.$refs.paymentParent.$children.length > 0) {
        let component = this.$refs.paymentParent.$children[0];
        component.setSync(newV);
      }
    }
  },
  created() {
    this.openPanel(0);
    this.user = getUser();
    this.items = this.$route.params.items;
  }
}
</script>

<style>

</style>