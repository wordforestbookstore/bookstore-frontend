<template>
  <div>
    <v-row v-if="list.length > 0">
      <v-col>
        <v-data-table
          locale="zh-Hans"
          :headers="headers"
          :items="list"
          hide-default-footer>

          <template v-slot:item.action="{ item }">
            <v-btn color="primary" @click="useBilling(item)">使用该信用卡</v-btn>
          </template>

          <template v-slot:footer>
            <v-divider></v-divider>
          </template>

          <template v-slot:no-data>
            <span>您暂时没有添加地址</span>
          </template>

        </v-data-table>
      </v-col>
    </v-row>

    <v-row class="px-4">
      <v-col>
        <v-form ref="form" v-model="valid">

          <v-img class="mb-4" src="../../assets/creditcard.png" max-width="20%"></v-img>

          <v-select label="* 信用卡类型" v-model="info.type"
            :items="['visa', 'mastercard', 'discover', 'american express', 'union pay']"></v-select>

          <v-text-field v-model="info.holdername" :rules="rules.holdername"
            label="* 持卡人姓名"></v-text-field>

          <v-text-field v-model="info.cardnumber" :rules="rules.cardnumber"
            label="* 信用卡卡号"></v-text-field>

          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            transition="scale-transition" offset-y
            full-width max-width="290px" min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-on="on" readonly 
                v-model="date" label="* 信用卡到期时间" :rules="rules.date"
              ></v-text-field>
            </template>
            <v-date-picker color="red lighten-1" locale="zh-cn" type="month"
              v-model="date" @input="dateMenu = false"></v-date-picker>
          </v-menu>

          <v-text-field v-model="info.cvc" :rules="rules.cvc"
            label="* 信用卡安全码"></v-text-field>

          <v-checkbox
            v-model="isEqualToAddress"
            label="与邮寄地址相同"
          ></v-checkbox>

          <v-text-field v-model="info.userbillingname" :rules="rules.userbillingname"
            :readonly="isEqualToAddress"
            label="* 姓名"></v-text-field>

          <v-row class="mt-0">
            <v-col class="py-0">
              <v-select :items="province" :rules="rules.userbillingstate"
                :readonly="isEqualToAddress"
                v-model="info.userbillingstate" label="* 省份"></v-select>
            </v-col>
            <v-col class="py-0">
                <v-select :items="city" :rules="rules.userbillingcity"
                  :readonly="isEqualToAddress"
                  v-model="info.userbillingcity" label="* 城市"></v-select>
            </v-col>
            <v-col class="py-0">
              <v-text-field v-model="info.zipcode" :rules="rules.zipcode"
                :readonly="isEqualToAddress"
                label="* 邮政编码"></v-text-field>
            </v-col>
          </v-row>

          <v-text-field v-model="info.userbillingstreet1" :rules="rules.userbillingstreet1"
            :readonly="isEqualToAddress"
            label="* 街道地址1"></v-text-field>
          <v-text-field v-model="info.userbillingstreet2" :rules="rules.userbillingstreet2"
            :readonly="isEqualToAddress"
            label="* 街道地址2"></v-text-field>

          <v-btn class="mt-4" color="primary" @click="nextStep">下一步</v-btn>

        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getBillingsList } from '../billings/service'
import { notEmpty, isDigits } from '../../common/rules'
import { CityList } from '../../common/city'
import { hasOwn } from '../../util'

export default {
  name: 'checkout-payment',
  props: [
    'address'
  ],
  data: () => ({
    province: Object.keys(CityList),
    valid: true,
    isEqualToAddress: false,
    dateMenu: false,
    date: '',
    info: {
      cardname: '',
      cardnumber: '',
      type: 'visa',
      cvc: '',
      year: '', month: '',
      holdername: '',
      userbillingcity: '',
      userbillingname: '',
      userbillingstreet1: '',
      userbillingstreet2: '',
      userbillingstate: '河北省',
      zipcode: ''
    },
    rules: {
      cardname: [notEmpty('信用卡名称')],
      cardnumber: [notEmpty('信用卡卡号'), isDigits('信用卡卡号')],
      cvc: [notEmpty('信用卡安全码')],
      holdername: [notEmpty('持卡人姓名')],
      date: [notEmpty('信用卡到期时间')],
      userbillingcity: [notEmpty('城市')],
      userbillingname: [notEmpty('姓名')],
      userbillingstreet1: [notEmpty('街道地址1')],
      userbillingstreet2: [notEmpty('街道地址2')],
      userbillingstate: [notEmpty('省份')],
      zipcode: [notEmpty('邮政编码'), isDigits('邮政编码')]
    },
    list: [],
    headers: [
      {
        text: '信用卡',
        value: 'cardname',
        sortable: false
      },
      {
        text: '操作',
        value: 'action',
        sortable: false,
        align: 'center',
        width: '20%'
      }
    ]
  }),
  computed: {
    city() {
      if (CityList[this.info.userbillingstate]) {
        return CityList[this.info.userbillingstate]
      } else {
        return [];
      }
    }
  },
  watch: {
    isEqualToAddress() {
      if (this.address) {
        this.setSync(this.address);
      }
    }
  },
  methods: {
    useBilling(item) {
      this.isEqualToAddress = false;
      this.date = `${item.year}-${item.month}`;
      this.info = item;
    },
    nextStep() {
      if (!this.$refs.form.validate()) return false;
      this.$emit('nextstep', 2);
    },
    setSync(obj) {
      if (this.isEqualToAddress === false) return ;
      this.info.userbillingcity = obj.shippingcity;
      this.info.userbillingname = obj.shippingname;
      this.info.userbillingstate = obj.shippingstate;
      this.info.userbillingstreet1 = obj.shippingstreet1;
      this.info.userbillingstreet2 = obj.shippingstreet2;
      this.info.zipcode = obj.zipcode;
    },
    async init() {
      let res = await getBillingsList();
      if (hasOwn(res, 'status') && res.status === 'error') {

      } else {
        for (let item of res) {
          if (item.default === 'true') {
            this.date = `${item.year}-${item.month}`;
            this.info = item; 
            break;
          }
        }
        this.list = res;
      }
    },
    checkValid() {
      return this.$refs.form.validate();
    },
    getData() {
      let d = new Date(this.date);
      this.info.year = d.getFullYear();
      this.info.month = d.getMonth() + 1;
      return this.info;
    }
  },
  created() {
    this.init();
  }
}
</script>

<style>

</style>