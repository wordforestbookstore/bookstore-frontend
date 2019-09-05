<template>
  <v-container>
    <v-row class="px-4">
      <v-col>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="info.cardname" :rules="rules.cardname"
            label="* 信用卡名称"></v-text-field>

          <v-divider class="my-4"></v-divider>

          <h3>持卡人地址</h3>
          
          <v-text-field v-model="info.userbillingname" :rules="rules.userbillingname"
            label="* 姓名"></v-text-field>

          <v-row class="mt-0">
            <v-col class="py-0">
              <v-select :items="province" :rules="rules.userbillingstate"
                v-model="info.userbillingstate" label="* 省份"></v-select>
            </v-col>
            <v-col class="py-0">
                <v-select :items="city" :rules="rules.userbillingcity"
                  v-model="info.userbillingcity" label="* 城市"></v-select>
            </v-col>
            <v-col class="py-0">
              <v-text-field v-model="info.zipcode" :rules="rules.zipcode"
                label="* 邮政编码"></v-text-field>
            </v-col>
          </v-row>

          <v-text-field v-model="info.userbillingstreet1" :rules="rules.userbillingstreet1"
            label="* 街道地址1"></v-text-field>
          <v-text-field v-model="info.userbillingstreet2" :rules="rules.userbillingstreet2"
            label="* 街道地址2"></v-text-field>

          <v-divider class="my-4"></v-divider>
          
          <h3>信用卡信息</h3>

          <v-img class="my-2" src="../../assets/creditcard.png" max-width="20%"></v-img>

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
                v-model="date" label="* 信用卡到期日期" :rules="rules.date"
              ></v-text-field>
            </template>
            <v-date-picker color="red lighten-1" locale="zh-cn" type="month"
              v-model="date" @input="dateMenu = false"></v-date-picker>
          </v-menu>

          <v-text-field v-model="info.cvc" :rules="rules.cvc"
            label="* 信用卡安全码"
            @keyup.enter="submitForm"></v-text-field>

          <v-alert dismissible transition="scale-transition"
            v-model="alert.show"
            :type="alert.type">{{ alert.text }}</v-alert>

          <v-btn class="mt-4" color="primary" @click="submitForm">保存</v-btn>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { addBilling, getBilling, updateBilling } from './service'
import { notEmpty, isDigits } from '../../common/rules'
import { CityList } from '../../common/city'
import { hasOwn } from '../../util'

export default {
  name: 'billings-add',
  data: () => ({
    updateID: null,
    alert: {
      show: false, type: 'error', text: ''
    },
    province: Object.keys(CityList),
    valid: true,
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
      date: [notEmpty('信用卡到期日期')],
      userbillingcity: [notEmpty('城市')],
      userbillingname: [notEmpty('姓名')],
      userbillingstreet1: [notEmpty('街道地址1')],
      userbillingstreet2: [notEmpty('街道地址2')],
      userbillingstate: [notEmpty('省份')],
      zipcode: [notEmpty('邮政编码'), isDigits('邮政编码')]
    }
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
  methods: {
    async submitForm() {
      this.alert.show = false;
      if (!this.$refs.form.validate()) return false;

      let date = new Date(this.date);
      this.info.year = date.getFullYear();
      this.info.month = date.getMonth() + 1;

      let res = null;
      if (this.updateID === null) {
        res = await addBilling(this.info);
      } else {
        res = await updateBilling(this.updateID, this.info);
      }
      if (hasOwn(res, 'status') && res.status === 'error') {
        this.alert.type = 'error';
        this.alert.text = res.message;
        this.alert.show = true;
      } else {
        this.$router.push('/user/billings');
      }
    },
    async init(id) {
      let res = await getBilling(id);
      if (hasOwn(res, 'status') && res.status === 'error') {

      } else {
        this.info = res;
        this.date = `${res.year}-${res.month}`;
      }
    }
  },
  created() {
    this.updateID = null;
    if (hasOwn(this.$route.query, 'id')) {
      this.updateID = this.$route.query.id;
      this.init(this.$route.query.id);
    }
  }
}
</script>

<style>

</style>