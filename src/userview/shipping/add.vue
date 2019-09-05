<template>
  <v-container>
    <v-row class="px-4">
      <v-col>
        <v-form ref="form" v-model="valid">

          <v-text-field v-model="info.shippingname" :rules="rules.shippingname"
            label="* 收件人姓名"></v-text-field>

          <v-row class="mt-0">
            <v-col class="py-0">
              <v-select :items="province" v-model="info.shippingstate"
                label="* 省份"></v-select>
            </v-col>
            <v-col class="py-0">
                <v-select :items="city" v-model="info.shippingcity"
                  :rules="rules.shippingcity"
                  label="* 城市"></v-select>
            </v-col>
            <v-col class="py-0">
              <v-text-field v-model="info.zipcode" :rules="rules.zipcode"
                label="* 邮政编码"></v-text-field>
            </v-col>
          </v-row>

          <v-text-field v-model="info.shippingstreet1" :rules="rules.shippingstreet1"
            label="* 街道地址1"></v-text-field>
          <v-text-field v-model="info.shippingstreet2" :rules="rules.shippingstreet2"
            label="* 街道地址2"
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
import { getAddress, addAddress, updateAddress } from './service'
import { notEmpty, isDigits } from '../../common/rules'
import { CityList } from '../../common/city'
import { hasOwn } from '../../util'

export default {
  name: 'shipping-add',
  data: () => ({
    updateID: null,
    alert: {
      show: false, type: 'error', text: ''
    },
    valid: true,
    province: Object.keys(CityList),
    info: {
      shippingname: '',
      shippingstreet1: '',
      shippingstreet2: '',
      zipcode: '',
      shippingcity: '',
      shippingstate: '河北省'
    },
    rules: {
      shippingname: [notEmpty('收件人姓名')],
      shippingstreet1: [notEmpty('街道地址1')],
      shippingstreet2: [notEmpty('街道地址2')],
      zipcode: [notEmpty('邮政编码'), isDigits('邮政编码')],
      shippingcity: [notEmpty('城市')],
    }
  }),
  computed: {
    city() {
      if (CityList[this.info.shippingstate]) {
        return CityList[this.info.shippingstate]
      } else {
        return [];
      }
    }
  },
  methods: {
    async submitForm() {
      this.alert.show = false;
      if (!this.$refs.form.validate()) return false;

      let res = null;
      if (this.updateID === null) {
        res = await addAddress(this.info);
      } else {
        res = await updateAddress(this.updateID, this.info);
      }
      if (hasOwn(res, 'status') && res.status === 'error') {
        this.alert.type = 'error';
        this.alert.text = res.message;
        this.alert.show = true;
      } else {
        this.$router.push('/user/shipping');
      }
    },
    async init(id) {
      let res = await getAddress(id);
      if (hasOwn(res, 'status') && res.status === 'error') {

      } else {
        this.info = res;
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